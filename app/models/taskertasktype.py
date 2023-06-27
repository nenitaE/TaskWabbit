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
    taskType_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasktypes.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)


    tasker = db.relationship('User', back_populates='taskertasktypes')
    taskType = db.relationship('TaskType', back_populates='taskertasktypes')

    def to_dict(self):
        return {
            'id': self.id,
            'hourlyRate': self.hourlyRate,
            'tasker_id': self.tasker_id,
            'taskType_id': self.taskType_id,
        }

    def to_dict(self):
        return {
            'hourlyRate': self.hourlyRate,
            'tasker_id': self.tasker_id,
            'taskType_id': self.taskType_id,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()            
        }
    
    def to_dict_full(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'username': self.username,
            'phone': self.phone,
            'location': self.location,
            'email': self.email,
            'isTasker': self.isTasker,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat(),
            'tasks': [task.to_dict() for task in self.tasks],
            'reviews': [review.to_dict() for review in self.received_reviews],
            'taskerTaskTypes': [taskertasktype.to_dict() for taskertasktype in self.taskertasktypes]
        }
