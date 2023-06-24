
from app.models.task import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_tasks():
    task1 = Task(
        taskTypeId=4,
        title='Get icecream from popular icecream place',
        description='Stand in a looooong line to get me some icecream any flavor',
        totalPrice=130.65,
        location='California',
        task_date=date(2023, 6, 21), # This sets the task_datetime to June 21, 2023
        user_id=1,
        tasker_id=2
    )
    task2 = Task(
        taskTypeId=1,
        title='Mount something on my wall',
        description='I would like this huge sword to be mounted on my wall',
        totalPrice=256.34,
        location='California',
        task_date=date(2022, 6, 21),
        user_id=1,
        tasker_id=3
    )

    task3 = Task(
        taskTypeId=2,
        title='Help!!! Clean!!!',
        description='tons of cleaning needed of a newly aquired house',
        totalPrice=1056.65,
        location='California',
        task_date=date(2021, 6, 21),
        user_id=2,
        tasker_id=1
    )

    task4 = Task(
        taskTypeId=3,
        title='Garage door needs minor repair',
        description='Garage door wont open, it gets stuck on something',
        totalPrice=333.75,
        location='California',
        task_date=date(2020, 6, 21),
        user_id=2,
        tasker_id=3
    )

    task5 = Task(
        taskTypeId=4,
        title='Huge overgrown yard',
        description='The last people who owned the house let the backyard go wild full removal of plants',
        totalPrice=435.65,
        location='California',
        task_date=date(2023, 6, 21),
        user_id=3,
        tasker_id=1
    )

    task6 = Task(
        taskTypeId=5,
        title='Im Drowning!!',
        description='My bathtub faucet burst and I cant stop it from coming out!!',
        totalPrice=1233.89,
        location='California',
        task_date=date(2023, 6, 21),
        user_id=3,
        tasker_id=3
    )
    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)
    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
