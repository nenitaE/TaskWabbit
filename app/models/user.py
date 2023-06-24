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

    tasks = db.relationship('Task', foreign_keys='Task.user_id', back_populates='user', cascade='all, delete-orphan')
    tasked_tasks = db.relationship('Task', foreign_keys='Task.tasker_id', back_populates='tasker')
    taskerTaskTypes = db.relationship('TaskerTaskType', back_populates='tasker')
    reviews = db.relationship('Review', foreign_keys='Review.user_id', back_populates='user', cascade="all, delete-orphan")
    payments = db.relationship('Payment', back_populates='user',  cascade="all, delete-orphan")
    received_reviews = db.relationship('Review', foreign_keys='Review.tasker_id', back_populates='tasker', cascade="all, delete-orphan")

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
