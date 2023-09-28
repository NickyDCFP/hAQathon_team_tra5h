# from flask import Flask
# import datetime
# import random
 
# app = Flask(__name__)
     
# #TODO
# '''
# Returns a dictionary that has 3 keys: solar, wind, and geothermal. 
# These keys will each have a sorted list from most ideal coordinates to least ideal coordinates.
# '''
# @app.route("/getsortedlists")
# def getSortedLists():
#     solar = getRandomSample()
#     wind = getRandomSample()
#     geothermal = getRandomSample()
#     print("hi")
#     return {
#         "solar": solar,
#         "wind": wind,
#         "geothermal": geothermal
#     }

# def getRandomSample():
#     lst = []
#     for i in range(100):
#         lst.append([random.randrange(0, 200, 1) / 10, random.randrange(0, 200, 1) / 10])
#     return lst

# if __name__ == '__main__':
#     app.run(debug=True)

# Import flask and datetime module for showing date and time
from flask import Flask
import datetime
 
x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)
 
 
# Route for seeing a data
@app.route('/data')
def get_time():
 
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek",
        "Age":"22",
        "Date":x,
        "programming":"python"
        }
 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)