import json

from django.core.mail import send_mail
from django.http.response import JsonResponse, HttpResponse
from rest_framework import status
from datetime import datetime, time, timedelta
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
import requests
from django.db import transaction
from django.db.models import Q
from uuid import uuid4
from urllib3.exceptions import InsecureRequestWarning
from django.utils.html import escape
from django.contrib.auth.hashers import *
from .models import Tokens
from rest_framework.response import Response

HEADERS = {"":""}
BASE_URL = ""

requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)

# Create your views here.
#COMMON LOGIN FOR ALL USERS
@csrf_exempt
@api_view(['POST', 'PUT'])
def temp(request):
    if request.method == 'PUT' or request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        print(email, password)
    else:
        # Wrong Request method
        return JsonResponse({"status": False, "Desc": "Wrong Request Method"})





# TOKEN CHECKER
def TokenChecker(Wrapped):
    def wrapper(*args, **kwargs):
        request = args[0]

        try:
            tokenval = request.META['HTTP_AUTHORIZATION'].split(' ')[1]
            userid = request.META['HTTP_AUTHORIZATION'].split(' ')[2]
        except (KeyError, IndexError):
            return HttpResponse('<h1>Unauthorized(401)</h1>', status=status.HTTP_401_UNAUTHORIZED)

        try:
            user = Signup.objects.get(id=userid)
        except Signup.DoesNotExist:
            return HttpResponse('<h1>Unauthorized(401)</h1>', status=status.HTTP_401_UNAUTHORIZED)

        try:
            token = Tokens.objects.get(user=user)
        except Tokens.DoesNotExist:
            return HttpResponse('<h1>Unauthorized(401)</h1>', status=status.HTTP_401_UNAUTHORIZED)

        # VALID LOGIN
        if token.value == tokenval and token.valid_upto > timezone.now():
            return Wrapped(*args, **kwargs)

        else:
            return HttpResponse('<h1>Token Expired(401)</h1>', status=status.HTTP_401_UNAUTHORIZED)

    return wrapper

