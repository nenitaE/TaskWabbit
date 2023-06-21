from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime



class User(db.Model, UserMixin):
    __tablename__ = 'Users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    phone = db.Column(db.Integer, unique=True)
    location = db.Column(db.String(100))
    email = db.Column(db.String(255), nullable=False, unique=True)
    isTasker = db.Column(db.Boolean, nullable = False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    tasks = db.relationship('Task', foreign_keys='Task.user_id', back_populates='user')
    tasked_tasks = db.relationship('Task', foreign_keys='Task.tasker_id', back_populates='tasker')
    taskerTaskTypes = db.relationship('TaskerTaskType', back_populates='tasker')
    reviews = db.relationship('Review', foreign_keys='Review.user_id', back_populates='user')
    payments = db.relationship('Payment', back_populates='user')
    received_reviews = db.relationship('Review', foreign_keys='Review.tasker_id', back_populates='tasker')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }


class Task(db.Model):
    __tablename__ = 'Tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    taskTypeId = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod('TaskType.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    totalPrice = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('Users.id')), nullable=False)
    tasker_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('Users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    taskType = db.relationship('TaskType', back_populates='tasks')
    user = db.relationship('User',foreign_keys='Task.user_id', back_populates='tasks')
    tasker = db.relationship('User', foreign_keys='Task.tasker_id', back_populates='tasked_tasks')
    payments = db.relationship('Payment', back_populates='task')

class Payment(db.Model):
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

class Review(db.Model):
    __tablename__ = 'Reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)
    rating = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('Users.id')), nullable=False)
    tasker_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('Users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User',  foreign_keys='Review.user_id', back_populates='reviews')
    tasker = db.relationship('User', foreign_keys='Review.tasker_id', back_populates='received_reviews')


class TaskType(db.Model):
    __tablename__ = 'TaskType'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Text)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow)

    tasks = db.relationship('Task', back_populates='taskType')
    taskerTaskTypes = db.relationship('TaskerTaskType', back_populates='taskType')
