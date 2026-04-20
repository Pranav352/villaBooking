from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.
    if response is not None:
        custom_data = {
            "status": "error",
            "code": response.status_code,
            "message": str(exc),
            "details": response.data
        }
        
        # If the original error message is just a string in 'detail', use it as the main message
        if isinstance(response.data, dict) and 'detail' in response.data:
            custom_data['message'] = response.data['detail']
            del response.data['detail']
            
        response.data = custom_data

    return response
