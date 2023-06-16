# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
    * when i'm on the signup page I should be able to
        1. add my firstname, lastname, email address, phone number and area zip code on a clearly laid out form
        2. create a password
    * on correct information passed in
        * when I hit the "create account" button it should correctly log me in and allow me to start creating tasks
    * When I enter invalid data on the sign-up form:
        * The website should inform me of the failed validations and repopulate the form with my inputs
            * First Name: Can't be blank
            * Last Name: Can't be blank
            * Email Address: Can't be blank, Must be a valid email address
            * Phone Number: Can't be blank, Phone number is not valid
            * Password: Can't be blank
            * Zip Code: Can't be blank


## Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
    * When I'm on the '/login' page:
        * I would like to be able to enter my email and password on a clearly laid out form.
        * I would like the website to log me in upon successful completion of the
        log-in form.
        * When I enter invalid data on the log-in form:
            * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries
            (except my password).
            * I don't want to have to refill the form again with the valid data I had
            in there.

## Demo User

* As an unregistered, unauthorized and site testing user, I would like an easy way to log-in
    as a demo-user so I can access the functionality without having to sign-up:
    * I would like an easy to read and notice "Login as Demo-User" button that logs me in
        as a demo_user upon clicking the button.
        * This way I can easily log-in and test the site's features and functionality without
            needing to sign-up and enter credentials.
    * I would like the button to be on both the '/signup' and '/login' pages so I can easily
        notice it.

