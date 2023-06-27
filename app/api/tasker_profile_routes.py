from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, User, TaskerTaskType, TaskType
from app.forms.tasker_form import CreateTaskTypeForm

tasker_profile_routes = Blueprint('taskerTaskTypes', __name__)

def find_user(email):
    return User.query.filter(User.email == email).first()

@tasker_routes.route('/current', methods=['GET'])
@login_required
def get_curr_tasktypes():
    """
    Query for all tasktypes for the current tasker and returns
    them in a list of tasker dictionaries
    """
    pass


@tasker_routes.route('/<int:taskertasktypeId>', methods=['PUT'])
@login_required
def edit_curr_tasktype(taskertasktypeId):

    #query the single taskerTaskType to edit
    taskerTaskType = TaskerTaskType.query.get(taskertasktypeId)
    # print ('_____taskersTaskTypes______', vars(taskerTaskType))

    #check to make sure the user is authorized to change this taskerTaskType
    if (taskerTaskType.tasker_id) != int(session['_user_id']):
        return {'Error': 'User is not authorized'}


    #Change instance variable of the taskerTaskType through a JSON request
    taskerTaskType.hourlyRate = request.json['hourlyRate']
    taskerTaskType.taskType_id = request.json['taskType_id']

    db.session.commit()

    #Filter and return the taskTypes
    taskerTaskTypes = TaskerTaskType.query.filter(TaskerTaskType.id == taskertasktypeId)

    return {'TaskerTaskType': [taskerTaskType.to_dict() for taskerTaskType in taskerTaskTypes]}


@tasker_routes.route('/<int:taskertasktypeId>', methods=['DELETE'])
@login_required
def delete_curr_tasktype(taskertasktypeId):
    taskerTaskType = TaskerTaskType.query.get(taskertasktypeId)
    userId = session['_user_id']
    # print('taskerTaskType', taskerTaskType)

    if not taskerTaskType:
       return {'Error': 'TaskType not found'}

    if int(taskerTaskType.tasker_id) != int(userId):
        return {'Error': 'User is not authorized'}

    # print(session, "________DIR SESSION_______")
    db.session.delete(taskerTaskType)
    db.session.commit()

    taskersTaskTypes = TaskerTaskType.query.filter(TaskerTaskType.tasker_id == userId)
    # print('_____________',userId,'----', taskersTaskTypes, '________________')
    return {'TaskerTaskTypes': [taskType.to_dict() for taskType in taskersTaskTypes]}
