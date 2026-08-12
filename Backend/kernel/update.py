import subprocess


def check_updates():

    resultado = subprocess.run(
        ["apt", "list", "--upgradable"],
        capture_output=True,
        text=True
    )

    if resultado.returncode != 0:
        return {
            "success": False,
            "updates_available": False,
            "message": "No se pudieron comprobar las actualizaciones.",
            "error": resultado.stderr
        }

    # Quitamos la primera línea: "Listing..."
    updates = [
        linea
        for linea in resultado.stdout.splitlines()
        if linea and not linea.startswith("Listing")
    ]

    if updates:
        return {
            "success": True,
            "updates_available": True,
            "message": "Hay actualizaciones disponibles.",
            "updates": updates
        }

    return {
        "success": True,
        "updates_available": False,
        "message": "El sistema está actualizado.",
        "updates": []
    }

def update_system():

    resultado = subprocess.run(
        ["apt", "upgrade", "-y"],
        capture_output=True,
        text=True
    )

    if resultado.returncode != 0:
        return {
            "success": False,
            "message": "Error al actualizar el sistema.",
            "error": resultado.stderr
        }

    return {
        "success": True,
        "message": "Sistema actualizado correctamente.",
        "output": resultado.stdout
    }