from flask import Flask
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/animals')
def animals():
    animals = [
        dict(name="dog", animal_class="mammal"),
        dict(name="fish", animal_class="fish"),
        dict(name="snake", animal_class="reptile"),
        dict(name="eagle", animal_class="bird"),
        dict(name="frog", animal_class="amphibian")
        ]
        

    return jsonify(animals)