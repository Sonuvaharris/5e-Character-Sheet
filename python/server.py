import os
from os import listdir
from os.path import isfile, join
from http.server import BaseHTTPRequestHandler, HTTPServer
import webbrowser
import shutil

# Define socket host and port
SERVER_HOST = "localhost"
SERVER_PORT = 8000


def getSettings():
    settings_file = open("python/settings.txt", "w+")
    sheets = settings_file.read().split(",")
    all_sheets = [f for f in listdir("sheets") if isfile(join("sheets", f))]
    # if file is empty (brand new)
    if settings_file.read() == "":
        sheets = all_sheets
        if len(all_sheets) == 0:
            shutil.copy("www/js/defaultSheet.json", "sheets/New-Character.json")

        settings_file.write("".join(all_sheets))
    elif len(sheets) != len(all_sheets):
        new_sheets = list(str)
        for sheet in all_sheets:
            if sheet not in sheets:
                new_sheets.append(sheet)
        sheets.extend(new_sheets)
        settings_file.write("".join(sheets))
    settings_file.close()
    return sheets


def saveSettings(settings):
    settings_file = open("python/settings.txt", "w+")
    settings_file.write("".join(settings))
    settings_file.close()


# Create server
class Server(BaseHTTPRequestHandler):
    def do_GET(self):
        print("path: " + self.path)
        # print("Headers: " + "".join(self.headers))

        # TEXT/PLAIN HANDLER
        if self.headers.get("Content-Type") == "text/plain":
            if self.path == "/all_sheets":
                self.send_response(200)
                self.end_headers()
                self.wfile.write(bytes("".join(getSettings()), encoding='utf8'))
            else:
                self.send_error(400)
                self.end_headers()

        # JSON HANDLER
        elif self.headers.get("Content-Type") == "application/json":
            print("json request")
            filename = self.path
            try:
                file = open("sheets" + filename, "rb")
                self.send_response(200)
                self.end_headers()
                self.wfile.write(file.read())
                file.close()
            except (FileNotFoundError, PermissionError):
                self.send_error(404)
                self.end_headers()
                self.wfile.write(bytes("File not found: " + filename + ".", encoding="utf8"))

        # HTML HANDLER
        else:
            filename = self.path
            if filename == "/":
                filename = "/index.html"
            try:
                file = open("www" + filename, "rb")
                self.send_response(200)
                self.end_headers()
                self.wfile.write(file.read())
                file.close()
            except (FileNotFoundError, PermissionError):
                self.send_error(404)
                self.end_headers()
                self.wfile.write(bytes("File not found: " + filename + ".", encoding="utf8"))

    def do_POST(self):
        content_len = int(self.headers.get("Content-Length"))
        post_body = self.rfile.read(content_len)

        # TEXT/PLAIN HANDLER
        if self.headers.get("Content-Type") == "text/plain":
            if self.path == "saveSettings":
                saveSettings(post_body.decode())
                self.send_response(200)
            else:
                self.send_error(400)
                self.end_headers()

        # JSON HANDLER
        elif self.headers.get("Content-Type") == "application/json":
            try:
                sheet_name = self.headers.get("sheet_name")
                with open("/sheets/" + sheet_name + ".json", "w+") as f:
                    f.write(post_body.decode())
                if self.headers.get("replace-file") != "":
                    os.remove("sheet/")
                self.send_response(200)
                self.end_headers()
            except FileNotFoundError as e:
                self.send_error(500)
                self.end_headers()
                self.wfile.write(bytes("Error: " + str(e)))


webServer = HTTPServer((SERVER_HOST, SERVER_PORT), Server)
print("Server started http://%s:%s" % (SERVER_HOST, SERVER_PORT))
webbrowser.open("http://localhost:%s" % SERVER_PORT, 2, autoraise=True)

try:
    webServer.serve_forever()
except KeyboardInterrupt:
    pass

webServer.server_close()
print("Server stopped.")


"""open sheet
if sheet is empty, create basic version
check 
"""