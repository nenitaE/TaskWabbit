from flask import Flask, Blueprint, jsonify, session
from flask_migrate import Migrate
from flask_login import login_required
from app.models.review import Review, db

review_routes = Blueprint('review', __name__)

# get all reviews of the current user, Require Auth: true
@review_routes.route('/current')
@login_required
def reviewData():
    """
    Query for all reviews by the current user and returns them in a list of Review dictionaries
    ordered by updated_at
    """
    reviews = Review.query.filter(Review.user_id == session['_user_id']).order_by(Review.updated_at)
    print(type(int(session['_user_id'])), 'TEST')
    return {'Reviews': [review.to_dict() for review in reviews]}

