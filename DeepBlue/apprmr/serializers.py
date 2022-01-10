from rest_framework import serializers
from .models import *

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        db_table: 'user_login'
        model = Signup
        abstract =True
        fields = '__all__'

class RecruiterProfileSerializer(serializers.ModelSerializer):
    class Meta:
        db_table: 'recruiter_details'
        model = RecruiterProfile
        abstract =True
        fields = '__all__'

class ApplicantProfileSerializer(serializers.ModelSerializer):
    class Meta:
        db_table: 'applicant_details'
        model = ApplicantProfile
        abstract =True
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        db_table: 'applicant_resume'
        model = Resume
        abstract =True
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        db_table: 'recruiter_job'
        model = Job
        abstract =True
        fields = '__all__'

class ApplicantResumeJobRecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        db_table: 'applicant_resume_job_recruiter'
        model = ApplicantResumeJobRecruiter
        abstract =True
        fields = '__all__'