from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hei maailma! Flask toimii!"

if __name__ == "__main__":
    app.run(debug=True)