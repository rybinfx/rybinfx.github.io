import time
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import os

# List of files to watch
FILES_TO_WATCH = [
    "generate.py",
    "subfolder/other_script.py",  # Add more files here
    "another_subfolder/script.py"
]

class ChangeHandler(FileSystemEventHandler):
    def on_modified(self, event):
        # Check if the modified file is in the list of files to watch
        for file_to_watch in FILES_TO_WATCH:
            # Use full path comparison to match the event's src_path with the watched files
            if event.src_path.endswith(file_to_watch):
                print(f"{event.src_path} has been modified. Running '{file_to_watch}'")
                subprocess.run(["python", file_to_watch])

if __name__ == "__main__":
    path = "."  # Root directory to watch for changes
    event_handler = ChangeHandler()
    observer = Observer()

    # Schedule the observer to watch the root directory recursively
    observer.schedule(event_handler, path, recursive=True)
    observer.start()
    print("Watching for changes in the selected files...")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()