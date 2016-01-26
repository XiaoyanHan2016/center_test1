#coding:utf-8
from flask import g,jsonify,request,Response
from flask.ext import restful
from server import api, db, flask_bcrypt, auth
from models import User, Store, HeadAccount, BranchAccount
from forms import UserCreateForm, SessionCreateForm, StoreCreateForm, HeadCreateForm, BranchCreateForm
from serializers import UserSchema, LoginSchema, StoreSchema, UsernameSchema, HeadSchema, BranchSchema, BranchYearSchema
from sqlalchemy import desc

import string
import random
import json
import re


#D[str1[:1] + str(0) + str(i)] = float('{:.2f}'.format(random.randint(1,100)))
#D[str1[:1] + str(i)] = float('{:.2f}'.format(random.randint(1,100)))
def gen_test(str1,str2):
    D = dict()
    a = int(str1[1:])
    b = int(str2[1:]) + 1
    for i in range(a,b):
        if i < 10:
            D[str1[:1] + str(0) + str(i)] = str(1.00)
        else:
            D[str1[:1] + str(i)] = str(1.00)
    return D
    
def dic_sum(str1,str2,d):
    sum = 0
    a = int(str1[1:])
    b = int(str2[1:]) + 1
    for i in range(a,b):
        if i < 10:
            sum += eval(d[str1[:1] + str(0) + str(i)])
        else:
            sum += eval(d[str1[:1] + str(i)])
    return round(sum,2)

def func1(a,b):
    return round(float(a) / b,2)

def branch_update(year,month):
    branch = BranchAccount.query.filter_by(year=year).filter_by(month=month)
    if branch is None:
        return jsonify({'Post':'Error'})
    l1 = list(branch)
    count = len(l1)
    head = HeadAccount.query.filter_by(year=year).filter_by(month=month).first()
    if head is not None:
        head_data = eval(head.data)
        for obj in l1:
            b = eval(obj.data)
            b['A09'],b['A10'],b['A11'] = str(func1(eval(b['A09']),count)),str(func1(eval(b['A10']),count)),str(func1(eval(b['A11']),count))
            for i in range(31,51):
                b['A' + str(i)] = str(func1(eval(b['A' + str(i)]),count))
            b['A54'],b['A56'],b['A57'] = str(func1(eval(b['A54']),count)),str(func1(eval(b['A56']),count)),str(func1(eval(b['A57']),count))
            #branch_data['A09'] = round(float(head_data['A09']) / count,2)
            data_str = data_cal(str(branch_data))
            db.session.add(obj)
            db.session.commit()
    return count
        

def data_cal(data):
    d1 = eval(data)
    d1['A04'] = str(round((eval(d1['A05']) + eval(d1['A06'])),2))
    d1['A08'] = str(round((eval(d1['A04']) + eval(d1['A07'])),2))
    d1['A30'] = str(dic_sum('A16','A29',d1))
    d1['A52'] = str(dic_sum('A31','A51',d1))
    d1['A53'] = str(round((eval(d1['A14']) - eval(d1['A30']) - eval(d1['A52'])),2))
    d1['A55'] = str(round((eval(d1['A53']) - eval(d1['A54'])),2))
    d1['A58'] = str(round((eval(d1['A55']) - eval(d1['A56']) - eval(d1['A57']) + eval(d1['A44'])),2))

#sort        
    str1 = sort_dic_str(d1)
    return str1
    
#sum for a dic list
def year_sum(list):
    _total = {}
    for obj in list:  
        _keys = set(sum([obj.keys() for obj in list],[]))  
      
        for _key in _keys:  
            _total[_key] = round(sum([eval(obj.get(_key,0)) for obj in list]),2)
#sort
    str1 = sort_dic_str(_total)
    return str1  



#sort for a dict
def sort_dic_str(dic):
    keys = dic.keys()
    keys.sort()
    str1 = "{"
    for key in keys:
        str1 += "'"
        str1 += key
        str1 += "'"
        str1 += ":"
        str1 += "'"
        str1 += str(dic[key])
        str1 += "'"
        if keys.index(key) + 1 < len(keys):
            str1 += ","
    str1 += "}"
    return str1

#check input float data

def check_data(data_str):
    dic = eval(data_str)
    
    for s1 in dic.values():
        if s1.replace(".", "", 1).isdigit() == False:
            return False
    return True

@auth.verify_password
def verify_password(email, password):
    user = User.query.filter_by(email=email).first()
    if not user:
        return False
    g.user = user
    return flask_bcrypt.check_password_hash(user.password, password)

