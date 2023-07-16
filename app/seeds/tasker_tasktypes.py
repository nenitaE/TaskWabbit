from app.models.taskertasktype import db, TaskerTaskType, environment, SCHEMA
from sqlalchemy.sql import text
from sqlalchemy.exc import SQLAlchemyError


def seed_TaskerTaskTypes():
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
        taskType_id = 1
    )
    taskersTaskType12 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 3,
        taskType_id = 5
    )
    taskersTaskType13 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 3,
        taskType_id = 10
    )
    taskersTaskType14 = TaskerTaskType(
        hourlyRate = 89,
        tasker_id = 5,
        taskType_id = 9
    )
    taskersTaskType15 = TaskerTaskType(
        hourlyRate = 56,
        tasker_id = 5,
        taskType_id = 10
    )
    taskersTaskType16 = TaskerTaskType(
        hourlyRate = 90,
        tasker_id = 5,
        taskType_id = 3
    )
    taskersTaskType17 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 5,
        taskType_id = 5
    )
    taskersTaskType18 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 6,
        taskType_id = 9
    )
    taskersTaskType19 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 6,
        taskType_id = 10
    )
    taskersTaskType20 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 6,
        taskType_id = 6
    )
    taskersTaskType21 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 6,
        taskType_id = 7
    )
    taskersTaskType22 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 9,
        taskType_id = 7
    )
    taskersTaskType23 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 9,
        taskType_id = 8
    )
    taskersTaskType24 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 9,
        taskType_id = 3
    )
    taskersTaskType25 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 11,
        taskType_id = 2
    )
    taskersTaskType26 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 11,
        taskType_id = 6
    )
    taskersTaskType27 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 12,
        taskType_id = 7
    )
    taskersTaskType28 = TaskerTaskType(
        hourlyRate = 60,
        tasker_id = 12,
        taskType_id = 8
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
    db.session.add(taskersTaskType14)
    db.session.add(taskersTaskType15)
    db.session.add(taskersTaskType16)
    db.session.add(taskersTaskType17)
    db.session.add(taskersTaskType18)
    db.session.add(taskersTaskType19)
    db.session.add(taskersTaskType20)
    db.session.add(taskersTaskType21)
    db.session.add(taskersTaskType22)
    db.session.add(taskersTaskType23)
    db.session.add(taskersTaskType24)
    db.session.add(taskersTaskType25)
    db.session.add(taskersTaskType26)
    db.session.add(taskersTaskType27)
    db.session.add(taskersTaskType28)
    db.session.commit()


def undo_TaskerTaskTypes():
    try:
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.taskertasktypes RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM taskertasktypes"))
        db.session.commit()
    except SQLAlchemyError as e:
        print(f"An error occurred while truncating/deleting taskertasktypes: {str(e)}")
