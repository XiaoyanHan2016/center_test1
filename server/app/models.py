from flask import g
from wtforms.validators import Email
from server import db, flask_bcrypt
from sqlalchemy import Table
from sqlalchemy.orm import backref


user_stores = Table('user_stores',db.Model.metadata,
    
    db.Column('user_id',db.Integer,db.ForeignKey('users.uid')),
    db.Column('store_id',db.Integer,db.ForeignKey('stores.sid'))
)
    

#class User_Store(db.Model):
#    __tablename__ = 'user_stores'
#    id = db.Column(db.Integer, primary_key=True)
#    user_id = db.Column(db.Integer,db.ForeignKey('users.uid'))
#    store_id = db.Column(db.Integer,db.ForeignKey('stores.sid'))
#    start = db.Column(db.DateTime)
#    end = db.Column(db.DateTime)


class User(db.Model):
    __tablename__ = 'users'

    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120),unique=True,nullable=False)
    mobile = db.Column(db.String(32),unique=True,nullable=False)
    #email = db.Column(db.String(120), unique=True, nullable=False, info={'validators': Email()})
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80))    
    admin = db.Column(db.Integer,default=1)
    stores = db.relationship('Store',secondary=user_stores,backref=db.backref('users',lazy='dynamic'),lazy='dynamic')
    
    

#    def __init__(self, uid, username, mobile, email, password):
#        self.uid = uid
#        self.username = username
#        self.mobile = mobile
#        self.email = email
#        self.password = password

    def __repr__(self):
        return '<User %r>' % self.username

class Store(db.Model):
    __tablename__ = 'stores'
    sid = db.Column(db.Integer, primary_key=True)
    storename = db.Column(db.String(120), nullable=False)
    #opentime = db.Column(db.Date, nullable=False)
    #state = db.Column(db.String(20),nullable=False)

    

#    def __init__(self, sid, storename):
#        self.sid = sid
#        self.storename = storename
        
        

    def __repr__(self):
        return '<Store %r>' % self.storename

class HeadAccount(db.Model):
    __tablename__ = 'headaccount'
    id = db.Column(db.Integer,primary_key=True)
    year = db.Column(db.Integer,nullable=False)
    month = db.Column(db.Integer,nullable=False)
    data = db.Column(db.String(2096))

    def __repr__(self):
        return '<Head %d %d>' % (self.year,self.month)


class BranchAccount(db.Model):
    __tablename__ = 'branchaccount'
    id = db.Column(db.Integer,primary_key=True)
    year = db.Column(db.Integer,nullable=False)
    month = db.Column(db.Integer,nullable=False)
    data = db.Column(db.String(2096))
    storename = db.Column(db.String(256),nullable=False)
    sid = db.Column(db.Integer)

    def __repr__(self):
        return '<Branch %r %d %d>' % (self.storename,self.year,self.month)
