from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Task

class CreateTaskForm(FlaskForm):
    taskTypeId = IntegerField('taskTypeId', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    totalPrice = FloatField('totalPrice', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    task_date = DateField('task_date', validators=[DataRequired()])
    tasker_id = IntegerField('tasker_id', validators=[DataRequired()])
