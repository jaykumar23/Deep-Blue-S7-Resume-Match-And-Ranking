from django.test import TestCase

# Create your tests here.
# https://drive.google.com/uc?export=download&id=1MF1ZWrlgkBaEirxT_WFDCt520FX1Qmb8
# url = 'https://ipapi.co/' + ip + '/json/'
# contents = urllib.request.urlopen(url).read()

# JOB OPERATIONS
# @api_view(['PUT','POST', 'GET'])
# def upload_job(request):
#     if request.method == 'PUT' or request.method == 'POST':
#         data = request.data
#         print('done1')
#         # existing_job = Job.objects.filter(id=id)
#         # if not existing_job:
#         general_serialized = JobSerializer(data=data)
#         print('done2')
#         if general_serialized.is_valid():
#             general_serialized.save()
#             print('done')
#         else:
#             print('not')
#         return HttpResponse('Job Uploaded Successfully')
#         # else:
#         #     Job.objects.filter(id=id).update(designation=data['designation'], location=data['location'], start_date=data['start_date'], duration=data['duration'], stipend=data['stipend'], apply_by=data['apply_by'], job_description=data['job_description'], skills_required=data['skills_required'], who_can_apply=data['who_can_apply'], perks=data['perks'], number_of_openings=data['number_of_openings'], updated_at=timezone.now())
#         #     return HttpResponse('Job Updated Successfully')
#     elif request.method == 'GET':
#         try:
#             id = request.data.get('id')
#             existing_job= Job.objects.get(id=id)
#             job_serializer = JobSerializer(existing_job)
#             o = job_serializer.data
#             return JsonResponse(o, safe=False)
#         except:
#             return HttpResponse('Something Went Wrong')
#     else:
#         return JsonResponse({"status": False, "Desc": "Wrong Request Method"})