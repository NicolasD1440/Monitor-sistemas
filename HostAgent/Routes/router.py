from flask import Blueprint, jsonify

from Services.Agent import check_updates, update_system
from Services.System import reboot_server


router = Blueprint("router", __name__)


@router.route("/updates", methods=["GET"])
def updates():
    resultado = check_updates()
    return jsonify(resultado)


@router.route("/update", methods=["POST"])
def update():
    resultado = update_system()

    status_code = 200 if resultado["success"] else 500

    return jsonify(resultado), status_code


@router.route("/reboot", methods=["POST"])
def reboot():
    resultado = reboot_server()

    status_code = 200 if resultado["success"] else 500

    return jsonify(resultado), status_code