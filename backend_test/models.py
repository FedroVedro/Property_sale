from app import db

class User(db.Model):
  __tablename__ = 'user'
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  email = db.Column(db.String(120), unique=True, nullable=False)
  password = db.Column(db.String(120), nullable=False)

class Seller(db.Model):
  __tablename__ = 'seller'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  rating = db.Column(db.Float, nullable=False)
  
class Buyer(db.Model):
  __tablename__ = 'buyer'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  credit_score = db.Column(db.Float, nullable=False)
  
class Property(db.Model):
  __tablename__ = 'property'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(120), nullable=False)
  price = db.Column(db.Integer, nullable=False)
  location = db.Column(db.String(120), nullable=False)
  seller_id = db.Column(db.Integer, db.ForeignKey('seller.id'), nullable=False)
  description = db.Column(db.String(120), nullable=False)
  image_url = db.Column(db.String)
  
class Bank(db.Model):
  __tablename__ = 'bank'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(120), nullable=False)
  
class Request(db.Model):
  __tablename__ = 'request'
  id = db.Column(db.Integer, primary_key=True)
  buyer_id = db.Column(db.Integer, db.ForeignKey('buyer.id'), nullable=False)
  seller_id = db.Column(db.Integer, db.ForeignKey('seller.id'), nullable=False)
  property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)
  bank_id = db.Column(db.Integer, db.ForeignKey('bank.id'), nullable=False)
  status = db.Column(db.String(120), nullable=False)
  date_submitted = db.Column(db.DateTime, nullable=False)