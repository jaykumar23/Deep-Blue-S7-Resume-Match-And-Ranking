"""RMR URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from RMRapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/ind/liquor/', views.indLiquorCreate),
    path('api/v1/ind/view/<sid>', views.viewdata),
    path('api/v1/ind/login/', views.user_login),
    path('api/v1/ind/update/<sid>', views.indliquorhodupdate),
    path('api/v1/ind/sup_view/', views.supervisor_viewdata),
    path('api/v1/ind/sup_history/', views.supervisor_history),
    path('api/v1/ind/hod_view/<id>', views.hod_viewdata),
    path('api/v1/ind/hod_history/', views.hod_history),
    path('api/v1/getdetails/<formid>', views.SingleForm),
    path('api/v1/logout/<userid>', views.Logout),
    path('api/v1/viewslurry/', views.SlurryList),
    path('api/v1/slurryhistory/', views.SlurryHistory),
    path('api/v1/specificslurry/<int:objid>', views.SingleSlurry),
    path('api/v1/specificEmulsion/<int:objid>', views.SingleEmulsion),
    path('api/v1/createchecksheetregular/<int:objid>', views.CreateEmulsionRegularChecksheet),

    path('api/v1/createchecksheet/', views.CreateChecksheet),
    path('api/v1/checklist/', views.CheckSheetList),
    path('api/v1/checkhistory/', views.CheckSheetHistory),
    path('api/v1/specificchecksheet/<int:objid>', views.SingleCheckSheet),
    path('api/v1/thingsboard/', views.getThingsBoardData),
    path('api/v1/savedslurry/', views.GetUnsubmittedSlurry),
    path('api/v1/plantemployees/', views.PlantEmployees),

    path('api/v1/castboosterdata/', views.getCBTable),
    path('api/v1/castboosterdates/<str:fromDate>/<str:toDate>', views.getCBDates),
    path('api/v1/castboostershift/<str:d1>/<str:shift>', views.GetCBShifts),
    path('api/v1/castboostersize/<str:s>', views.getCBSize),

    path('scheduledData/', views.ScheduledDataUpdate),
]