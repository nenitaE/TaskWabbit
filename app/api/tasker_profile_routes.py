from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.forms.taskertasktype_form import CreateTaskerTaskTypeForm
from app.models import db, User, TaskerTaskType, Task, TaskType
from .auth_routes import validation_errors_to_error_messages

tasker_profile_routes = Blueprint('taskerTaskTypes', __name__)



@tasker_profile_routes.route('/<int:taskertasktypeId>', methods=['PUT'])
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


@tasker_profile_routes.route('/<int:taskertasktypeId>', methods=['DELETE'])
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
    return {'TaskerProfile': [taskType.to_dict() for taskType in taskersTaskTypes]}

@tasker_profile_routes.route('/current', methods=['GET'])
@login_required
def get_curr_tasktypes():
    """
    Query for all tasktypes for the current tasker and returns
    them in a list of taskertasktype dictionaries
    """
    current_user_id = current_user.get_id()
    user = User.query.get(current_user_id)

    #check if current_user is a tasker
    curr_user_is_tasker = User.query.filter(
        and_(
            User.id == current_user_id
        )
    ).filter(User.isTasker.is_(True))

    # print(curr_user_is_tasker, "********CURRUSERISTASKER**********")

    #if current_user is not a tasker, return error msg
    if curr_user_is_tasker is None:
        return jsonify({'message': 'Must be registered as a tasker.'}), 404
    else:
        #query TaskerTaskTypes table for all data of curr user/tasker
        tasker_taskType_data = User.query.join(TaskerTaskType).join(TaskType).filter(User.id == current_user_id).all()
        # print(tasker_taskType_data, '************TASKER TASK TYPE DATA **********')
        return jsonify({'TaskerTaskTypes':[tasker_taskType.to_dict_full() for tasker_taskType in tasker_taskType_data]})

@tasker_profile_routes.route('', methods=['POST'])
@login_required
def add_tasktypes():
    """
    Creates a new tasktype in current tasker's taskertasktypes table
    """
    form = CreateTaskerTaskTypeForm()
    # print(form.data, "**********FORM*************")
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        tasker_id = data['tasker_id']
        # print(tasker_id, "**********TASKER_ID**************")
        taskerTaskTypes = TaskerTaskType.query.filter(
            and_(
                TaskerTaskType.tasker_id == tasker_id
            )
        ).all()

        # print(taskerTaskTypes, "**********TASKERTASKTYPES**************")

        #check if form taskType_id already exists
        if data["taskType_id"] in taskerTaskTypes:
            return {'errors': 'Tasker is already assigned this tasktype'}, 400
        # if taskerTaskTypes is None:
        #     return jsonify({'message': 'Task not found'}), 404

        #Create new tasktype
        new_taskertasktype = TaskerTaskType(hourlyRate=data["hourlyRate"],
                                            tasker_id=data["tasker_id"],
                                            taskType_id=data["taskType_id"])
        # print(new_taskertasktype, "*******NEWTASKETASKTYPE******")
        db.session.add(new_taskertasktype)
        db.session.commit()
        return new_taskertasktype.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
