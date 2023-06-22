from flask import Blueprint, redirect, url_for, jsonify, request
from ..models.user import (db, TaskType)

bp = Blueprint("taskType", __name__, url_prefix="")

@bp.route("/", methods = ["GET"])
def taskType():
    if(request.method == "GET"):
        data = TaskType.query.all()
    return jsonify(data)
