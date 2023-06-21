

from app.models.user import db, TaskerTaskType,environment, SCHEMA
from sqlalchemy.sql import text


def seed_taskerTaskTypes():
    taskersTaskType1 = TaskerTaskType(
        hourlyRate = 25,
        tasker_id = 3,
        taskType_id = 1
    )
    taskersTaskType2 = TaskerTaskType(
        hourlyRate = 45,
        tasker_id = 1,
        taskType_id = 2
    )
    taskersTaskType3 = TaskerTaskType(
        hourlyRate = 65,
        tasker_id = 3,
        taskType_id = 3
    )
    taskersTaskType4 = TaskerTaskType(
        hourlyRate = 50,
        tasker_id = 1,
        taskType_id = 4
    )
    taskersTaskType5 = TaskerTaskType(
        hourlyRate = 85,
        tasker_id = 1,
        taskType_id = 6
    )
    taskersTaskType6 = TaskerTaskType(
        hourlyRate = 58,
        tasker_id = 1,
        taskType_id = 7
    )
    taskersTaskType7 = TaskerTaskType(
        hourlyRate = 76,
        tasker_id = 1,
        taskType_id = 8
    )
    taskersTaskType8 = TaskerTaskType(
        hourlyRate = 78,
        tasker_id = 2,
        taskType_id = 2
    )
    taskersTaskType9 = TaskerTaskType(
        hourlyRate = 89,
        tasker_id = 2,
        taskType_id = 4
    )
    taskersTaskType10 = TaskerTaskType(
        hourlyRate = 56,
        tasker_id = 2,
        taskType_id = 9
    )
    taskersTaskType11 = TaskerTaskType(
        hourlyRate = 90,
        tasker_id = 2,
        taskType_id = 0
    )
    taskersTaskType12 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 3,
        taskType_id = 5
    )
    taskersTaskType13 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 3,
        taskType_id = 3
    )

    db.session.add(taskersTaskType1)
    db.session.add(taskersTaskType2)
    db.session.add(taskersTaskType3)
    db.session.add(taskersTaskType4)
    db.session.add(taskersTaskType5)
    db.session.add(taskersTaskType6)
    db.session.add(taskersTaskType7)
    db.session.add(taskersTaskType8)
    db.session.add(taskersTaskType9)
    db.session.add(taskersTaskType10)
    db.session.add(taskersTaskType11)
    db.session.add(taskersTaskType12)
    db.session.add(taskersTaskType13)
    db.session.commit()


def undo_taskerTaskTypes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.taskerTaskTypes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM taskerTaskTypes"))

    db.session.commit()
