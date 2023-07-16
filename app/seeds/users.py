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

    jack = User(
       firstName='Jack',
       lastName='Timethy',
       username='jack',
       phone='1122334444',
       location='California',
       email='jack@aa.io',
       isTasker=True,
       password='password'
    )

    sarah = User(
       firstName='Sarah',
       lastName='Smith',
       username='sarah',
       phone='1122444445',
       location='California',
       email='sarah@aa.io',
       isTasker=True,
       password='password'
    )

    melisa = User(
       firstName='melisa',
       lastName='Smith',
       username='melisa',
       phone='1122334555',
       location='California',
       email='melisa@aa.io',
       isTasker=False,
       password='password'
    )

    sam = User(
       firstName='Sam',
       lastName='Smith',
       username='sam',
       phone='1122554445',
       location='California',
       email='sam@aa.io',
       isTasker=False,
       password='password'
    )

    tony = User(
       firstName='Tony',
       lastName='Brown',
       username='tony',
       phone='1122334440',
       location='California',
       email='tony@aa.io',
       isTasker=True,
       password='password'
    )

    james = User(
       firstName='James',
       lastName='Smith',
       username='james',
       phone='1122004445',
       location='California',
       email='james@aa.io',
       isTasker=False,
       password='password'
    )

    brian = User(
       firstName='Brian',
       lastName='Terry',
       username='brian',
       phone='1022334445',
       location='California',
       email='brian@aa.io',
       isTasker=True,
       password='password'
    )

    jhon = User(
       firstName='Jhon',
       lastName='Stat',
       username='jhon',
       phone='1122334010',
       location='California',
       email='jhon@aa.io',
       isTasker=True,
       password='password'
    )

    nicole = User(
       firstName='Nicole',
       lastName='Smith',
       username='nicole',
       phone='1122334111',
       location='California',
       email='nicole@aa.io',
       isTasker=False,
       password='password'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(cameron)
    db.session.add(jack)
    db.session.add(sarah)
    db.session.add(melisa)
    db.session.add(sam)
    db.session.add(tony)
    db.session.add(james)
    db.session.add(brian)
    db.session.add(jhon)
    db.session.add(nicole)
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
