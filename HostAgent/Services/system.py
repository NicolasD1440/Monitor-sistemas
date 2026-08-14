import subprocess


def reboot_server():

    resultado = subprocess.run(
        ["sudo", "-n", "/sbin/reboot"],
        capture_output=True,
        text=True
    )

    if resultado.returncode != 0:
        return {
            "success": False,
            "message": "No se pudo reiniciar el servidor.",
            "error": resultado.stderr.strip()
        }

    return {
        "success": True,
        "message": "El servidor se esta reiniciando."
    }