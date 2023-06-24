from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class TaskerTaskType(db.Model):
    __tablename__ = 'taskertasktypes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    hourlyRate = db.Column(db.Integer)
    tasker_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    taskType_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasktype.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    tasker = db.relationship('user', back_populates='taskertasktypes')
    taskType = db.relationship('tasktype', back_populates='taskertasktypes')
