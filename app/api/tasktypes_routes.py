from flask import Blueprint, redirect, url_for, jsonify, request
from app.models import TaskType

tasktype_routes = Blueprint("tasktype", __name__)

@tasktype_routes.route("/")
def taskType():
    """
    Query for all taskTypes and return them in a list of taskTypes
    """
    taskTypes = TaskType.query.all()


    print(taskTypes, '------------------taksTypes----------------------')
    return jsonify({'TaskTypes': [taskType.to_dict_full() for taskType in taskTypes]})
