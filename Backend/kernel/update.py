import subprocess


def check_updates():

    resultado = subprocess.run(
        ["dnf", "check-update"],
        capture_output=True,
        text=True
    )

    # 0 = no hay actualizaciones
    if resultado.returncode == 0:
        return {
            "success": True,
            "updates_available": False,
            "message": "El sistema está actualizado.",
            "updates": []
        }

    # 100 = hay actualizaciones
    if resultado.returncode == 100:

        return {
            "success": True,
            "updates_available": True,
            "message": "Hay actualizaciones disponibles.",
            "updates": resultado.stdout
        }

    # Otro código = ocurrió un error
    return {
        "success": False,
        "updates_available": False,
        "message": "No se pudo comprobar las actualizaciones.",
        "error": resultado.stderr
    }


def update_system():

    resultado = subprocess.run(
        ["dnf", "upgrade", "-y"],
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