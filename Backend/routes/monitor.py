from flask import Blueprint, jsonify

from services.cpu import get_cpu_usage
from services.ram import get_ram_usage
from services.disk import get_disk_usage
from services.space_disk import get_space_disk
from services.clean_files import get_old_temp_files, clean_temp_files
from services.processes import get_processes
from kernel.update import check_updates, update_system
from services.host_agent import reboot_server
from OCI.oci_backup import create_backup, get_backup, list_backups


monitor = Blueprint("monitor", __name__)

#endpoint get uso de CPU
@monitor.route("/cpu", methods=["GET"])
def cpu():
    return get_cpu_usage()
#endpoint uso de RAM
@monitor.route("/ram", methods=["GET"])
def ram():
    return get_ram_usage()
#endpoint uso de disco
@monitor.route("/disk", methods=["GET"])
def disk():
    return get_disk_usage()
#Endpoint espacio libre
@monitor.route("/space-disk", methods=["GET"])
def space_disk():
    return get_space_disk()
#Endpoint borrar archivos temporales
@monitor.route("/clean-files", methods=["GET"])
def list_clean_files():
    return {
        "files": get_old_temp_files()
    }

@monitor.route("/clean-files", methods=["DELETE"])
def delete_clean_files():
    return clean_temp_files()
#endpoint procesos del servidor
@monitor.route("/processes", methods=["GET"])
def processes():
    return {
        "processes": get_processes()
    }
#endpoint actualizar sistema operativo:
@monitor.route("/updates", methods=["GET"])
def updates():

    return check_updates()
@monitor.route("/updates", methods=["POST"])
def update():

    return update_system()
#endpoint reiniciar sistema operativo:
@monitor.route("/reboot", methods=["POST"])
def reboot():
    return reboot_server()
#endpoint backup
@monitor.route("/backup", methods=["POST"])
def backup():
    try:
        result = create_backup()

        return jsonify({
            "success": True,
            "message": "Backup iniciado correctamente.",
            "backup": result
        }), 202

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@monitor.route("/backup/<backup_id>", methods=["GET"])
def backup_status(backup_id):
    try:
        result = get_backup(backup_id)

        return jsonify({
            "success": True,
            "backup": result
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
        
@monitor.route("/backups", methods=["GET"])
def backups():
    try:
        backups = list_backups()

        return jsonify({
            "success": True,
            "backups": backups
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

