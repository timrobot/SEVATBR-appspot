from flask import Flask

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route("/")
def main_page():
  return "hello me!"

@app.errorhandler(404)
def page_not_found(e):
  return "Sorry, no page found.", 404
