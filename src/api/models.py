from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class Roles(enum.Enum):
    client = 'client'
    vendor = 'vendor'

class ChooseGender(enum.Enum):
    non_binary = 'non_binary'
    female = 'female'
    male = 'male'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    full_name = db.Column(db.String(250), unique=False, nullable=True)
    date_of_birth = db.Column(db.DateTime, unique=False, nullable=True)       
    phone_number = db.Column(db.Integer, unique=True, nullable=True)
    address = db.Column(db.String(120), unique=False, nullable=True)
    profile_resume = db.Column(db.String(350), unique=False, nullable=True)
    role = db.Column(db.Enum(Roles), unique=False, nullable=False)
    gender = db.Column(db.Enum(ChooseGender), unique=False, nullable=True)
    personal_document = db.relationship('PersonalDocument', backref='user', lazy=True)       
    nationality_id = db.Column(db.Integer, db.ForeignKey('country.id'), nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        personal_documents = PersonalDocument.query.filter_by(user_id=self.id)
        personal_documents = list(map(lambda document: document.serialize(), personal_documents))

        country = Country.query.get(self.nationality_id)

        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "full_name": self.full_name,           
            "date_of_birth": self.date_of_birth,            
            "phone_number": self.phone_number,
            "address": self.address,
            "role": self.role.value,
            "gender": self.gender.value,
            "personal_documents": personal_documents,
            "nationality": country.serialize() 
        }
    
class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    user = db.relationship('User', backref='country', lazy=True)       

    def __repr__(self):
        return f'<Country {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

class TypeOfDocument(enum.Enum):
    national_id = 'national_id'
    passport = 'passport'
    driver_license = 'driver_license'

class PersonalDocument(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum(TypeOfDocument), unique=False, nullable=False)       
    code = db.Column(db.String(120), unique=True, nullable=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    def __repr__(self):
        return f'<PersonalDocument {self.code}>'

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type.value,
            "code": self.code
        }
