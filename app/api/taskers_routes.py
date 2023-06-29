from flask import Blueprint, jsonify
from app.models import Task
from app.models import User

taskers_routes = Blueprint('taskers', __name__)

@taskers_routes.route('')
def taskers():
    """
    Query for all taskers and return them in a list of tasker dictionaries
    """
    taskers = User.query.filter(User.isTasker.is_(True)).all()
    return jsonify({'Taskers': [tasker.to_dict_full() for tasker in taskers]})
