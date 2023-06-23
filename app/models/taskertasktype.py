from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class TaskerTaskType(db.Model):
    __tablename__ = 'TaskerTaskTypes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    hourlyRate = db.Column(db.Integer)
    tasker_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('Users.id')), nullable=False)
    taskType_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('TaskType.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    tasker = db.relationship('User', back_populates='taskerTaskTypes')
    taskType = db.relationship('TaskType', back_populates='taskerTaskTypes')
