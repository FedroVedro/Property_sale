from flask import Blueprint, request
import json

blueprint = Blueprint('registration', __name__, url_prefix="/registration")

@blueprint.route('/', methods=['POST'])
def registration():
    if request.method == "POST":
        new_user = json.loads(request.data.decode('utf-8'))
        # db.session.add(User(new_user))
        return "userrr"