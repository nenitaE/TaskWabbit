from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class CreateTaskerTaskTypeForm(FlaskForm):
    hourlyRate = IntegerField('hourlyRate', validators=[DataRequired()])
    tasker_id = IntegerField('tasker_id', validators=[DataRequired()])
    taskType_id = IntegerField('user_id', validators=[DataRequired()])
    