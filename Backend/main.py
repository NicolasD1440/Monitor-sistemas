from flask import Flask
from flask_cors import CORS
from routes.monitor import monitor

app = Flask(__name__)
CORS(app)
app.register_blueprint(
    monitor,
    url_prefix="/monitor"
)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001
    )