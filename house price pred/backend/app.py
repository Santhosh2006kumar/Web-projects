from flask import Flask,request,jsonify

import numpy as np
import pickle


f=open('model.pkl','rb')
model = pickle.load(f)
app=Flask(__name__)

@app.route('/')
def home():
    return "Flask is running!"
@app.route('/predict',methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Extract values from request
        bedrooms = float(data.get('bedrooms', 0))
        bathrooms = float(data.get('bathrooms', 0))
        area = float(data.get('area', 0))
        floors = float(data.get('floors', 0))
        coth = float(data.get('coth', 0))
        goth = float(data.get('goth', 0))
        ryear = float(data.get('ryear', 0))
        lat = float(data.get('lat', 0))
        aar = float(data.get('aar', 0))

        # Create input array
        features = np.array([[bedrooms, bathrooms, area, floors, coth, goth, ryear, lat, aar]])

        # Make prediction
        prediction = model.predict(features)[0]
        ans=round(np.expm1(prediction),0)
        rounded_lakhs = round(ans / 100000)  
        return jsonify({'prediction': rounded_lakhs })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)