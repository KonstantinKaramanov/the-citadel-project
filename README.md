# The-Citadel
SoftUni ReactJS 2023 Project
[View Live] : https://the-citadel-project.web.app/


![Home page preview](https://user-images.githubusercontent.com/43795769/236678300-99f2ec47-0cfb-492d-8b73-6dea86908361.png)


## About The Project - Non-technical Description

The project is designed as a platform for a Teaching Service, facilitating the needs browsing users (guests) as well as teachers and students. The main "unit" in this platform is the class which can be viewed, created, booked, modified and deleted depending on certain user roles.

This [project](https://github.com/KonstantinKaramanov/the-citadel-project-softuni) was created by [Konstantin Karamanov](https://github.com/KonstantinKaramanov) for the purposes of React. js Softuni Course, 2023.



## Public part

This part of the platform is designed for non-registered users. These users have access to the following:

* Home page -> 
Main dashboard page in which the user can find basic information about the studio as well as the latest classes
* Classes -> 
Classes catalog page which lists all available classes with filtering options
* Class Details Page -> 
A page offering more detailed information about classes such as: description, group size, start/end time etc.
* Teachers-> 
A page listing all teachers registered in the platform with their avatars and names.
* Contact-> 
A page giving contact information as well as the option to sent an email to the admin of the platform.
* Login-> 
A page where the login form for already registered users is located.
* Register-> 
A page where the register form for non-users is located.

## Private part

### teachers private pages

* Profile -> 
The page where a teacher can view their user information as well as the classes they teach. (created by them).
* Create Class -> 
A page with a form for creation of classes.
* Edit Class -> 
A page with a form for modification of a particularly selected class, part of their classes.
* Delete Class -> 
A page with a confirmation about the deletion of particularly selected class, part of their classes.

### Students private pages
* Profile -> 
The page where a student can view their user information as well as the classes they have booked.
* Book a class (Functionality) -> 
The ability to book a class that has free spots available.


## About The Project - Technical Description


### Built With


* [React.js](https://reactjs.org/)
* [Firebase] : Database + Hosting
* [EmailJS](https://www.emailjs.com/)
* [HTML + CSS Free tempaltes from Theme Forest](https://themeforest.net/category/site-templates)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!



## Learn More About React JS

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