# COMMON SIGNUP FOR ALL USERS
@csrf_exempt
@api_view(['POST', 'PUT'])
def user_signup(request):
    if request.method == 'PUT' or request.method == 'POST':
        data = request.data
        print(data)

        if not data['email'] or not data['first_name'] or not data['last_name'] or not data['gender'] or not data['mobile_no'] or not data['role'] or not data['password']:
            return JsonResponse({"Message": "Coudln't get data from site"}, status=status.HTTP_204_NO_CONTENT)

        else:
            existing_email = Signup.objects.filter(email=data['email'])
            if not existing_email:
                data['password'] = make_password(data['password'],salt=None,hasher='default')
                general_serialized = SignupSerializer(data=data)
                if general_serialized.is_valid():
                    general_serialized.save()
            else:
                return JsonResponse({"Message": "Email Already Exists"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        return JsonResponse({"Message": "Account Created Successfully"}, status=status.HTTP_201_CREATED)


    else:
        # Wrong Request method
        return JsonResponse({"Message": "Wrong Request Method"}, status=status.HTTP_400_BAD_REQUEST)



#COMMON LOGIN FOR ALL USERS
@csrf_exempt
@api_view(['POST', 'PUT'])
def user_login(request):
    if request.method == 'PUT' or request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return JsonResponse({"Message": "Coudln't get data from site"}, status=status.HTTP_204_NO_CONTENT)


        try:
            userobj = Signup.objects.get(email=email)
            if userobj.status == False:
                return JsonResponse({"Message": "Invalid Login"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return JsonResponse({"Message": "Invalid Login"}, status=status.HTTP_401_UNAUTHORIZED)

        user_serializer = SignupSerializer(userobj)

        if check_password(password,userobj.password):
            # Login Accepted
            try:
                token = Tokens.objects.get(user=userobj)
                token.delete()
            except Tokens.DoesNotExist:
                pass
            token_code = str(uuid4())
            Tokens.objects.create(value=token_code, valid_upto=timezone.now() + timedelta(minutes=120), user=userobj)

            o = user_serializer.data
            if userobj.role == 'applicant':
                applicantobj = ApplicantProfile.objects.filter(applicant=userobj.id)
                applicant_serializer = ApplicantProfileSerializer(applicantobj)
                o.update(applicant_serializer.data)
            elif userobj.role == 'recruiter':
                recruiterobj = RecruiterProfile.objects.filter(recruiter=userobj.id)
                recruiter_serializer = RecruiterProfileSerializer(recruiterobj)
                o.update(recruiter_serializer.data)
            o['auth_token'] = token_code
            return Response(data=o, status=status.HTTP_200_OK)

        else:
            # Bad Login
            return JsonResponse({"Message": "Invalid Login"}, status=status.HTTP_400_BAD_REQUEST)

    else:
        # Wrong Request method
        return JsonResponse({"Message": "Wrong Request Method"}, status=status.HTTP_400_BAD_REQUEST)


# COMMON LOGOUT FOR ALL USERS
@csrf_exempt
@api_view(['POST', 'PUT'])
def logout(request, userid):
    if request.method == 'POST' or request.method == 'PUT':
        if not userid:
            return JsonResponse({"Message": "Coudln't get data from site"}, status=status.HTTP_204_NO_CONTENT)
        else:
            userobj = Signup.objects.get(id=userid)

            try:
                tokenobj = Tokens.objects.get(user=userobj)
                tokenobj.delete()
                return JsonResponse({"Message": "Logged Out"}, status=status.HTTP_200_OK)

            except Tokens.DoesNotExist:
                return JsonResponse({"Message": "Something Went Wrong"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Wrong Request method
        return JsonResponse({"Message": "Wrong Request Method"}, status=status.HTTP_400_BAD_REQUEST)


# ACCOUNT DELETION
@api_view(['POST'])
def user_delete(request, userid):
    if request.method == 'POST':
        userobj = Signup.objects.get(id=userid)
        try:
            tokenobj = Tokens.objects.get(user=userobj)
            tokenobj.delete()
            Signup.objects.filter(id=userid).update(status=False, updated_at=timezone.now())
            return HttpResponse('Account Deleted Successfully')

        except Tokens.DoesNotExist:
            return HttpResponse('Account Deletion Failed')
    else:
        return JsonResponse({"status": False, "Desc": "Wrong Request Method"})


# PROFILE UPDATE
@api_view(['PUT','POST', 'GET'])
def user_profile(request):
    if request.method == 'PUT' or request.method == 'POST':
        data = request.data.get('')
        try:
            Signup.objects.filter(id=data.id).update(email=data.email, first_name=data.first_name, last_name=data.last_name, gender=data.gender, mobile_no=data.mobile_no, updated_at=timezone.now())
            return HttpResponse('Account Updated Successfully')
        except:
            return HttpResponse('Account Updating Failed')
    else:
        return JsonResponse({"status": False, "Desc": "Wrong Request Method"})



# RESUME OPERATIONS
@api_view(['PUT','POST', 'GET'])
def upload_resume(request,userid):
    if request.method == 'PUT' or request.method == 'POST':
        data = request.data.get('')
        existing_resume = Resume.objects.filter(applicant=userid)
        if not existing_resume:
            general_serialized = ResumeSerializer(data=data)
            if general_serialized.is_valid():
                general_serialized.save()
            return HttpResponse('Resume Uploaded Successfully')
        else:
            Resume.objects.filter(applicant=userid).update(resume=data, updated_at=timezone.now())
            return HttpResponse('Resume Updated Successfully')
    elif request.method == 'GET':
        try:
            existing_resume= Resume.objects.get(applicant=userid)
            resume_serializer = ResumeSerializer(existing_resume)
            o = resume_serializer.data
            return JsonResponse(o, safe=False)
        except:
            return HttpResponse('Something Went Wrong')
    else:
        return JsonResponse({"status": False, "Desc": "Wrong Request Method"})

# JOB OPERATIONS
@api_view(['PUT','POST', 'GET'])
def upload_job(request,id):
    if request.method == 'PUT' or request.method == 'POST':
        data = request.data.get('')
        existing_job = Job.objects.filter(id=id)
        if not existing_job:
            general_serialized = JobSerializer(data=data)
            if general_serialized.is_valid():
                general_serialized.save()
            return HttpResponse('Job Uploaded Successfully')
        else:
            Job.objects.filter(id=id).update(designation=data.designation, location=data.location, start_date=data.start_date, duration=data.duration, stipend=data.stipend, apply_by=data.apply_by, job_description=data.job_description, skills_required=data.skills_required, who_can_apply=data.who_can_apply, perks=data.perks, number_of_openings=data.number_of_openings, updated_at=timezone.now())
            return HttpResponse('Job Updated Successfully')
    elif request.method == 'GET':
        try:
            existing_job= Job.objects.get(id=id)
            job_serializer = JobSerializer(existing_job)
            o = job_serializer.data
            return JsonResponse(o, safe=False)
        except:
            return HttpResponse('Something Went Wrong')
    else:
        return JsonResponse({"status": False, "Desc": "Wrong Request Method"})




# VIEW JOB AND APPLICANTS TO RECRUITER
@api_view(['GET'])
def view_job_applicants(request,userid):
    if request.method == 'GET':
        data = {}
        jobobj = Job.objects.select_related('recruiter').filter(recruiter_id=userid)
        for i in range(len(jobobj)):
            data[i] = {}
            data[i]['job'] = JobSerializer(jobobj[i]).data
            data[i]['applicant'] = {}
            applicantjobobj = ApplicantResumeJobRecruiter.objects.select_related('job').filter(job_id=jobobj[i].id)
            for j in range(len(applicantjobobj)):
                data[i]['applicant'][j] = {}

                data[i]['applicant'][j].update(SignupSerializer(applicantjobobj[j].applicant).data)

                applicantprofileobj = ApplicantProfile.objects.get(applicant=applicantjobobj[j].applicant.id)
                data[i]['applicant'][j].update(ApplicantProfileSerializer(applicantprofileobj).data)

                applicantresumeobj = Resume.objects.get(applicant=applicantjobobj[j].applicant.id)
                data[i]['applicant'][j].update(ResumeSerializer(applicantresumeobj).data)

        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({"status": False, "Desc": "Wrong Request Method"})


# RECRUITER STATUS UPDATE
@csrf_exempt
@api_view(['PUT'])
def status_update(request):
    if request.method == 'PUT':
        data = request.data.get('')

        if not data.applicant or not data.job or not data.status:
            return JsonResponse({"status": False, "Desc": "Coudln't get data from site"})

        else:
            ApplicantResumeJobRecruiter.objects.filter(Q(applicant=data.applicant) & Q(job=data.job)).update(status=data.status)
            return HttpResponse('Status Updated Successfully')
    else:
        # Wrong Request method
        return JsonResponse({"status": False, "Desc": "Wrong Request Method"})



# APPLY FOR JOB
@csrf_exempt
@api_view(['POST'])
def apply_for_job(request):
    if request.method == 'POST':
        data = request.data.get('')

        if not data.applicant or not data.job or not data.status:
            return JsonResponse({"status": False, "Desc": "Coudln't get data from site"})

        else:
            existing_status = ApplicantResumeJobRecruiter.objects.filter(Q(applicant=data.applicant) & Q(job=data.job))
            if not existing_status:
                general_serialized = ApplicantResumeJobRecruiterSerializer(data=data)
                if general_serialized.is_valid():
                    general_serialized.save()
            else:
                return HttpResponse('Already Applied For This Job')
            return HttpResponse('Successfully Applied For Job')
    else:
        # Wrong Request method
        return JsonResponse({"status": False, "Desc": "Wrong Request Method"})



# JOB APPLIED APPLIED BY APPLICANTS
@api_view(['GET'])
def applied_job(request, userid):
    if request.method == 'GET':
        data = []
        jobobj = ApplicantResumeJobRecruiter.objects.select_related('applicant').filter(applicant_id=userid)
        for i in range(len(jobobj)):
            job = JobSerializer(jobobj[i].job).data
            job['status'] = jobobj[i].status
            recruiter = {}
            recruiter.update(SignupSerializer(jobobj[i].job.recruiter).data)
            recruiter.update(RecruiterProfileSerializer(RecruiterProfile.objects.get(recruiter=jobobj[i].job.recruiter.id)).data)
            j = {}
            j['job'] = job
            j['recruiter'] = recruiter
            data.append(j)
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({"status": False, "Desc": "Wrong Request Method"})



# SHOW ALL JOBS
@api_view(['GET'])
def show_job(request):
    if request.method == 'GET':
        data = []
        jobobj = Job.objects.all()
        for i in range(len(jobobj)):
            job = JobSerializer(jobobj[i]).data
            recruiter = {}
            recruiter.update(SignupSerializer(jobobj[i].recruiter).data)
            recruiter.update(RecruiterProfileSerializer(RecruiterProfile.objects.get(recruiter=jobobj[i].recruiter.id)).data)
            j = {}
            j['job'] = job
            j['recruiter'] = recruiter
            data.append(j)
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({"status": False, "Desc": "Wrong Request Method"})


# 0 - default
# 1 - selected for interview
# 2 - selected for job
# 3 -  rejected

@api_view(['POST', 'GET'])
def send_mails(request,userid):
    userobj = Signup.objects.get(id=userid)
    try:
        # data = request.data.get('')
        if userobj.select == 1:
            subject = "Congrats! You are selected for an interview round."
            message = "Details of interview are as follows:"
            from_email = 'js1910492@gmail.com'
            send_mail(subject,message,from_email,[userobj.email],fail_silently=False)
            print("select 1 mail sent")
        if userobj.select == 2:
            subject = "Congrats! You are selected for an job"
            message = "Details of job are as follows:"
            from_email = 'js1910492@gmail.com'
            send_mail(subject, message, from_email,[userobj.email], fail_silently=False)
            print("select 2 mail sent")

        if userobj.select == 3:
            subject = "Sorry! You are not selected for an job"
            message = "Better luck next time"
            from_email = 'js1910492@gmail.com'
            send_mail(subject, message, from_email, [userobj.email], fail_silently=False)
            print("select 3 mail sent")
    except:
        print("failed to send mail")