import requests

HOST_AGENT_URL = "http://host.docker.internal:6000"


def reboot_server():
    response = requests.post(
        f"{HOST_AGENT_URL}/reboot"
    )

    return response.json(), response.status_code


def get_containers():
    response = requests.get(
        f"{HOST_AGENT_URL}/containers"
    )

    return response.json(), response.status_code


def restart_all_containers():
    response = requests.post(
        f"{HOST_AGENT_URL}/containers/restart"
    )

    return response.json(), response.status_code


def restart_container(container_name):
    response = requests.post(
        f"{HOST_AGENT_URL}/containers/{container_name}/restart"
    )

    return response.json(), response.status_code