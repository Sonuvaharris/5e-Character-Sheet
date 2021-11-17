"""Implements a simple HTTP/1.0 Server Original tutorial:
https://www.codementor.io/@joaojonesventura/building-a-basic-http-server-from-scratch-in-python-1cedkg0842 """

import socket


# Define socket host and port
SERVER_HOST = "0.0.0.0"
SERVER_PORT = 8000

# Create socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind((SERVER_HOST, SERVER_PORT))
server_socket.listen(1)
print("Listening on localhost %s" % SERVER_PORT)


while True:
    # Wait for client connections
    client_connection, client_address = server_socket.accept()

    # Get the client request
    request = client_connection.recv(1024).decode()
    print(request)

    # Parse HTTP headers
    headers = request.split("\n")
    filename = headers[0].split()[1]

    if headers[0].startswith("GET"):
        # Get the content of the file
        if filename == "/":
            filename = "/index.html"

        try:
            fin = open("www" + filename)
            content = fin.read()
            fin.close()
            response = "HTTP/1.0 200 OK\n\n" + content

        except FileNotFoundError:
            response = "HTTP/1.0 404 NOT FOUND\n\nFile Not Found"
    else:
        # turn json into file
        response = "HTTP/1.0 200 OK\n\n"

    # Send HTTP response
    client_connection.sendall(response.encode())
    client_connection.close()

# Close socket
server_socket.close()



"""
# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import pathlib

hostName = "localhost"
serverPort = 8080


class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
       self.end_headers()

       file = open("www/" + BaseHTTPRequestHandler.headers., "rb")

       self.wfile.write(file.read())


if __name__ == "__main__":
  webServer = HTTPServer((hostName, serverPort), MyServer)
   print("Server started http://%s:%s" % (hostName, serverPort))

#   try:
        webServer.serve_forever()
   except KeyboardInterrupt:
       pass

   webServer.server_close()
   print("Server stopped.")
"""