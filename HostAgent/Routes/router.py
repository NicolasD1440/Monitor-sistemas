from flask import Blueprint, jsonify

from Services.agent import check_updates, update_system
from Services.system import reboot_server
from Services.docker import (
    get_containers,
    restart_all_containers,
    restart_container
)

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


# Docker

@router.route("/containers", methods=["GET"])
def containers():
    return jsonify(get_containers())


@router.route("/containers/restart", methods=["POST"])
def restart_all():
    return jsonify(restart_all_containers())


@router.route("/containers/<container_name>/restart", methods=["POST"])
def restart_one(container_name):
    return jsonify(restart_container(container_name))