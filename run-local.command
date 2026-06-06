#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
START_PORT="${PORT:-0}"
OPEN_BROWSER="${OPEN_BROWSER:-1}"
cd "$SCRIPT_DIR"
python3 - "$SCRIPT_DIR" "$START_PORT" "$OPEN_BROWSER" <<'PY'
import functools
import http.server
import pathlib
import socketserver
import sys
import webbrowser

directory = pathlib.Path(sys.argv[1])
start_port = int(sys.argv[2])
open_browser = sys.argv[3] != "0"

handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(directory))

with socketserver.TCPServer(("127.0.0.1", start_port), handler) as httpd:
    port = httpd.server_address[1]
    url = f"http://127.0.0.1:{port}/"
    print(f"Serving {directory} at {url}")
    print("Press Ctrl+C to stop the server.")
    if open_browser:
        webbrowser.open(url)
    httpd.serve_forever()
PY
