from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.forms.taskertasktype_form import CreateTaskerTaskTypeForm
from app.models import db, User, TaskerTaskType, Task, TaskType
from .auth_routes import validation_errors_to_error_messages

tasker_profile_routes = Blueprint('taskerTaskTypes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@tasker_profile_routes.route('/<int:taskerTaskTypeId>', methods=['PUT'])
@login_required
def edit_curr_tasktype(taskerTaskTypeId):
    form = CreateTaskerTaskTypeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #query the single taskerTaskType to edit
    taskerTaskType = TaskerTaskType.query.get(taskerTaskTypeId)
    # print ('_____taskersTaskTypes______', vars(taskerTaskType))

    # verify that taskerTaskType exists for this user
    if taskerTaskType is None:
        return jsonify({'message': 'TaskType not found'}), 404

    #check to make sure the user is authorized to change this taskerTaskType
    if (taskerTaskType.tasker_id) != int(session['_user_id']):
        return {'Error': 'User is not authorized'}

    if form.validate_on_submit():
        data = form.data
        print(data)
        tasker_id = data['tasker_id']
        # print(tasker_id, "**********TASKER_ID**************")
        taskerTaskTypes = TaskerTaskType.query.filter(
            and_(
                TaskerTaskType.tasker_id == tasker_id
            )
        ).all()
        
        # validate new hourlyRate
        if data["hourlyRate"] <= 0:
            return {'errors': 'hourlyRate must be greater than 0.'}, 400


        if 'taskType_id' in data:
            taskerTaskType.taskType_id = data["taskType_id"]
        if 'tasker_id' in data:
            taskerTaskType.tasker_id = data["tasker_id"]
        if 'hourlyRate' in data:
            taskerTaskType.hourlyRate = data["hourlyRate"]

    
        db.session.commit()

        return taskerTaskType.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@tasker_profile_routes.route('/<int:taskerTaskTypeId>', methods=['DELETE'])
@login_required
def delete_curr_tasktype(taskerTaskTypeId):
    taskerTaskType = TaskerTaskType.query.get(taskerTaskTypeId)
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

    #check if user is logged in
    if user is None:
        return jsonify({'error': 'User not found'}), 404

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
        taskersTaskTypes = TaskerTaskType.query.filter(TaskerTaskType.tasker_id == current_user_id)
        return {'TaskerTaskTypes': [taskerTaskType.to_dict() for taskerTaskType in taskersTaskTypes]}


@tasker_profile_routes.route('/<int:taskerTaskTypeId>', methods=['GET'])
@login_required
def get_taskerTaskType(taskerTaskTypeId):
    '''
    Query for a specific taskerTaskType and return is as a dictionary
    '''

    taskerTaskType = TaskerTaskType.query.get(taskerTaskTypeId)
    if taskerTaskType is None:
        return jsonify({'error: TaskerTaskType not found'}), 404
    else:
        return jsonify(taskerTaskType.to_dict())

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
        print(data["taskType_id"], "********data[taskType_id]*****")

        for taskerTaskType in taskerTaskTypes:
            if data["taskType_id"] == taskerTaskType.taskType_id:
                return {'errors': 'Tasker is already assigned this tasktype'}, 400
            if data["hourlyRate"] <= 0:
                return {'errors': 'hourlyRate must be greater than 0.'}, 400


        #Create new tasktype
        new_taskertasktype = TaskerTaskType(hourlyRate=data["hourlyRate"],
                                            tasker_id=data["tasker_id"],
                                            taskType_id=data["taskType_id"])
        # print(new_taskertasktype, "*******NEWTASKETASKTYPE******")
        db.session.add(new_taskertasktype)
        db.session.commit()
        return new_taskertasktype.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
