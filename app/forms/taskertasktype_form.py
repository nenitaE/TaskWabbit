from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import TaskerTaskType

# def tasktype_exists(form, field):
#     # Checking if tasktype exists
#     tasktype = field.data
#     taskertasktype = TaskerTaskType.query.filter(TaskerTaskType.taskType_id == tasktype).first()
#     if taskertasktype:
#         raise ValidationError('You are already signed up for this task type.')

class CreateTaskerTaskTypeForm(FlaskForm):
    hourlyRate = IntegerField('hourlyRate', validators=[DataRequired()])
    tasker_id = IntegerField('tasker_id', validators=[DataRequired()])
    taskType_id = IntegerField('taskType_id', validators=[DataRequired()])
