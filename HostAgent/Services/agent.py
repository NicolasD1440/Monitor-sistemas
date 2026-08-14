from flask import Flask, jsonify
import subprocess

app = Flask(__name__)


@app.route("/updates", methods=["GET"])
def check_updates():

    resultado = subprocess.run(
        ["apt", "list", "--upgradable"],
        capture_output=True,
        text=True
    )

    if resultado.returncode != 0:
        return jsonify({
            "success": False,
            "updates_available": False,
            "updates": [],
            "message": "No se pudieron comprobar las actualizaciones.",
            "error": resultado.stderr.strip()
        }), 500

    lines = resultado.stdout.strip().splitlines()

    updates = []

    for line in lines:
        if line.startswith("Listing..."):
            continue

        if line.strip():
            updates.append(line.strip())

    return jsonify({
        "success": True,
        "updates_available": len(updates) > 0,
        "updates": updates,
        "message": (
            "Hay actualizaciones disponibles."
            if updates
            else "El sistema está actualizado."
        )
    })


@app.route("/update", methods=["POST"])
def update_system():

    resultado = subprocess.run(
        [
            "sudo",
            "-n",
            "/usr/bin/apt",
            "upgrade",
            "-y"
        ],
        capture_output=True,
        text=True
    )

    if resultado.returncode != 0:
        return jsonify({
            "success": False,
            "message": "Error al aplicar las actualizaciones.",
            "error": resultado.stderr.strip(),
            "output": resultado.stdout.strip()
        }), 500

    return jsonify({
        "success": True,
        "message": "Actualizaciones aplicadas correctamente.",
        "output": resultado.stdout.strip()
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=6000
    )