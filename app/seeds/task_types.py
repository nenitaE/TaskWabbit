from app.models.tasktype import db, TaskType, environment, SCHEMA
from sqlalchemy.sql import text

def seed_task_types():
    task_type1 = TaskType(
        type='General Mounting',
        image='https://nespinosaportfoliobucket.s3.amazonaws.com/mounting.png'
    )

    task_type2 = TaskType(
        type='Minor Home Repairs',
        image='https://nespinosaportfoliobucket.s3.amazonaws.com/homerepairs.png'
    )

    task_type3 = TaskType(
        type='Cleaning',
        image='https://nespinosaportfoliobucket.s3.amazonaws.com/cleaning.png'
    )

    task_type4 = TaskType(
        type='Yard Work',
        image='https://nespinosaportfoliobucket.s3.amazonaws.com/yardwork.png'
    )

    task_type5 = TaskType(
        type='Plumbing Help',
        image='https://nespinosaportfoliobucket.s3.amazonaws.com/plumbing.png'
    )

    task_type6 = TaskType(
        type='Indoor Painting',
        image='https://nespinosaportfoliobucket.s3.amazonaws.com/painting.png'
    )

    task_type7 = TaskType(
        type='Heavy Lifting and Loading',
        image='https://nespinosaportfoliobucket.s3.amazonaws.com/heavylifting.png'
    )

    task_type8 = TaskType(
        type='Waiting in Line',
        image='https://nespinosaportfoliobucket.s3.amazonaws.com/waiting.png'
    )

    task_type9 = TaskType(
        type='Pet Sitting',
        image='https://nespinosaportfoliobucket.s3.amazonaws.com/petsitting.png'
    )

    task_type10 = TaskType(
        type='Cooking/Baking',
        image='https://nespinosaportfoliobucket.s3.amazonaws.com/cooking.png'
    )

    db.session.add(task_type1)
    db.session.add(task_type2)
    db.session.add(task_type3)
    db.session.add(task_type4)
    db.session.add(task_type5)
    db.session.add(task_type6)
    db.session.add(task_type7)
    db.session.add(task_type8)
    db.session.add(task_type9)
    db.session.add(task_type10)
    db.session.commit()

def undo_task_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.tasktypes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasktypes"))

    db.session.commit()
