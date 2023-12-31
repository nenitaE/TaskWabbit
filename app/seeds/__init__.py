from flask.cli import AppGroup
from .users import seed_users, undo_users
from .tasks import seed_tasks, undo_tasks
from .task_types import seed_task_types, undo_task_types
from .reviews import seed_reviews, undo_reviews
from .tasker_tasktypes import seed_TaskerTaskTypes, undo_TaskerTaskTypes
from .payments import seed_payments, undo_payments

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below

        undo_TaskerTaskTypes()
        undo_payments()
        undo_reviews()
        undo_tasks()
        undo_task_types()
        undo_users()

    seed_users()
    seed_task_types()
    seed_tasks()
    seed_reviews()
    seed_payments()
    seed_TaskerTaskTypes()


    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_TaskerTaskTypes()
    undo_payments()
    undo_reviews()
    undo_tasks()
    undo_task_types()
    undo_users()
    # Add other undo functions here
