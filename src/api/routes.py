"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, PersonalDocument, ServiceCategory, ServiceSubCategory, ServiceCategorySubCategory, ServiceRequest, ServiceRequestOffer
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
            nationality = body['nationality'],
            gender = body['gender'],
            phone_number = body['phone_number'],
            is_active = True,
            role = body['role']
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
        "user": user.serialize()
    }
    return jsonify(response_body), 200

@api.route('/user_information', methods=['PUT'])
@jwt_required()
def fill_user_information():
    email = get_jwt_identity()
    body = request.get_json()  
    user = User.query.filter_by(email=email).first()
    
    for key in body:
        for col in user.serialize():
            if key == col and key != "id":
                setattr(user, col, body[key])

    db.session.commit()
    
    response_body = {
        "msg": "succesfully updated"
    }
    return jsonify(response_body), 200

@api.route('/services_category', methods=['GET'])
def get_all_services_category():
    all_categories = ServiceCategory.query.filter_by(is_active=True).all()
    result = list(map(lambda category: category.serialize(), all_categories))

    return jsonify(result), 200

@api.route('/services_subcategory', methods=['GET'])
def get_all_services_subcategory():
    all_subcategories = ServiceSubCategory.query.filter_by(is_active=True).all()
    result = list(map(lambda subcategory: subcategory.serialize(), all_subcategories))

    return jsonify(result), 200

@api.route('/services_category_subcategory', methods=['GET'])
def get_all_services_category_subcategory():
    all_category_subcategory = ServiceCategorySubCategory.query.all()
    result = list(map(lambda category_subcategory : category_subcategory.serialize(), all_category_subcategory))

    return jsonify(result), 200

@api.route('/services_category/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = ServiceCategory.query.filter_by(id=category_id).first()

    return jsonify(category.serialize()), 200

@api.route('/services_subcategory/<int:subcategory_id>', methods=['GET'])
@jwt_required()
def get_subcategory(subcategory_id):
    subcategory = ServiceSubCategory.query.filter_by(id=subcategory_id).first()

    return jsonify(subcategory.serialize()), 200

@api.route('/services_category_subcategory/<int:category_subcategory_id>', methods=['GET'])
@jwt_required()
def get_category_subcategory_id(category_subcategory_id):
    category_subcategory = ServiceCategorySubCategory.query.filter_by(id=category_subcategory_id).first()

    return jsonify(category_subcategory.serialize()), 200

@api.route('/services_category/<int:category_id>', methods=['DELETE'])
@jwt_required()
def delete_category(category_id):
    category = ServiceCategory.query.filter_by(id=category_id).first()
    
    setattr(category, 'is_active', False)
    db.session.commit()

    return jsonify({"msg": "Category deleted"}), 200

@api.route('/services_subcategory/<int:subcategory_id>', methods=['DELETE'])
@jwt_required()
def delete_subcategory(subcategory_id):
    subcategory = ServiceSubCategory.query.filter_by(id=subcategory_id).first()

    setattr(subcategory, 'is_active', False)
    db.session.commit()

    return jsonify({"msg": "Subcategory deleted"}), 200

@api.route('/services_category_subcategory/<int:category_subcategory_id>', methods=['DELETE'])
@jwt_required()
def delete_category_subcategory(category_subcategory_id):
    category_subcategory = ServiceCategorySubCategory.query.filter_by(id=category_subcategory_id).first()

    db.session.delete(category_subcategory)
    db.session.commit()

    return jsonify({"msg": "CategorySubcategory deleted"}), 200

@api.route('/services_category', methods=['POST'])
@jwt_required()
def add_category():
    body = request.get_json()
    new_category = ServiceCategory(
        name = body['name'],
        icon = body['icon'],
        image = body['image'],
        description = body['description'],
        is_active = True
    )
    db.session.add(new_category)
    db.session.commit()

    return jsonify({"msg": "Category created"}), 200

@api.route('/services_subcategory', methods=['POST'])
@jwt_required()
def add_subcategory():
    body = request.get_json()
    new_subcategory = ServiceSubCategory(
        name = body['name'],
        description = body['description'],
        is_active = True
    )
    db.session.add(new_subcategory)
    db.session.commit()

    return jsonify({"msg": "Subcategory created"}), 200

@api.route('/services_category_subcategory', methods=['POST'])
@jwt_required()
def add_category_subcategory():
    body= request.get_json()
    service_category = ServiceCategory.query.filter_by(id=body['service_category_id']).first()
    service_subcategory = ServiceSubCategory.query.filter_by(id=body['service_subcategory_id']).first()
    new_category_subcategory = ServiceCategorySubCategory(
        service_category_id = service_category.id,
        service_subcategory_id = service_subcategory.id
    )

    db.session.add(new_category_subcategory)
    db.session.commit()

    return jsonify({"msg": "CategorySubcategory created"}), 200

@api.route('/services_category/<int:category_id>', methods=['PUT'])
@jwt_required()
def update_category(category_id):
    body = request.get_json()
    category = ServiceCategory.query.filter_by(id=category_id).first()

    category.name = body['name']
    category.icon = body['icon']
    category.image = body['image']
    category.desciption = body['description']

    db.session.commit()

    return jsonify({"msg": "Category updated"}), 200

@api.route('/services_subcategory/<int:subcategory_id>', methods=['PUT'])
@jwt_required()
def update_subcategory(subcategory_id):
    body = request.get_json()
    subcategory = ServiceSubCategory.query.filter_by(id=subcategory_id).first()

    subcategory.name = body['name']
    subcategory.desciption = body['description']

    db.session.commit()

    return jsonify({"msg": "Subcategory updated"}), 200

@api.route('/service_request', methods=['GET'])
@jwt_required()
def get_all_services_requests():
    services_requests = ServiceRequest.query.all()
    result = list(map(lambda service_request: service_request.serialize(), services_requests))

    return jsonify(result), 200

@api.route('/service_request/<int:service_request_id>', methods=['GET'])
@jwt_required()
def get_service_request(service_request_id):
    service_request = ServiceRequest.query.filter_by(id=service_request_id).first()
    if service_request is None:
        return jsonify({"msg": "Service request not found"})

    return jsonify(service_request.serialize()), 200

@api.route('/user_service_request', methods=['GET'])
@jwt_required()
def get_user_service_request():
    service_request = 0
    if service_request is None:
        return jsonify({"msg": "Service request not found"})

    return jsonify(service_request.serialize()), 200

@api.route('/service_request', methods=['POST'])
@jwt_required()
def add_service_request():
    body = request.get_json()
    email = body['email']
    print('this email', email)    
    service_subcategory_id = ServiceSubCategory.query.get(body['service_subcategory_id'])
    if not service_subcategory_id:
        return jsonify({"msg": "Service id not valid"}), 400 
    user = User.query.filter_by(email=body['email']).first()    
    
    if user:
        service_request = ServiceRequest(
            description = body['description'],
            address = body['address'],
            tools = body['tools'],
            moving = body['moving'],
            service_subcategory_id = body['service_subcategory_id'],
            user_id = user.id,
            is_active = True,
            status = 'active'
        )

        db.session.add(service_request)
        db.session.commit()
        return jsonify({"msg": "Service request added"}), 200
    else:
        return jsonify({"msg": "Email not valid"}), 400

@api.route('/service_request/<int:service_request_id>', methods=['DELETE'])
def delete_service_request(service_request_id):
    service_request = ServiceRequest.query.filter_by(id=service_request_id).first()
    setattr(service_request, 'is_active', False)

    db.session.commit()

    return jsonify({"msg": "Service request deleted"}), 200
