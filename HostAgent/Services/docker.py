import docker
from docker.errors import NotFound, DockerException

client = docker.from_env()


def get_containers():
    try:
        containers = client.containers.list()

        return [
            {
                "id": container.short_id,
                "name": container.name,
                "image": container.image.tags[0]
                if container.image.tags
                else "N/A",
                "status": container.status
            }
            for container in containers
        ]

    except DockerException as e:
        return {
            "success": False,
            "message": f"No se pudo conectar con Docker: {str(e)}"
        }


def restart_all_containers():
    try:
        containers = client.containers.list()

        restarted = []

        for container in containers:
            container.restart()
            restarted.append(container.name)

        return {
            "success": True,
            "message": "Todos los contenedores fueron reiniciados",
            "containers": restarted
        }

    except DockerException as e:
        return {
            "success": False,
            "message": f"No se pudieron reiniciar los contenedores: {str(e)}"
        }


def restart_container(container_name):
    try:
        container = client.containers.get(container_name)

        container.restart()

        return {
            "success": True,
            "message": f"Contenedor {container_name} reiniciado"
        }

    except NotFound:
        return {
            "success": False,
            "message": f"El contenedor '{container_name}' no existe"
        }

    except DockerException as e:
        return {
            "success": False,
            "message": f"No se pudo reiniciar el contenedor: {str(e)}"
        }