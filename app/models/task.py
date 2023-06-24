from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from datetime import date
from sqlalchemy import Date

class Task(db.Model, UserMixin):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    taskTypeId = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod('tasktype.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    totalPrice = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(100))
    task_date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    tasker_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    taskType = db.relationship('tasktype', back_populates='tasks')
    user = db.relationship('user',foreign_keys='task.user_id', back_populates='tasks')
    tasker = db.relationship('user', foreign_keys='task.tasker_id', back_populates='tasked_tasks')
    payments = db.relationship('payment', back_populates='task', cascade="all, delete-orphan")
