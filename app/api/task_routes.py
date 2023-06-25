from flask import Blueprint, jsonify, session, request
from app.models import Task, User
from app.models import User, db
from app.forms import CreateTaskForm
from datetime import datetime
from sqlalchemy import and_
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/', methods=['POST'])
@login_required                       #for testing purposes
def create_task():
    form = CreateTaskForm()
    # print('DATA', form.data)
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        task_date = form.data['task_date']

        tasker_id = form.data['tasker_id']
        # count tasks assigned to a specific tasker on a specific date
        tasks = Task.query.filter(
            and_(
                Task.tasker_id == tasker_id
            )
        ).count()
        print('TASKS', tasks)

        #check validations
        if tasks >= 8:
            return {'errors': 'Tasker has reached maximum limit of tasks for the day'}, 400
        if task_date < datetime.now().date():
            return {'errors': ['Cannot schedule task in the past']}, 400

        # Create the task
        task = Task(
            taskTypeId=form.data['taskTypeId'],
            title=form.data['title'],
            description=form.data['description'],
            totalPrice=form.data['totalPrice'],
            location=form.data['location'],
            task_date=task_date,
            user_id=form.data['user_id'],
            tasker_id=tasker_id,
        )
        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@task_routes.route('/<int:taskId>', methods=['PUT'])
@login_required
def update_task(taskId):
    form = CreateTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    task = Task.query.get(taskId)
    # print('HEY TASK', vars(task))

    if task is None:
        return jsonify({'message': 'Task not found'}), 404

    if form.validate_on_submit():
        task_date = form.data['task_date']
        tasker_id = form.data['tasker_id']

        # count tasks assigned to a specific tasker on a specific date
        tasks = Task.query.filter(
            and_(
                Task.tasker_id == tasker_id,
                # Task.task_date == task_date.date()
            )
        ).count()

        # check validations
        if tasks >= 8:
            return {'errors': 'Tasker has reached maximum limit of tasks for the day'}, 400
        if task_date < datetime.now().date():
            return {'errors': ['Cannot schedule task in the past']}, 400

        # Update the task
        task.taskTypeId = form.data['taskTypeId']
        task.title = form.data['title']
        task.description = form.data['description']
        task.totalPrice = form.data['totalPrice']
        task.location = form.data['location']
        task.task_date = task_date
        task.tasker_id = tasker_id

        db.session.commit()

        return task.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
