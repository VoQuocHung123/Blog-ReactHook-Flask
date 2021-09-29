from sqlite3.dbapi2 import connect
from flask_cors import CORS
from flask import Flask
from flask import jsonify #chuyen 1 dictionary ve json
from flask import request
from flask.helpers import send_file
from time import time
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager



from flask.helpers import make_response

from .actions.post_action import PostAction
from .models.post_model import Post
from .actions.user_action import UserAction
from .models.user_model import User

#from backend.models import post_model
#from backend.models import user_model

import json


app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
CORS(app)
connection_data = './db.sqlite3'
app.config['JWT_SECRET_KEY'] = 'zxljvo9w48llsdjhfs'
jwt = JWTManager(app)



@app.route('/',methods=['GET','POST'])
def home():
   return 'hello wworld'
    
@app.route('/index',methods=['POST'])
def index():
    return 'Index page '
# get all post
@app.route('/api/post',methods=['GET'])
def get_post():
    post_action = PostAction(connection_data)
    result = post_action.get_all()
    return jsonify(result)


@app.route('/api/anhthe/<int:id>')
def AnhSV(id):
    post_action = PostAction(connection_data)
    return send_file(f'uploads\{post_action.LayAnh(id)}',mimetype='image/jpeg')





#---------- update get id------------------------------------
@app.route('/api/postbai/<int:id>', methods=['GET','PUT','DELETE'])
def get_or_modify_post(id):
        if request.method == 'GET':
            #get post by id
            post_action = PostAction(connection_data)
            ketqua =[]

            result = post_action.get_by_id(id)
            ketqua.append(result.serialize())
            return jsonify(ketqua)
            
        elif request.method == 'PUT':
            #update post by id
            post_action = PostAction(connection_data)
            author_name = request.form['author_name']
            title = request.form['title']
            body = request.form['body']
            hinhanh = request.form['hinhanh']
            """
            file=""
            if not request.files.get('hinhanh', None):  
                file = post_action.LayAnh(id)
            else:
                hinhanh = request.files['hinhanh']
                file = str(int(time()))+'.jpg'
                hinhanh.save(f'uploads/{file}')   
            """ 
            post = Post(author_name=author_name,title=title,body=body,hinhanh=hinhanh) 
            message, status_code = post_action.update(id, post)
            response = make_response(jsonify({"message":"success"}),201)
            response.headers.add("Access-Control-Allow-Origin","*")
            response.content_type="application/json"
            return response
        elif request.method == 'DELETE':
            #delete post by id
            post =  Post(id=id)
            post_action = PostAction(connection_data)
            message, status_code = post_action.delete(post)
            return jsonify({
                'message': message
            }), status_code
        response = make_response(jsonify({"message":"success"}),201)
        response.headers.add("Access-Control-Allow-Origin","*")
        response.content_type="application/json"
        return response


#---------------------------addd------------------------------
@app.route('/api/postbai',methods=['POST'])
def add_post():
    #get data from request body
    
    author_name = request.form['author_name'] 
    title = request.form['title']
    body = request.form['body']
    anh = request.form['hinhanh']
    """
    file=""
    if not request.files.get('hinhanh', None):  
        file = ""
    else:
        hinhanh = request.files['hinhanh']
        file = str(int(time()))+'.jpg'
        hinhanh.save(f'uploads/{file}')
    """  
    post = Post(author_name=author_name,title=title,body=body,hinhanh=anh)
    post_action = PostAction(connection_data)
    result = post_action.add(post)
    response = make_response(jsonify({"message":"success"}),201)
    response.headers.add("Access-Control-Allow-Origin","*")
    response.content_type="application/json"
    return response

@app.route('/api/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    if username == None or password is None:
        return jsonify({
            'message': 'Missing username or password'
        }), 400
    
    user_action = UserAction(connection_data)
    result, status_code = user_action.login(User(username=username, password=password))
    res = {
        "value" : result,
        "status_code" : status_code
    }
    if status_code != 200:
        return json.dumps(res)
    # Luu thong tin user vao token
    access_token = create_access_token(identity=result.serialize())
    res = {
        "value" : "ok",
        "status_code" : 200,
        'token': access_token
    }
    return json.dumps(res)

@app.route('/signup',methods=['POST'])
def signup():
    username = request.form['username']
    password = request.form['password']
    role = request.form['role']
    if username == None or password is None:
        return jsonify({
            'message': 'Missing username or password'
        }), 400
    user_action = UserAction(connection_data)
    result, status_code = user_action.signup(User(username=username, password=password,role=role))
    return jsonify({
        "message":result
    })

