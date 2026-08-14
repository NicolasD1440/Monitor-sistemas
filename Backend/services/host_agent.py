import requests

HOST_AGENT_URL = "http://host.docker.internal:6000"


def reboot_server():
    response = requests.post(f"{HOST_AGENT_URL}/reboot")

    return response.json(), response.status_code