from flask_wtf import FlaskForm
from wtforms import IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import TaskType

taskTypes = [(1, "General Mounting"),(2, "Minor Home Repairs"),(3, 'Cleaning'),(4, "Yard Work"),(5, "Plumbing Help"),(6, "Indoor Painting"),(7, "Heavy Lifting and Loading"),(8, "Waiting in Line"),(9, "Pet Sitting"),(10, "Cooking/Baking")]

class CreateTaskTypeForm(FlaskForm):
    hourlyRate = IntegerField('hourlyRate', validators=[DataRequired()])
    taskType = SelectField('Type', choices=taskTypes)
