from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Offer
from authentication.models import CompanyUser, PrivateUser

class AppViewTestCase(TestCase):
    @classmethod
    def setUp(cls):
        cls.client = APIClient()

        # Create a company user
        company_user_data = {
            'email': 'test@example.com',
            'password': 'testpassword',
            'type': 'company',
            'address': 'ul. Testowa 1',
            'city': 'Testowo',
            'region': 'testowy',
            'postal_code': '00-000',
            'phone_nr': '000000000',
            'company_name': 'TestCompany',
        }

        private_user_data = {
            'email': 'private@example.com',
            'password': 'testpassword',
            'type': 'private',
            'address': 'ul. Testowa 1',
            'city': 'Testowo',
            'region': 'testowy',
            'postal_code': '00-000',
            'phone_nr': '000000000',
            'first_name': 'Test',
            'last_name': 'Testowy'
        }
        response_company = cls.client.post(reverse('create_user'), company_user_data, format='json')
        cls.company_user = response_company.data
        # cls.company_user = CompanyUser.objects.create(email='test@example.com', password='testpassword', type='company', address='ul. Testowa 1', city='Testowo', region='testowy', postal_code='00-000', phone_nr='000000000', company_name='TestCompany', is_active=True)
        # cls.private_user = PrivateUser.objects.create(email='testuser@example.com', password='testpassword', type='private', address='ul. Testowa 1', city='Testowo', region='testowy', postal_code='00-000', phone_nr='000000000', first_name='John', last_name='Doe', is_active=True)
        response = cls.client.post(reverse('token_create'), {'email': 'test@example.com', 'password': 'testpassword'}, format='json')
        cls.token = response.data.get('access', '')
        cls.client.credentials(HTTP_AUTHORIZATION=f'Bearer {cls.token}')

        response_private = cls.client.post(reverse('create_user'), private_user_data, format='json')
        cls.private_user = response_private.data

        response = cls.client.post(reverse('token_create'), {'email': 'private@example.com', 'password': 'testpassword'}, format='json')
        cls.token_private = response.data.get('access', '')

    def test_create_offer(self):
        url = reverse('create_offer')
        offer_data = {
            'name': 'Test Offer',
            'city': 'Test City',
            'region': 'Test Region',
            'sector': 'Test Sector',
            'start_date': '2023-01-01',
            'duration': 'Test Duration',
            'nfz': False,
            'status': 'Zakończona',
            'about': 'Test About',
            'address': 'Test Address',
            'paid': False,
            'id': 100,
        }

        response = self.client.post(url, offer_data, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Offer.objects.count(), 1)

        self.assertEqual(response.data['name'], 'Test Offer')
        self.assertEqual(response.data['city'], 'Test City')
        self.assertEqual(response.data['region'], 'Test Region')
        self.assertEqual(response.data['sector'], 'Test Sector')
        self.assertEqual(response.data['start_date'], '2023-01-01')
        self.assertEqual(response.data['duration'], 'Test Duration')
        self.assertEqual(response.data['nfz'], False)
        self.assertEqual(response.data['status'], 'Zakończona')
        self.assertEqual(response.data['about'], 'Test About')
        self.assertEqual(response.data['address'], 'Test Address')
        self.assertEqual(response.data['paid'], False)

    def test_get_filtered_offers_authenticated(self):
        url = reverse('get_filtered_offers')
        response = self.client.get(url, {'name': 'Test Offer'}, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_offer_by_id(self):
        owner = CompanyUser.objects.get(email=self.company_user['email'])

        offer_data = {
            'name': 'Test Offer',
            'city': 'Test City',
            'region': 'Test Region',
            'sector': 'Test Sector',
            'start_date': '2023-01-01',
            'duration': 'Test Duration',
            'nfz': False,
            'status': 'Zakończona',
            'about': 'Test About',
            'address': 'Test Address',
            'paid': False,
            'owner': owner,
        }

        # Utwórz ofertę w bazie danych
        offer = Offer.objects.create(**offer_data)
        offer_id = offer.id

        url = reverse('get_offer_by_id', kwargs={'offer_id': offer_id})
        response = self.client.get(url, HTTP_AUTHORIZATION=f'Bearer {self.token}')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Sprawdź, czy odpowiedź zawiera oczekiwane pola i wartości
        self.assertEqual(response.data['name'], 'Test Offer')
        self.assertEqual(response.data['city'], 'Test City')
        self.assertEqual(response.data['region'], 'Test Region')
        self.assertEqual(response.data['sector'], 'Test Sector')
        self.assertEqual(response.data['start_date'], '2023-01-01')
        self.assertEqual(response.data['duration'], 'Test Duration')
        self.assertEqual(response.data['nfz'], False)
        self.assertEqual(response.data['status'], 'Zakończona')
        self.assertEqual(response.data['about'], 'Test About')
        self.assertEqual(response.data['address'], 'Test Address')
        self.assertEqual(response.data['paid'], False)
        self.assertEqual(response.data['id'], offer.id)

    def test_get_filtered_offers_unauthenticated(self):
        self.client.logout()
        url = reverse('get_filtered_offers')
        response = self.client.get(url, {'name': 'Test Offer'}, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_end_offer_authenticated_owner(self):
        owner = CompanyUser.objects.get(email=self.company_user['email'])

        offer_data = {
            'name': 'Test Offer',
            'city': 'Test City',
            'region': 'Test Region',
            'sector': 'Test Sector',
            'start_date': '2023-01-01',
            'duration': 'Test Duration',
            'nfz': False,
            'status': 'Aktywna',
            'about': 'Test About',
            'address': 'Test Address',
            'paid': False,
            'owner': owner,
        }

        offer = Offer.objects.create(**offer_data)
        offer_id = offer.id

        url = reverse('end_offer', kwargs={'offer_id': offer_id})
        new_status = 'Zakończona'

        response = self.client.post(url, {'status': new_status}, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], new_status)

    def test_end_offer_unauthenticated(self):
        owner = CompanyUser.objects.get(email=self.company_user['email'])

        offer_data = {
            'name': 'Test Offer',
            'city': 'Test City',
            'region': 'Test Region',
            'sector': 'Test Sector',
            'start_date': '2023-01-01',
            'duration': 'Test Duration',
            'nfz': False,
            'status': 'Aktywna',
            'about': 'Test About',
            'address': 'Test Address',
            'paid': False,
            'owner': owner,
        }

        offer = Offer.objects.create(**offer_data)
        offer_id = offer.id
        self.client.logout()
        url = reverse('end_offer', kwargs={'offer_id': offer_id})
        new_status = 'Zakończona'

        response = self.client.get(url, {'status': new_status}, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_end_offer_authenticated_non_owner(self):
        owner = CompanyUser.objects.get(email=self.company_user['email'])

        offer_data = {
            'name': 'Test Offer',
            'city': 'Test City',
            'region': 'Test Region',
            'sector': 'Test Sector',
            'start_date': '2023-01-01',
            'duration': 'Test Duration',
            'nfz': False,
            'status': 'Aktywna',
            'about': 'Test About',
            'address': 'Test Address',
            'paid': False,
            'owner': owner,
        }

        offer = Offer.objects.create(**offer_data)
        offer_id = offer.id
        # Create a new user (non-owner)
        non_owner_data = {
            'email': 'nonowner@example.com',
            'password': 'testpassword',
            'type': 'company',
            'address': 'ul. NonOwner 1',
            'city': 'NonOwnerCity',
            'region': 'nonownerregion',
            'postal_code': '00-000',
            'phone_nr': '111111111',
            'company_name': 'NonOwnerCompany',
        }
        self.client.post(reverse('create_user'), non_owner_data, format='json')
        response_non_owner = self.client.post(reverse('token_create'), {'email': 'nonowner@example.com', 'password': 'testpassword'}, format='json')
        token_non_owner = response_non_owner.data.get('access', '')
        # self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token_non_owner}')

        url = reverse('end_offer', kwargs={'offer_id': offer_id})
        new_status = 'Zakończona'

        response = self.client.post(url, {'status': new_status}, format='json', HTTP_AUTHORIZATION=f'Bearer {token_non_owner}')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_account_details_company_user(self):
        url = reverse('get_account_details')
        response = self.client.get(url, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token}')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'test@example.com')
        self.assertEqual(response.data['type'], 'company')
        self.assertEqual(response.data['company_name'], 'TestCompany')

    def test_get_account_details_unauthenticated(self):
        self.client.logout()
        url = reverse('get_account_details')
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_account_details_private_user(self):
        url = reverse('get_account_details')
        response = self.client.get(url, format='json', HTTP_AUTHORIZATION=f'Bearer {self.token_private}')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'private@example.com')
        self.assertEqual(response.data['type'], 'private')
        self.assertEqual(response.data['first_name'], 'Test')
        self.assertEqual(response.data['last_name'], 'Testowy')

    def tearDown(self):
        self.client.logout()
