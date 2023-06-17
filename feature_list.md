# MVP LIST ______________________
TaskWabbit a TaskRabbit clone is a website for users to get assistance with errands/tasks from local talent

## 1. New account creation, log in, log out, and guest/demo login

* Users can sign up, log in, and log out.
* Users can use a demo log in to try the site.
* Users can't use certain features without logging in (like creating a task, create, edit, or delete reviews, and becoming a tasker).
* When a user logs in they should be directed to the home page
     * the navigation bar should not show sign-up or log-in
     * the navigation bar should show become-a-tasker and logout
* When a user logs out they should be directed to the homepage.
    * the navigation bar should not show become-a-tasker and logout
    * the navigation bar should show sign-up or log-in

# -------------------------------

Features:
## 1. Choose a task:
Methods: GET

Logged in users can search for the task they want done
Logged out users can search for the task they want done

## 2. Provide task details:
Methods: GET, POST, DELETE, PUT

Only logged in users are allowed to create, update, delete or view tasks.

## 3. Select Hourly-rate range & confirm:
Methods: GET (more like a filter of the different taskers)

Only logged in users are allowed to select the price range and confirm it


## 4. Choose a tasker:
Methods: GET, POST (find the tasker you want and then pay them in a cart)

Only logged in users are allowed to choose a tasker for their task

## 5. Reviews for the tasker after Task completion:
Methods: GET, POST, PUT, DELETE

Only logged in users are allowed to view, create, update or delete a review for taskers they have used

Possible bonuses:
Bonus: Become a Tasker
Bonus: Fake Payment & Billing
# --------------------------------
