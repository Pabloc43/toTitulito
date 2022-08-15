from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

from bson import ObjectId

# Instantiation
app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/toTitulito'
mongo = PyMongo(app)

# Settings
CORS(app)

# Database
db = mongo.db.users

# Routes
# Create user
@app.route('/users', methods=['POST'])
def createUser():
  print(request.json)
  id = db.insert_one({
    'name': request.json['name'],
    'lastName': request.json['lastName'],
    'email': request.json['email'],
    'password': request.json['password']
  })
  print(id.inserted_id)
  return jsonify(str(id.inserted_id))

# Read users
@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password']
        })
    return jsonify(users)

# Read user for id
@app.route('/users/<id>', methods=['GET'])
def getUser(id):
  user = db.find_one({'_id': ObjectId(id)})
  print(user)
  return jsonify({
      '_id': str(ObjectId(user['_id'])),
      'name': user['name'],
      'email': user['email'],
      'password': user['password']
  })

# Read user for email
@app.route('/user/<email>', methods=['GET'])
def getUserEmail(email):
  user = db.find_one({'email': email})
  print(user)
  if user != None:
      return jsonify(True)
  else:
      return jsonify(False)



# Update user
@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
  print(request.json)
  db.update_one({'_id': ObjectId(id)}, {"$set": {
    'name': request.json['name'],
    'email': request.json['email'],
    'password': request.json['password']
  }})
  return jsonify({'message': 'User Updated'})

# Delete user
@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
  db.delete_one({'_id': ObjectId(id)})
  return jsonify({'message': 'User Deleted'})


# Login
@app.route('/login', methods=['POST'])
def getLogin():
  user = db.find_one({'email': request.json['email'],
                      'password': request.json['password']})
  return jsonify(str(ObjectId(user['_id'])))


if __name__ == "__main__":
    app.run(debug=True)
