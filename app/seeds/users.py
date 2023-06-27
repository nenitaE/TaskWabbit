from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='Demo',
        lastName='Lition',
        username='demo',
        phone='1234567890',
        location='California',
        email='demo@aa.io',
        isTasker=True,
        password='password'
    )
    marnie = User(
        firstName='Marnie',
        lastName='Barnie',
        username='marnie',
        phone='0987654321',
        location='California',
        email='marnie@aa.io',
        isTasker=True,
        password='password'
    )
    bobbie = User(
       firstName='Bobbie',
       lastName='Bobberson',
       username='bobbie',
       phone='1122334455',
       location='California',
       email='bobbie@aa.io',
       isTasker=True,
       password='password'
    )
    cameron = User(
       firstName='Cameron',
       lastName='Smith',
       username='cameron',
       phone='1122334445',
       location='California',
       email='cam@aa.io',
       isTasker=False,
       password='password'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(cameron)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
