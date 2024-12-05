from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from blueprints.registration import blueprint as registration_blueprint
import os

app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "secret key"
app.config["UPLOAD_FOLDER"] = os.path.join(app.root_path, 'storage')

db = SQLAlchemy(app)

app.register_blueprint(registration_blueprint)

@app.route('/')
def hello_world():
  return 'Hello, World!'

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5001)