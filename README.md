# Scratch-search-app

Challenge:
The objective of this challenge is to call some endpoints containing a list of clinics and perform some actions on the result.
Create one RESTful API endpoint to allow search in multiple clinic providers and display results from all the available clinics by any of the following:
Clinic Name
State [ex: "CA" or "California"]
Availability [ex: from: 09:00, to: 20:00]
This is including search by multiple criteria in the same time like search by state and availability together.

-----------------------------------------------------------------------------------------------------------------------------------------------------------

Technology used: Node JS

Step(s) to start the application
  1.	npm start

Steps to start the test file
  1.	Keep the application running / npm start
  2.	Open a new terminal and type: node test.js
  
Assumptions:
  Availabilty: from 12:00 to 14:00, here 14:00 is the end of availability time
  1.	A user cannot enter only the end of availability time (i.e. to) as an input / if availability (from) input is missing then its not a valid input 
  Example: 
    Clinic Name-
    State-
    Availabilty: from-     to- 14:00
  The above example is not allowed

For testing, Selenium framework is used and the name of the test file is test.js.
The frontend code is in the public folder and index.js contains the business logic.
