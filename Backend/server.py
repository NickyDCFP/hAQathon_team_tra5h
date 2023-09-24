from flask import Flask
import datetime

 
app = Flask(__name__)

@app.route("/testapi")
def testapi():
    return {
        'Name':"steven",
        "Age":"20",
        "test":"yay!"
        }
     



if __name__ == '__main__':
    app.run(debug=True)