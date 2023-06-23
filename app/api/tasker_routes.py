from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User, TaskerTaskType

tasker_routes = Blueprint('taskers', __name__)

def find_user(email):
    return User.query.filter(User.email == email).first()

@tasker_routes.route('/taskerTaskTypes/current', methods=['GET'])
@login_required
def get_curr_tasktypes():
    """
    Query for all tasktypes for the current tasker and returns 
    them in a list of user dictionaries 
    """
    tasker_id = current_user.id
    tasktypes = TaskerTaskType.query.join(User).filter(User.tasker)
    return {'users': [user.to_dict() for user in users]}