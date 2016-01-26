from flask.ext.wtf import Form

from wtforms_alchemy import model_form_factory
from wtforms import StringField,IntegerField,PasswordField,DateField
from wtforms.validators import DataRequired

from app.server import db
from models import User, Store, HeadAccount, BranchAccount

BaseModelForm = model_form_factory(Form)

class ModelForm(BaseModelForm):
    @classmethod
    def get_session(self):
        return db.session

class UserCreateForm(Form):
    uid = IntegerField('uid')
    username = StringField('username')
    mobile = StringField('mobile')
    email = StringField('email')
    password = StringField('password')
        

class SessionCreateForm(Form):
    email = StringField('name', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])

#class PostCreateForm(ModelForm):
#    class Meta:
#        model = Post

class StoreCreateForm(Form):
    sid = IntegerField('sid')
    storename = StringField('storename')
    shareholder = StringField('shareholder')
  
class HeadCreateForm(Form):
    id = IntegerField('id')
    year = IntegerField('year')
    month = IntegerField('month')
    data = StringField('data')

class BranchCreateForm(Form):
    id = IntegerField('id')
    storename = StringField('storename')
    year = IntegerField('year')
    month = IntegerField('month')
    data = StringField('data')
    
