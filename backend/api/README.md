# Schedule Management POC
# API and Unit Testing Usage
# --------------------Laravel Project Setup------------------------------ #
create database in mysql with name `manage_schedule`
# To migrate the database table
On command prompt go to project folder location and run the following command
-> php artisan migrate

# To Run the Laravel Project
On command prompt go to project folder location and run the following command 
-> php artisan serve

# ------------------------------API-------------------------------#

**Add Schedule api**
url: http://127.0.0.1:8000/api/schedules/destroy?start_time=10:30:00&allocated_day=Wednesday)

Method : POST

Body : {
	"start_date": "2022-11-14",
	"end_date": "2022-12-04",
	"slots": {
        "Tuesday": [{
			"start_time": "02:30:00",
			"allocated_slot": 10
		},{
			"start_time": "04:30:00",
			"allocated_slot": 10
		}]
	}
}

# Response :
{
    "status": 200,
    "msg": "Schedule Saved successfully"
}

# Error:
## *IF Parameters are invalid* 
{
    "status": 400,
    "error": "Bad request (something wrong with URL or parameters)",
    "error_description": "The start date does not match the format Y-m-d. The end date must be a date after or equal to start date. "
}

## *IF Data not saved in Database due to any issue*
{
    "status": 422,
    "error": "Unprocessable Entity (validation failed)",
    "error_description": "Somthing went wrong"
}

## ----------------------------------------------------------------- ##

**Display list of schedules**

url:http://demo.webuters.com:8100/api/schedules?start_date=2022-12-06&end_date=2022-12-20

Method : GET

# Response : 
{
    "status": 200,
    "slots": {
        "Monday": [],
        "Tuesday": [],
        "Wednesday": [],
        "Thursday": [
            {
                "id": 177,
                "allocated_day": "Thursday",
                "start_time": "04:30:00",
                "allocated_slot": 4
            },
            {
                "id": 179,
                "allocated_day": "Thursday",
                "start_time": "02:30:00",
                "allocated_slot": 2
            }
        ],
        "Friday": [
            {
                "id": 175,
                "allocated_day": "Friday",
                "start_time": "09:30:00",
                "allocated_slot": 10
            }
        ],
        "Saturday": [],
        "Sunday": []
    }
}

# Errors
## *IF Parameters are invalid*
{
    "status": 400,
    "error": "Bad request (something wrong with URL or parameters)",
    "error_description": "The start date does not match the format Y-m-d. The end date must be a date after or equal to start date. "
}

## *IF Data not saved in Database due to any issue*
{
    "status": 422,
    "error": "Unprocessable Entity (validation failed)",
    "error_description": "Somthing went wrong"
}

## ----------------------------------------------------------------- ##

**Delete schedules slots**

url:http://demo.webuters.com:8100/api/schedules/destroy?start_time=04:30:00&allocated_day=Thursday

Method : DELETE

# Response:
{
    "status": 200,
    "message": "slots deleted successfully."
}

# Errors
## *IF Parameters are invalid*
{
    "status": 400,
    "error": "Bad request (something wrong with URL or parameters)",
    "error_description": "The start date does not match the format Y-m-d. The end date must be a date after or equal to start date. "
}

## *IF Data not saved in Database due to any issue*
{
    "status": 422,
    "error": "Unprocessable Entity (validation failed)",
    "error_description": "Somthing went wrong"
}


## --------------------------------UNIT TESTING -------------------------------## 
# *Steps to do the Unit testing*
1)open the terminal 
2)go to your project folder 
eg : cd /var/www/html/manage_schedule 
3) run the test command to execute the test cases.
# *php artisan test* 
