from flask import Blueprint, jsonify, session
from flask_login import login_required, current_user
from app.models import db, User, TaskerTaskType, TaskType

tasker_routes = Blueprint('taskers', __name__)

def find_user(email):
    return User.query.filter(User.email == email).first()

# @tasker_routes.route('/taskerTaskTypes/current', methods=['GET'])
# @login_required
# def get_curr_tasktypes():
#     """
#     Query for all tasktypes for the current tasker and returns
#     them in a list of tasker dictionaries
#     """
#     pass


@tasker_routes.route('/taskerTaskTypes/<int:taskerId>', methods=['PUT'])
@login_required
def edit_curr_tasktypes(taskerId):
    taskersTaskTypes = TaskerTaskType.query.get(taskerId)
    print ('_____taskersTaskTypes______', vars(taskersTaskTypes))
    return "do I work?"


@tasker_routes.route('/taskerTaskTypes/<int:tasktypeId>', methods=['DELETE'])
@login_required
def delete_curr_tasktype(tasktypeId):
    taskersTaskType = TaskerTaskType.query.get(tasktypeId)
    #print('taskerTaskType', vars(taskersTaskType))

    if not taskersTaskType or int(taskersTaskType.tasker_id) != int(session['_user_id']):
        return {'Error': 'TaskType not found or user not authorized'}

    db.session.delete(taskersTaskType)
    db.session.commit()

    #print ('taskerTaskType__DELETE___', vars(taskerTaskType))
    userId = session.get('user_id')
    taskersTaskTypes = TaskerTaskType.query.filter(TaskerTaskType.tasker_id == userId)

    return {'TaskersTaskTypes': [taskType.to_dict() for taskType in taskersTaskTypes]}
