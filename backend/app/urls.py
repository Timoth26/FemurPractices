from django.urls import path
from .views import AppView

urlpatterns = [
    path('search/', AppView.as_view({'get': 'get_filtered_offers'}), name='get_filtered_offers'),
    path('offer/<int:offer_id>/', AppView.as_view({'get': 'get_offer_by_id'}), name='get_offer_by_id'),
    path('offer/create/', AppView.as_view({'post': 'create_offer'}), name='create_offer'),
    path('offer/<int:offer_id>/close/', AppView.as_view({'post': 'end_offer'}), name='end_offer'),
    path('offer/<int:offer_id>/candidats/', AppView.as_view({'get': 'get_candidats'}), name='get_candidats'),
    path('offer/edit/<int:offer_id>/', AppView.as_view({'post': 'edit_offer'}), name='edit_offer'),
    path('edit/account/', AppView.as_view({'get': 'get_account_details'}), name='get_account_details'),
    path('edit/account/post/', AppView.as_view({'post': 'edit_account_details'}), name='edit_account_details'),
    path('download-resume/', AppView.as_view({'get': 'download_resume'}), name='download_resume'),
    path('delete-resume/', AppView.as_view({'post': 'delete_resume'}), name='delete_resume'),
    path('download-resume/<int:user_id>', AppView.as_view({'get': 'download_candidat_resume'}), name='download_candidat_resume'),
]