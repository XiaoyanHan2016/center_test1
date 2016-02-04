from marshmallow import  fields, Schema

#class UserSerializer(Serializer):
    #class Meta:
    #    fields = ("uid","username", "mobile", "email", "password")
class UserSchema(Schema):
    uid = fields.Int()
    username = fields.Str()
    mobile = fields.Str()
    email = fields.Str()

class UsernameSchema(Schema):
    uid = fields.Int()
    username = fields.Str()
       

class LoginSchema(Schema):
    email = fields.Str()
    password = fields.Str()
     

class StoreSchema(Schema):
    sid = fields.Int()
    storename = fields.Str()

class HeadSchema(Schema):
    id = fields.Int()
    year = fields.Int()
    month = fields.Int()
    data = fields.Str()

class BranchSchema(Schema):
    id = fields.Int()
    storename = fields.Str()
    year = fields.Int()
    month = fields.Int()
    data = fields.Str()
    sid = fields.Int()
    locked = fields.Int()
class BranchYearSchema(Schema):
    month = fields.Int()
    data = fields.Str()    
class HeadYearSchema(Schema):
    month = fields.Int()
    data = fields.Str()
      
class UserLockedSchema(Schema):
   # id = fields.Int()
   # year = fields.Int()
    month = fields.Int()
   # uid = fields.Int()
    data = fields.Str()
