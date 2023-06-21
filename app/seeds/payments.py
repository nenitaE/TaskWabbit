
from app.models.user import db, Payment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_payments():
    payment1 = Payment(
        amount=130.65,
        user_id=1,
        task_id=1,
    )

    payment2 = Payment(
        amount=256.34,
        user_id=1,
        task_id=2,
    )

    payment3 = Payment(
        amount=1056.65,
        user_id=2,
        task_id=3,
    )

    payment4 = Payment(
        amount=333.75,
        user_id=2,
        task_id=4,
    )

    payment5 = Payment(
        amount=435.65,
        user_id=3,
        task_id=5,
    )

    payment6 = Payment(
        amount=1233.89,
        user_id=3,
        task_id=6,
    )

    db.session.add(payment1)
    db.session.add(payment2)
    db.session.add(payment3)
    db.session.add(payment4)
    db.session.add(payment5)
    db.session.add(payment6)
    db.session.commit()

def undo_payments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.payments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM payments"))

    db.session.commit()
