import os
import time


def get_old_temp_files():
    temp_path = "/tmp"
    max_age = 30 * 24 * 60 * 60
    current_time = time.time()

    files = []

    for filename in os.listdir(temp_path):

        path = os.path.join(temp_path, filename)

        if os.path.isfile(path):

            try:
                modification_time = os.path.getmtime(path)
                age = current_time - modification_time

                if age > max_age:
                    files.append({
                        "name": filename,
                        "age_days": round(
                            age / (24 * 60 * 60),
                            1
                        ),
                        "size": os.path.getsize(path)
                    })

            except Exception:
                pass

    return files


def clean_temp_files():
    files = get_old_temp_files()

    deleted = []
    errors = []

    for file in files:

        path = os.path.join("/tmp", file["name"])

        try:
            os.remove(path)
            deleted.append(file)

        except Exception as error:
            errors.append({
                "file": file["name"],
                "error": str(error)
            })

    return {
        "success": True,
        "deleted": deleted,
        "errors": errors
    }