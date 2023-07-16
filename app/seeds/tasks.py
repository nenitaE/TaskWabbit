
from app.models.task import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_tasks():
    task1 = Task(
        taskTypeId=4,
        title='Need front yard update',
        description='Need someone to cut overgrown shrubs and add mulch around trees.',
        totalPrice=101.54,
        location='California',
        task_date=date(2023, 6, 21), # This sets the task_datetime to June 21, 2023
        user_id=1,
        tasker_id=2
    )
    task2 = Task(
        taskTypeId=1,
        title='Mount something on my wall',
        description='I would like this huge sword to be mounted on my wall',
        totalPrice=37.54,
        location='California',
        task_date=date(2022, 6, 21),
        user_id=1,
        tasker_id=3
    )

    task3 = Task(
        taskTypeId=2,
        title='Help!!! Clean!!!',
        description='tons of cleaning needed of a newly acquired house',
        totalPrice=57.54,
        location='California',
        task_date=date(2021, 6, 21),
        user_id=2,
        tasker_id=1
    )

    task4 = Task(
        taskTypeId=3,
        title='Garage door needs minor repair',
        description='Garage door wont open, it gets stuck on something',
        totalPrice=77.54,
        location='California',
        task_date=date(2020, 6, 21),
        user_id=2,
        tasker_id=3
    )

    task5 = Task(
        taskTypeId=4,
        title='Huge overgrown yard',
        description='The last people who owned the house let the backyard go wild--Need full removal of plants',
        totalPrice=62.54,
        location='California',
        task_date=date(2023, 6, 21),
        user_id=3,
        tasker_id=1
    )

    task6 = Task(
        taskTypeId=5,
        title='Im Drowning!!',
        description='My bathtub faucet burst and I cant stop it from coming out!!',
        totalPrice=60,
        location='California',
        task_date=date(2023, 7, 1),
        user_id=4,
        tasker_id=5
    )

    task7 = Task(
        taskTypeId=3,
        title='Need help cleaning',
        description='i am busy with moving and do not have time to clean',
        totalPrice=90,
        location='California',
        task_date=date(2023, 7, 11),
        user_id=7,
        tasker_id=5
    )

    task8 = Task(
        taskTypeId=9,
        title='Pet Problems',
        description='Need help with my pet, I am busy with work',
        totalPrice=89,
        location='California',
        task_date=date(2023, 7, 9),
        user_id=8,
        tasker_id=5
    )

    task9 = Task(
        taskTypeId=10,
        title='Party time',
        description='I need help making food for my coming party',
        totalPrice=56,
        location='California',
        task_date=date(2023, 7, 8),
        user_id=3,
        tasker_id=5
    )

    task10 = Task(
        taskTypeId=5,
        title='water pipe leaking',
        description='My bathtub faucet has been leaking water for few days',
        totalPrice=60,
        location='California',
        task_date=date(2023, 7, 5),
        user_id=10,
        tasker_id=5
    )

    task11 = Task(
        taskTypeId=9,
        title='Pet Care',
        description='I have not taken my dog out for walk, i have been busy with a project',
        totalPrice=60,
        location='California',
        task_date=date(2023, 7, 10),
        user_id=9,
        tasker_id=6
    )

    task12 = Task(
        taskTypeId=6,
        title='Need help painting my bedroom',
        description='My bedroom paint is coming off, and it has got many marks',
        totalPrice=60,
        location='California',
        task_date=date(2023, 7, 11),
        user_id=13,
        tasker_id=6
    )

    task13 = Task(
        taskTypeId=7,
        title='Refridgerator Heavy Lifting and Loading',
        description='Need help moving refridgerator to 2nd Floor kitchen in townhouse',
        totalPrice=72.54,
        location='California',
        task_date=date(2023, 10, 21), # This sets the task_datetime to June 21, 2023
        user_id=13,
        tasker_id=9
    )

    task14 = Task(
        taskTypeId=8,
        title="Need Laker's tickets",
        description='I would like someone to stand in line to get me tickets the game this weekend',
        totalPrice=72.54,
        location='California',
        task_date=date(2021, 12, 21),
        user_id=10,
        tasker_id=9
    )

    task15 = Task(
        taskTypeId=2,
        title='Repair my pantry shelf.',
        description='Pantry shelf fell; need someone to repair soon',
        totalPrice=72.54,
        location='California',
        task_date=date(2023, 8, 21),
        user_id=8,
        tasker_id=11
    )

    task16 = Task(
        taskTypeId=6,
        title='Need my living room walls painted',
        description='Looking for someone to paint 3 walls in my living room.',
        totalPrice=72.54,
        location='California',
        task_date=date(2020, 1, 4),
        user_id=7,
        tasker_id=11
    )

    task17 = Task(
        taskTypeId=7,
        title='Need someone to help me lift and stack boxes in storage unit',
        description="I'm reorganizing a 10' by 10' storage",
        totalPrice=72.54,
        location='California',
        task_date=date(2023, 11, 1),
        user_id=3,
        tasker_id=12
    )

    task18 = Task(
        taskTypeId=8,
        title='Need someone to lineup for Madonna concert tickets',
        description='I have to work.  Need someone to get tickets to her world tour concert',
        totalPrice=72.54,
        location='California',
        task_date=date(2023, 9, 21),
        user_id=4,
        tasker_id=12
    )

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)
    db.session.add(task7)
    db.session.add(task8)
    db.session.add(task9)
    db.session.add(task10)
    db.session.add(task11)
    db.session.add(task12)
    db.session.add(task13)
    db.session.add(task14)
    db.session.add(task15)
    db.session.add(task16)
    db.session.add(task17)
    db.session.add(task18)
    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
