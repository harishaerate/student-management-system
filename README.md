# Student Management System

# Overview

This is a RESTful API built using Node.js and Express.js with MongoDB Atlas for database storage. The API allows admins to manage students and assign tasks, while students can log in, view, and update their tasks.

Authentication: The API uses Basic Authentication via headers (email:password).

# Features

Admin Panel

    * Admin Login: Uses predefined credentials (email: admin@admin.com, password: admin).
    * Add Students: Register students with name, email, department, and password.
    * Assign Tasks: Assign tasks to students with a due date and status.

Student Interface

    * Student Login: Students can log in using their email and password.
    * View Tasks: Retrieve all tasks assigned to the student.
    * View Task Status: Fetch the status of a specific task using the title.
    * Update Task Status: Change the status of a task and update the updated_at timestamp.

# Installation & Setup

    1. Clone the repository using - git clone ""
    2. cd student-management-system
    3. npm run build (This will install all the packages required as well as starting the application)

# Admin APIs

--> Import the below curL commands to postman in order to test the admin backend api services

1. Admin Login API
curl --location 'http://localhost:5002/api/admin/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "admin@admin.com",
    "password": "admin"
}'

2. Admin Add Students API -  
curl --location 'http://localhost:5002/api/admin/addStudents' \
--header 'Content-Type: application/json' \
--data-raw '{
"name": "Harish",
"email": <<EMAIL>>,
"department": "ECE",
"password": <<PASSWORD>>,
"tasks": [""]
}'

3. Admin Add Tasks API
curl --location 'http://localhost:5002/api/admin/addTasks' \
--header 'Content-Type: application/json' \
--data-raw '{
    "student_email": "harishaerate@gmail.com",
    "title": "Build Student Management System",
    "description": "Create APIs for student management using Express.js and MongoDB.",
    "due_date": "2025-03-22",
    "status": "pending"
}'


# Student APIs

--> Import the below curL commands to postman in order to test the student backend api services

1. Student Login API
curl --location --request POST 'http://localhost:5002/student/login' \
--header 'email: <<STUDENT_EMAIL>>' \
--header 'password: <<PASSWORD>>'

2. Student View Tasks API
curl --location 'http://localhost:5002/api/student/view_tasks' \
--header 'Authorization: Basic <<STUDENT_EMAIL>>:<<PASSWORD>>' \
--data ''

3. Student Task Status API
curl --location 'http://localhost:5002/api/student/task_status?title=Build%20Student%20Management%20System' \
--header 'Authorization: Basic <<STUDENT_EMAIL>>:<<PASSWORD>>'

4. Student Update Task Status API
curl --location 'http://localhost:5002/api/student/update_task' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic <<STUDENT_EMAIL>>:<<PASSWORD>>' \
--data '{
           "title": <<TASK_TITLE>>,
           "new_status": <<STATUS_TO_UPDATE>>
}'