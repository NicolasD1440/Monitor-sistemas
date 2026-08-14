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
            "updates": [],
            "message": "No se pudieron comprobar las actualizaciones.",
            "error": resultado.stderr.strip()
        }

    updates = []

    for line in resultado.stdout.splitlines():

        if line.startswith("Listing..."):
            continue

        if line.strip():
            updates.append(line.strip())

    return {
        "success": True,
        "updates_available": len(updates) > 0,
        "updates": updates,
        "message": (
            "Hay actualizaciones disponibles."
            if updates
            else "El sistema está actualizado."
        )
    }


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
        return {
            "success": False,
            "message": "Error al aplicar las actualizaciones.",
            "error": resultado.stderr.strip(),
            "output": resultado.stdout.strip()
        }

    return {
        "success": True,
        "message": "Actualizaciones aplicadas correctamente.",
        "output": resultado.stdout.strip()
    }