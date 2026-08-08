import psutil

def get_ram_usage ():
    ram = psutil.virtual_memory()
    total_gb = ram.total / (1024 ** 3)
    usado_gb = ram.used / (1024 ** 3)
    libre_gb = ram.available / (1024 ** 3)
    return{
    'ram': ram.percent
    }
