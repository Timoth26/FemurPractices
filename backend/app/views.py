from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import OfferSerializer
from rest_framework.decorators import action
from .models import Offer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from authentication .serializers import CandidatSerializer, CompanyUserSerializer, PrivateUserSerializer
from authentication.models import PrivateUser
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import FileResponse
import os

class AppView(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = OfferSerializer
    queryset = Offer.objects.all()
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=False, methods=['get'])
    def get_filtered_offers(self, request):
        if request.user.is_authenticated:
            
            name = request.query_params.get('name', None)
            city = request.query_params.get('city', None)
            region = request.query_params.get('region', None)
            sector = request.query_params.get('sector', None)
            start_date = request.query_params.get('start_date', None)
            duration = request.query_params.get('duration', None)
            nfz = request.query_params.get('nfz', None)
            status = request.query_params.get('status', None)
            my_recruitations = request.query_params.get('my_recruitations', False)
            owner = request.query_params.get('owner', False)

            filter_params = {}
            if name:
                filter_params['name__icontains'] = name
            if city:
                filter_params['city__icontains'] = city
            if region:
                filter_params['region__icontains'] = region
            if sector:
                filter_params['sector__icontains'] = sector
            if start_date:
                filter_params['start_date__icontains'] = start_date
            if duration:
                filter_params['duration__icontains'] = duration
            if nfz:
                filter_params['nfz__icontains'] = nfz
            if status:
                filter_params['status__icontains'] = status
            if my_recruitations:
                filter_params['users__in'] = [request.user]
            if owner:
                filter_params['owner'] = request.user
            filtered_offers = self.get_queryset().filter(**filter_params)

            serializer = self.get_serializer(filtered_offers, many=True)
            return Response(serializer.data)
        else:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['get'])    
    def get_offer_by_id(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            offer_id = self.kwargs.get('offer_id')

            if offer_id is None:
                return Response({'error': 'Offer ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                offer = Offer.objects.get(id=offer_id)
                is_user_registered = offer.users.filter(id=request.user.id).exists()
                serializer = OfferSerializer(offer)
                data = serializer.data
                data['is_user_registered'] = is_user_registered
                print(f"Offer owner: {offer.owner}")
                print(f"Request user: {request.user}")
                if offer.owner.id == request.user.id:
                    data['owner'] = True
                else:
                    data['owner'] = False
                return Response(data, status=status.HTTP_200_OK)
            except Offer.DoesNotExist:
                return Response({'error': 'Offer not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'User not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)
        
    @action(detail=False, methods=['post'])
    def create_offer(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            try:
                serializer = OfferSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save(owner=request.user.companyuser)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Offer.DoesNotExist:
                return Response({'error': 'Offer not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'User not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)
        
    @action(detail=False, methods=['get'])
    def end_offer(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            offer_id = self.kwargs.get('offer_id')

            if offer_id is None:
                return Response({'error': 'Offer ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                offer = Offer.objects.get(id=offer_id)
                serializer = OfferSerializer(offer)
                if offer.owner == request.user.companyuser:
                    new_status = request.data.get('status')
                    offer.status = new_status
                    offer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'You are not the owner of this offer.'}, status=status.HTTP_403_FORBIDDEN)
            except Offer.DoesNotExist:
                return Response({'error': 'Offer not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'User not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)
        
    @action(detail=False, methods=['get'])
    def get_candidats(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            offer_id = self.kwargs.get('offer_id')

            if offer_id is None:
                return Response({'error': 'Offer ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                offer = Offer.objects.get(id=offer_id)
                users = offer.users.all()
                serializer = CandidatSerializer(users, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Offer.DoesNotExist:
                    return Response({'error': 'Offer not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'User not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)
        
    @action(detail=False, methods=['post'])
    def edit_offer(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            offer_id = self.kwargs.get('offer_id')

            if offer_id is None:
                return Response({'error': 'Offer ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                offer = Offer.objects.get(id=offer_id)

                if offer.owner != request.user.companyuser:
                    return Response({'error': 'You do not have permission to edit this offer.'}, status=status.HTTP_403_FORBIDDEN)
                
                data = request.data
                data['owner'] = request.user.companyuser            
                serializer = OfferSerializer(offer, data=data,)

                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            except Offer.DoesNotExist:
                return Response({'error': 'Offer not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'User not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)
        
    @action(detail=False, methods=['get'])
    def get_account_details(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user

            if user is None:
                return Response({'error': 'User is not defined'}, status=status.HTTP_400_BAD_REQUEST)
            
        if hasattr(user, 'privateuser'):
            # Użytkownik prywatny
            serializer = PrivateUserSerializer(user.privateuser)
        elif hasattr(user, 'companyuser'):
            # Użytkownik firmowy
            serializer = CompanyUserSerializer(user.companyuser)
        else:
            return Response({'error': 'Invalid user type.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def download_resume(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user

            if user is None:
                return Response({'error': 'User is not defined'}, status=status.HTTP_400_BAD_REQUEST)

            # Sprawdź, czy użytkownik ma pole resume
            if hasattr(user, 'privateuser') and user.privateuser.resume:
                resume_path = user.privateuser.resume.path
                # Użytkownik prywatny
                resume_path = user.privateuser.resume.path
                response = FileResponse(open(resume_path, 'rb'))
                response['Content-Type'] = 'application/pdf'  # Zmień typ MIME odpowiednio
                response['Content-Disposition'] = f'attachment; filename="{user.email}_resume.pdf"'  # Dostosuj nazwę pliku

                return response

        return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def delete_resume(self, request):
        if request.user.is_authenticated:
            user = request.user

            if user is None:
                return Response({'error': 'User is not defined'}, status=status.HTTP_400_BAD_REQUEST)
            
            if hasattr(user, 'privateuser'):
                private_user = user.privateuser

                file_path = private_user.resume.path if private_user.resume else None
                
                if file_path and os.path.exists(file_path):
                    os.remove(file_path)

                private_user.resume = None
                private_user.save()
                return Response({'detail': 'Résumé deleted successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'User is not a private user'}, status=status.HTTP_400_BAD_REQUEST)
            
    @action(detail=False, methods=['get'])
    def download_candidat_resume(self, request, *args, **kwargs):
        if request.user.is_authenticated:
                    user_id = self.kwargs.get('user_id')

                    if user_id is None:
                        return Response({'error': 'User is not defined'}, status=status.HTTP_400_BAD_REQUEST)

                    try:
                        user = PrivateUser.objects.get(id=user_id)

                        # Sprawdź, czy użytkownik ma pole resume
                        if hasattr(user, 'privateuser') and user.privateuser.resume:
                            resume_path = user.privateuser.resume.path
                            # Użytkownik prywatny
                            response = FileResponse(open(resume_path, 'rb'))
                            response['Content-Type'] = 'application/pdf'  # Zmień typ MIME odpowiednio
                            response['Content-Disposition'] = f'attachment; filename="{user.email}_resume.pdf"'  # Dostosuj nazwę pliku

                            return response
                    except PrivateUser.DoesNotExist:
                        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

                    return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['post'])
    def edit_account_details(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user

            if user is None:
                return Response({'error': 'User is not defined'}, status=status.HTTP_400_BAD_REQUEST)

            if hasattr(user, 'privateuser'):
                private_user = user.privateuser
                serializer = PrivateUserSerializer(private_user, data=request.data, partial=True)
            elif hasattr(user, 'companyuser'):
                company_user = user.companyuser
                serializer = CompanyUserSerializer(company_user, data=request.data, partial=True)

            if serializer.is_valid():
                # Dodaj obsługę pola 'resume'
                if 'resume' in request.data:
                    private_user.resume = request.data['resume']

                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)