class UserView(restful.Resource):
    def get(self,uid):

        user = User.query.filter_by(uid=uid).first()
        schema = UserSchema()
        if user is not None:
            return Response(schema.dumps(user,indent=1).data,mimetype='application/json'),201
        return jsonify({"get":"fail"})

    def put(self,uid):
        user = User.query.filter_by(uid=uid).first()
        

        if user is not None:
            user.name = request.form['username']
            user.mobile = request.form['mobile']
            user.email = request.form['email']
            db.session.add(user)
            db.session.commit()
            db.session.close()
            
            return jsonify({"put":"success"})
        else:
            return jsonify({"put":"fail"})
    def delete(self,uid):
        user = User.query.filter_by(uid=uid).first()
        if user is None:
            return jsonify({'delete':'fail'})
        db.session.delete(user)
        db.session.commit()
        return jsonify({'delete':'success'})

class UserListView(restful.Resource):
    def get(self):
        users = User.query.filter(User.admin == 1).all()
        schema = UserSchema(many = True)
        return Response(schema.dumps(users,indent=1).data,mimetype='application/json')
 #   @auth.login_required
    def post(self):
        form = UserCreateForm()
        print '########################'
        print 'data------------>',request.json,'---->',request.form
        print request.form['username']
        print request.form['mobile']
        print request.form['email']
        if request.form['username'] is None or request.form['mobile'] is None or request.form['email'] is None:
            return jsonify({"post":"fail"})
        if User.query.filter_by(username=request.form['username']).filter_by(mobile=request.form['mobile']).filter_by(email=request.form['email']).first() is not None:
            return jsonify({"post":"fail"})
        #if not form.validate_on_submit():
        #    return form.errors, 422

        id = User.query.order_by(desc(User.uid)).first().uid + 1
        user = User(uid=id,username=request.form['username'], mobile=request.form['mobile'], email=request.form['email'])
        schema = UserSchema()
        db.session.add(user)
        db.session.commit()
        return jsonify({"post":"success"})

class UserNameView(restful.Resource):
    def get(self):
        usernames = User.query.filter(User.admin == 1).all()
        schema = UsernameSchema(many = True)
        return Response(schema.dumps(usernames,indent=1).data,mimetype='application/json') 

class LoginView(restful.Resource):
    def post(self):
        #if not form.validate_on_submit():
        #    return form.errors, 422

        #print request.form['username']
        user = User.query.filter(User.admin == 2).filter_by(username=request.form['username']).first()
        if user is None:
            return jsonify({'login':'fail'})
        schema = LoginSchema()
        #if user and flask_bcrypt.check_password_hash(user.password, form.password.data):
        if user.password != request.form['password']:
            return jsonify({'login':'fail'})
        return jsonify({'login':'success'})
class RegView(restful.Resource):
    def post(self):
        user = User.query.filter_by(username=request.form['username']).first()
        if user is None:
            return jsonify({'post':'fail'})
        user.password = request.form['password']
        user.admin = 2
        db.session.add(user)
        db.session.commit()
        db.session.close()
        return jsonify({'post':'success'})

class StoreView(restful.Resource):
    def get(self,sid):
        #if not form.validate_on_submit():
        #    return form.errors, 422
        store = Store.query.filter_by(sid=sid).first_or_404()
        schema = StoreSchema()
        if store is not None:
            return Response(schema.dumps(store,indent=1).data,mimetype='application/json')
        return jsonify({"get":"fail"})

    def put(self,sid):
        store = Store.query.filter_by(sid=sid).first()
        if store is None:
            return jsonify({'put':'fail'})
        store.storename = request.form['storename']
        store.users = []
        db.session.add(store)
        db.session.commit()
        
        if request.form['holder'] is None:
            return jsonify({'put':'fail'})
        user_list = request.form['holder'].split(',')
        
        for i in userstore_list:
            store.users.append(User.query.filter_by(username=i).first())
            db.session.add(store)
            db.session.commit()
        return jsonify({'put':'success'})
        
    def delete(self,sid):
        store = Store.query.filter_by(sid=sid).first()
        if store is None:
            return jsonify({'put':'fail'})
        db.session.add(store)
        db.session.commit()
        return jsonify({'delete':'success'})

class StoreListView(restful.Resource):
    def get(self):
        stores = Store.query.all()
        schema = StoreSchema(many = True)
        store_list = schema.dump(stores).data
        
        for dic in store_list:
            st = Store.query.filter_by(storename=dic['storename']).first_or_404()
            if st.users.count() > 1:
                dic['holder'] = map(lambda x:x.username,list(st.users))
            else:
                if list(st.users) != []:
                    dic['holder'] = st.users[0].username
                else:
                    continue
        
        return Response(json.dumps(store_list,indent=1),mimetype='application/json')
        
