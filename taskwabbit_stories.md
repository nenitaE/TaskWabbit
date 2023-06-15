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
