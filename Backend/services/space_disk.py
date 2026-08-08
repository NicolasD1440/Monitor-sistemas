import subprocess

def get_space_disk():
  resultado = subprocess.run(["df", "-h"], capture_output=True, text=True)
  return resultado.stdout