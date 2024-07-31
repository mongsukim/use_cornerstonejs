import os
import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/dicom-files')
def get_dicom_files():
    dicom_folder = 'D:\\works\\연습\\3MIN DELAY FBP'
    dicom_files = [f for f in os.listdir(dicom_folder) if f.endswith('.dcm')]
    dicom_urls = [f'wadouri:http://localhost:8000/3MIN%20DELAY%20FBP/{file}' for file in dicom_files]
    return jsonify(dicom_urls)

if __name__ == '__main__':
    app.run(port=8001)