import psutil


def get_cpu_usage():
    porcentaje_cpu = psutil.cpu_percent(interval=1)

    return {
        "cpu": porcentaje_cpu
    }