#    @auth.login_required
    def post(self):
        
        form = StoreCreateForm()
        print '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
        print request.form['holder']
        print request.form['storename']
        if Store.query.filter_by(storename=request.form['storename']).first() is not None:
            return jsonify({"post":"fail"})
        userstore_list = request.form['holder'].split(',')
        id = Store.query.order_by(desc(Store.sid)).first().sid + 1
        if request.form['storename'] is None or request.form['holder'] is None:
            return jsonify({"post":"fail"})
        store = Store(sid=id,storename=request.form['storename'])
        if store is None:
            return jsonify({"post":"fail"})
        db.session.add(store)
        db.session.commit()
        

#update user_store table
        
        for i in userstore_list:
            store.users.append(User.query.filter_by(username=i).first())

            db.session.add(store)
            db.session.commit()
        db.session.close()

        return jsonify({"post":"success"})


class BranchAccountView(restful.Resource):
    def get(self,sid,year,month):
        branch = BranchAccount.query.filter_by(year=year).filter_by(month=month).filter_by(sid=sid).first_or_404()
        schema = BranchSchema()

        if branch is not None:
            return Response(schema.dumps(branch,sort_keys=True,indent=1).data,mimetype='application/json')

    
    def post(self,sid,year,month):
        #print 'data------------>',request.json,'---->',request.form
        form = BranchCreateForm()
        print request.form['data']
        if check_data(request.form['data']) == False:
            return jsonify({'post':'fail'})
        id = BranchAccount.query.order_by(desc(BranchAccount.id)).first().id + 1

        if BranchAccount.query.filter_by(year=year).filter_by(month=month).filter_by(sid=sid).first() is not None:
            return jsonify({'post':'fail'})
        data_after = data_cal(request.form['data'])
        storename = Store.query.filter_by(sid=sid).first_or_404().storename
        branch = BranchAccount(id=id,year=year,month=month,data=data_after,storename=storename,sid=sid)
        db.session.add(branch)
        db.session.commit()
        db.session.close()
        
        len = branch_update(year,month)
        return jsonify({"post":"success"})

    def put(self,sid,year,month):
        print request.form['data']
        branch = BranchAccount.query.filter_by(year=year).filter_by(month=month).filter_by(sid=sid).first()
        if branch is None:
            return jsonify({'put':'fail'})
        branch.data = request.form['data']
        db.session.add(branch)
        db.session.commit()
        db.session.close()

class BranchYearView(restful.Resource):
    def get(self,sid,year):
        storename = Store.query.filter_by(sid=sid).first_or_404().storename
        branch = BranchAccount.query.filter_by(year=year).filter_by(storename=storename)
        schema = BranchYearSchema(many=True)
        branch_list = json.loads(schema.dumps(branch).data)
        data_list = []
        num = len(branch_list)
        for i in range(0,num):
            data_list.append(eval(branch_list[i]['data']))
        
        data = year_sum(data_list)        
        dic = {'month':13,'data':str(data)}
        
        branch_list = map(lambda x:{'month':x['month'],'data':sort_dic_str(eval(x['data']))},branch_list)
        branch_list.append(dic)
        if branch is not None:
            return Response(schema.dumps(branch_list,sort_keys=True,indent=1).data,mimetype='application/json')
        else:
            return jsonify({'get':'fail'})


class HeadAccountView(restful.Resource):
    def get(self,year,month):
        head = HeadAccount.query.filter_by(year=year).filter_by(month=month).first_or_404()
        schema = HeadSchema()
         
        if head is not None:
            #head.data = eval(head.data)
            return Response(schema.dumps(head,sort_keys=True,indent=1).data,mimetype='application/json')
            #return Response(schema.dumps(head,indent=1).data,mimetype='application/json')
        else:
            return jsonify({'get':'fail'})
 
        
    def post(self,year,month):
        form = HeadCreateForm()
        print request.form['data']
        if check_data(request.form['data']) == False:
            return jsonify({'post':'fail'})
        id = HeadAccount.query.order_by(desc(HeadAccount.id)).first().id + 1
        if HeadAccount.query.filter_by(year=year).filter_by(month=month).first() is not None:
            return jsonify({'post':'fail'})
        data_after = data_cal(request.form['data']) 
        head = HeadAccount(id=id,year=year,month=month,data=data_after)
        db.session.add(head)
        db.session.commit()
        
        len = branch_update(year,month)
        return json.dumps('{"post":"success"}')

    def put(self,year,month):
        print request.form['data']
        head = HeadAccount.query.filter_by(year=year).filter_by(month=month).first()
        if head is None:
            return jsonify({'put':'fail'})
        head.data = request.form['data']
        db.session.add(head)
        db.session.commit()
        return jsonify({'put':'success'})

