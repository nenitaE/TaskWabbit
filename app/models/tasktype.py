from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class TaskType(db.Model):
    __tablename__ = 'tasktypes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Text)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow)

    tasks = db.relationship('Task', back_populates='taskType')
    taskertasktypes = db.relationship('TaskerTaskType', back_populates='taskType')

    def to_dict(self):
        return {
            'type': self.type,
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

    
