from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField

class Signup(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=320,null=False,blank=False)
    first_name = models.CharField(max_length=50,null=False,blank=False)
    last_name = models.CharField(max_length=50,null=False,blank=False)
    gender = models.CharField(default="null",max_length=50,null=False,blank=False)
    mobile_no = models.CharField(max_length=50,null=False,blank=False)
    password = models.CharField(max_length=300,null=False,blank=False)
    role = models.CharField(default="null",max_length=50, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.BooleanField(default="True")

    class Meta:
        db_table = 'user_login'

class Tokens(models.Model):
    id = models.AutoField(primary_key=True)
    value = models.CharField(max_length=255)
    valid_upto = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey(Signup, related_name='TOKEN', on_delete=models.CASCADE)

    class Meta:
        db_table = 'tokens'

class RecruiterProfile(models.Model):
    recruiter = models.ForeignKey(Signup,related_name='RECRUITER',on_delete=models.CASCADE,blank=True,null=True)
    company_name = models.CharField(max_length=200, null=True, blank=True)
    company_location = models.CharField(max_length=200, null=True, blank=True)
    company_contact = models.CharField(max_length=50, null=True, blank=True)
    company_description = models.TextField(max_length=500, null=True, blank=True)
    company_website = models.CharField(max_length=200, null=True, blank=True)
    designation = models.CharField(max_length=50, null=True, blank=True)
    years_of_experience = models.IntegerField(null=True, blank=True)
    total_candidates_hired = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'recruiter_details'

class ApplicantProfile(models.Model):
    applicant = models.ForeignKey(Signup, related_name='APPLICANT', on_delete=models.CASCADE, blank=True, null=True)
    roles = models.CharField(max_length=200, null=True, blank=True)
    skills = models.CharField(max_length=200, null=True, blank=True)
    period = models.CharField(max_length=200, null=True, blank=True)
    education = models.CharField(max_length=200, null=True, blank=True)
    companies = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'applicant_details'

class Resume(models.Model):
    applicant = models.ForeignKey(Signup, related_name='APPLICANTRESUME', on_delete=models.CASCADE, blank=True, null=True)
    resume = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'applicant_resume'

class Job(models.Model):
    id = models.AutoField(primary_key=True)
    recruiter = models.ForeignKey(Signup, related_name='RECRUITERJOB', on_delete=models.CASCADE, blank=True, null=True)
    designation = models.CharField(max_length=200, null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    start_date = models.DateField(blank=True, null=True)
    duration = models.FloatField(null=True, blank=True)
    stipend = models.FloatField(null=True, blank=True)
    apply_by = models.DateField(blank=True, null=True)
    job_description = models.TextField(null=True, blank=True)
    skills_required = ArrayField(models.CharField(max_length=255), blank=True, null=True)
    who_can_apply = models.TextField(null=True, blank=True)
    perks = models.TextField(null=True, blank=True)
    number_of_openings = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'recruiter_job'

class ApplicantResumeJobRecruiter(models.Model):
    applicant = models.ForeignKey(Signup, related_name='APPLICANTFKTABLE', on_delete=models.CASCADE, blank=True,null=True)
    job = models.ForeignKey(Job, related_name='JOBFKTABLE', on_delete=models.CASCADE, blank=True,null=True)
    status = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'applicant_resume_job_recruiter'

