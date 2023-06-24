from app.models.tasktype import db, TaskType, environment, SCHEMA
from sqlalchemy.sql import text

def seed_task_types():
    task_type1 = TaskType(
        type='General Mounting'
    )

    task_type2 = TaskType(
        type='Minor Home Repairs'
    )

    task_type3 = TaskType(
        type='Cleaning'
    )

    task_type4 = TaskType(
        type='Yard Work'
    )

    task_type5 = TaskType(
        type='Plumbing Help'
    )

    task_type6 = TaskType(
        type='Indoor Painting'
    )

    task_type7 = TaskType(
        type='Heavy Lifting and Loading'
    )

    task_type8 = TaskType(
        type='Waiting in Line'
    )

    task_type9 = TaskType(
        type='Pet Sitting'
    )

    task_type10 = TaskType(
        type='Cooking/Baking'
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
