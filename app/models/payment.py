from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Payment(db.Model, UserMixin):
    __tablename__ = 'Payments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('Users.id')), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('Tasks.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='payments')
    task = db.relationship('Task', back_populates='payments')
