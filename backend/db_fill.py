import json
from app import db, app
from models import User, Property, Seller, Buyer, Bank, Request
from werkzeug.security import generate_password_hash, check_password_hash

with open('data.json', "r") as f:
    data = json.load(f)

# print (data)

with app.app_context():
    db.drop_all()
    db.create_all()

    for user in data["users"]:
        hash_pass = generate_password_hash(user["password"])
        del user['password']
        new_user = User(**user, password=hash_pass)
        db.session.add(new_user)
    db.session.commit()

    for seller in data["sellers"]:
        new_seller = Seller(**seller)
        db.session.add(new_seller)
    db.session.commit()
    
    for buyer in data["buyers"]:
        new_buyer = Buyer(**buyer)
        db.session.add(instance=new_buyer)
    db.session.commit()
    
    for property in data["propertyes"]:
        new_property = Property(**property)
        db.session.add(new_property)
    db.session.commit()
    

