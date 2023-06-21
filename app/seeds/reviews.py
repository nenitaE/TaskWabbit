from app.models.user import db, Review , environment, SCHEMA
from sqlalchemy.sql import text


# Adds a review
def seed_reviews():
    review1 = Review(
        description='Great job!  Arrived on time and was very professional and fast.',
        rating=5,
        user_id=1,
        tasker_id=3
    )
    review2 = Review(
        description='Tasker was very professional and worked fast.  Left a scuff mark on my wall.',
        rating=4,
        user_id=2,
        tasker_id=1
    )
    review3 = Review(
        description='Tasker arrived late but did complete the task as requested.',
        rating=3,
        user_id=2,
        tasker_id=2
    )


    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
