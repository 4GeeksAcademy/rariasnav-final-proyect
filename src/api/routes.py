"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Country, PersonalDocument
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['GET'])
def get_all_users():
    all_users = User.query.all()
    result = list(map(lambda user: user.serialize(), all_users))

    return jsonify(result), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    user = User.query.filter_by(id=user_id).first()

    return jsonify(user.serialize()), 200

@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_one_user(user_id):
    user = User.query.filter_by(id=user_id).first()

    db.session.delete(user)
    db.session.commit()

    response_body = {
        "msg" : "User deleted"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():
    body = request.get_json()
    user = User.query.filter_by(email=body['email']).first()

    if user != None:
        return jsonify({ "msg": "Email already in use" })

    if user == None:
        password_hash = current_app.bcrypt.generate_password_hash(body['password']).decode('utf-8')
        new_user = User(
            email = body['email'],
            password = password_hash,
            is_active = True,
            role = 'client'
        )
        db.session.add(new_user)
        db.session.commit()
        

        return jsonify({ 'msg': 'User created' }), 200
    
@api.route('/user_update/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    body = request.get_json()
    password_hash = current_app.bcrypt.generate_password_hash(body['password']).decode('utf-8')
    updating_user = User.query.filter_by(id=user_id).first()
    updating_email = User.query.filter_by(email=body['email']).first()

    if updating_email != None:
        return jsonify({ 'msg': 'Email already in use' })
    
    if updating_email == None:
        updating_user.email = body['email']
        updating_user.password = password_hash

        db.session.commit()

        return jsonify({ 'msg': 'User updated' }), 200
    
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({ 'msg': 'Email not in system' }), 401
    
    decrypted_password = current_app.bcrypt.check_password_hash(user.password, password)

    if email != user.email or decrypted_password is False:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(user=user.serialize(), access_token=access_token)

@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    response_body = {
        "msg": "User found",
        "User": user.serialize()
    }
    return jsonify(response_body), 200
