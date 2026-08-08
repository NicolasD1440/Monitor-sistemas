import psutil
def get_disk_usage():
        disco = psutil.disk_usage("/")
        total_gb = disco.total / (1024 ** 3)
        usado_gb = disco.used / (1024 ** 3)
        libre_gb = disco.free / (1024 ** 3)
        return{
         'disk' : disco.percent
        }
