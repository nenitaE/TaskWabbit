from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Review(db.Model, UserMixin):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)
    rating = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    tasker_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User',  foreign_keys='Review.user_id', back_populates='reviews')
    tasker = db.relationship('User', foreign_keys='Review.tasker_id', back_populates='received_reviews')

    def to_dict(self):
        return {
            'description': self.description,
            'rating': self.rating,
            'user_id': self.user_id,
            'tasker_id': self.tasker_id
        }