class AccountListView(restful.Resource):
    def get(self):
        branch = BranchAccount.query.all()
        schema1 = BranchSchema(many=True)
        #branch_list = eval(schema1.dumps(branch).data)
        branch_list = json.loads(schema1.dumps(branch).data)

        for dic in branch_list:
            dic_data = eval(dic['data'])
            dic['income'] = dic_data['A14']
            dic['outcome'] = str(eval(dic_data['A30']) + eval(dic_data['A52']) + eval(dic_data['A54']) + eval(dic_data['A56']) + eval(dic_data['A57']))
            st = Store.query.filter_by(sid=dic['sid']).first()
            if st.users.count() > 1:
                dic['shareholder'] = map(lambda x:x.username,list(st.users))
            else:
                if list(st.users) != []:
                    dic['shareholder'] = st.users[0].username
                else:
                    continue

            del dic['data']
             
        
        return Response(json.dumps(branch_list,indent=1),mimetype='application/json')

class AccountAllView(restful.Resource):
    def get(self,year):
        list1 = []
        data_list = []
        data_list2 = []
        schema1 = BranchSchema(many=True)
        schema2 = HeadSchema()
        for i in range(0,12):
            month = i + 1
            branch = BranchAccount.query.filter_by(year=year).filter_by(month=month)
            head = HeadAccount.query.filter_by(year=year).filter_by(month=month).first()
            if head is not None:
                branch_list = json.loads(schema1.dumps(branch,sort_keys=True).data)
                head_list = json.loads(schema2.dumps(head,sort_keys=True).data)
                num = len(branch_list)
                for i in range(0,num):
                    data_list.append(eval(branch_list[i]['data']))
                data_list.append(eval(head_list['data']))
                data = year_sum(data_list)
                data_sum = {'month':month,'data':data}                
                list1.append(data_sum)
            else:
                continue
        list1 = map(lambda x:{'month':x['month'],'data':sort_dic_str(eval(x['data']))},list1)
        num = len(list1)
        for j in range(0,num):
            data_list2.append(eval(list1[j]['data']))
        
        data2 = year_sum(data_list2)
        dic = {'month':13,'data':data2}
        list1.append(dic)
        return Response(json.dumps(list1,indent=1,sort_keys=True),mimetype='application/json')
        #return Response(schema.dumps(list1,sort_keys=True,indent=1).data,mimetype='application/json')

class AccountHolderView(restful.Resource):
    def get(self,uid,year):
        user = User.query.filter_by(uid=uid).first()
        
        list1 = []
        list2 = []
        if user is None:
            return jsonify({'get':'fail'})
        store = list(user.stores)

        for i in range(0,12):
            month = i + 1
            branch = BranchAccount.query.filter_by(year=year).filter_by(month=month).filter_by(sid=store[0].sid).first()
            if branch is not None:
                j = 0
                data1 = []
                while(j < len(store)):
                    br = BranchAccount.query.filter_by(year=year).filter_by(month=month).filter_by(sid=store[j].sid).first()
                    if br is None:
                        j += 1
                        continue
                    data1.append(eval(br.data))
                    j += 1
                data1_sum = {'month':month,'data':str(year_sum(data1))}    
            else:
                continue
            list1.append(data1_sum)
        
        print list1
        num = len(list1)
        for j in range(0,num):
            list2.append(eval(list1[j]['data']))
        dic = {'month':13,'data':str(year_sum(list2))}
        print dic
        list1.append(dic)
        return Response(json.dumps(list1,indent=1,sort_keys=True),mimetype='application/json')
        



api.add_resource(UserListView, '/api/v1/shareholder')
api.add_resource(UserView,'/api/v1/shareholder/<int:uid>')
api.add_resource(UserNameView, '/api/v1/holdername')
api.add_resource(LoginView, '/api/v1/login')
api.add_resource(RegView,'/api/v1/register')
api.add_resource(StoreListView,'/api/v1/stores')
api.add_resource(StoreView,'/api/v1/stores/<int:sid>')
api.add_resource(AccountListView,'/api/v1/accountbook')
api.add_resource(HeadAccountView,'/api/v1/headaccountbook/<int:year>/<int:month>')
api.add_resource(BranchAccountView,'/api/v1/branchaccountbook/<int:sid>/<int:year>/<int:month>')
api.add_resource(BranchYearView,'/api/v1/branchaccountbook/<int:sid>/<int:year>')
api.add_resource(AccountAllView,'/api/v1/accountall/<int:year>')
api.add_resource(AccountHolderView,'/api/v1/accountbook/<int:uid>/<int:year>')

