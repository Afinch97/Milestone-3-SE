from flask import (
    Flask,
    Blueprint,
    render_template,
    redirect,
    url_for,
    request,
    flash,
    jsonify,
)
from flask_login import (
    UserMixin,
    LoginManager,
    login_user,
    login_required,
    current_user,
    logout_user,
)
from sqlalchemy import over, table, select
from tmdb import get_trending, get_genres, movie_search, movie_info, get_favorites
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import over, table, select, update
from dotenv import find_dotenv, load_dotenv
from flask_sqlalchemy import SQLAlchemy
from multiprocessing import synchronize
import requests
import MediaWiki
import sqlalchemy
import os
import re

load_dotenv(find_dotenv())

app = Flask(__name__)
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0
app.config["SECRET_KEY"] = "secret-key-goes-here"
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
if app.config["SQLALCHEMY_DATABASE_URI"].startswith("postgres://"):
    app.config["SQLALCHEMY_DATABASE_URI"] = app.config[
        "SQLALCHEMY_DATABASE_URI"
    ].replace("postgres://", "postgresql://")
db = SQLAlchemy(app, session_options={"autocommit": True})
db.init_app(app)

login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)


class User(UserMixin, db.Model):
    id = db.Column(
        db.Integer, primary_key=True
    )  # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))


class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    user = db.Column(db.String(1000))
    text = db.Column(db.String(1000))


class Favorites(db.Model):
    __tablename__ = "Favorites"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100))
    movie = db.Column(db.Integer)

    def __repr__(self):
        return repr(self.movie)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# set up a separate route to serve the index.html file generated
# by create-react-app/npm run build.
# By doing this, we make it so you can paste in all your old app routes
# from Milestone 2 without interfering with the functionality here.
bp = Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)

# route for serving React page
@bp.route("/")
def index():
    # NB: DO NOT add an "index.html" file in your normal templates folder
    # Flask will stop serving this React page correctly
    return render_template("index.html")


@bp.route("/funfact")
def funfact():
    facts = [
        "Three presidents, all Founding Fathers—John Adams, Thomas Jefferson, and James Monroe—died on July 4. Presidents Adams and Jefferson also died the same year, 1826; President Monroe died in 1831.",
        "The heart of the blue whale, the largest animal on earth, is five feet long and weighs 400 pounds.",
        "The word “strengths” is the longest word in the English language with only one vowel.",
    ]
    return jsonify(facts)


@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    print(data)
    print(data["username"])
    email = data["username"]
    name = data["username"]
    password = data["password"]
    remember = data["remember"]
    
    user = User.query.filter_by(name=name).first()
    if not user:
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error":"User does not exist, please create new account."})
    if not user or not check_password_hash(user.password, password):
        flash("Username or Password Incorrect")
        return jsonify({"error":"Password is incorrect"})
    login_user(user, remember=remember)
    return jsonify({"success":"Successfully logged in"})


app.register_blueprint(bp)

app.run()
