from flask import Flask, request, render_template, json
import random

app = Flask(__name__)
app.config["DEBUG"] = True

# compute as fast as possible using dynamic memory
primes = [2]
def isPrime(n):
  if n <= 1:
    return False
  if n in primes:
    return True
  for i in range(primes[-1], n):
    isPrime(i)
  for p in primes:
    if n % p == 0:
      return False
  primes.append(n)
  return True

# generate a pair of rsa keys
def genRSAkeys():
  # for now, just use statically determined keys
  # p = 977
  # q = 991
  # pq = 968207
  # totient = 966240
  # e = 599
  # e * d mod totient = 1
  # d = 182279
  # swap e and d
  return { "private": 599, "public": 182279 }

# decrypt an RSA x with a key and N
def decrypt(x):
  # for now, just use statically determined keys
  private_key = 599
  N = 968207
  return (x ** private_key) % N

# tries to do a passkey comparison to find out if passkey is correct
def isValid(passkey):
  # for now, decrypt a static passkey
  return passkey == "General23"

@app.route("/")
@app.route("/login")
def login():
  login_page = render_template("manual.html")
  template_page = render_template("template.html")
  login_page = template_page.replace("[[content]]", login_page)
  return login_page

@app.route("/reply", methods = ["POST"])
def reply():
  passkey = request.form["key"]
  if isValid(passkey):
    return "Authentication successful"
  else:
    return "Authentication failed"

@app.route("/interface", methods = ["GET"])
def interface():
  # for now return the manual page
  manual_page = render_template("manual.html")
  return manual_page

@app.route("/manual", methods = ["POST"])
def manual():
  # accept incoming POST request joins
  controls = request.form["controls"]
  return "bitfield received"

@app.errorhandler(404)
def page_not_found(e):
  return "Sorry, no page found.", 404
