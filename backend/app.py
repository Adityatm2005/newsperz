from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS so your React frontend can talk to this backend safely
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({
        "message": "Hello from Python Backend!",
        "database_connected": True,
        "project_type": "MCA Mini Project"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)

