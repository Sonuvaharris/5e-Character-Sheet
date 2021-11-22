"""Implements a simple HTTP/1.0 Server Original tutorial:
https://www.codementor.io/@joaojonesventura/building-a-basic-http-server-from-scratch-in-python-1cedkg0842 """

import socket
import webbrowser

# Define socket host and port
SERVER_HOST = "0.0.0.0"
SERVER_PORT = 8000

# Create socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind((SERVER_HOST, SERVER_PORT))
server_socket.listen(1)
print("Listening on localhost %s" % SERVER_PORT)
webbrowser.open("http://localhost:%s" % SERVER_PORT, 2, autoraise=True)

while True:
    # Wait for client connections
    client_connection, client_address = server_socket.accept()

    # Get the client request
    # header_size = 64
    # request = client_connection.recv(header_size).decode()

    data = bytearray()
    while True:
        chunk = client_connection.recv(64)
        if not chunk:
            break
        print(chunk.decode())
        data += chunk
    # print(request)
    request = data.decode()
    with open('request.txt', 'w') as f:
        f.write(request)

    # content_length = request.split("\n")[3]
    # request += client_connection.recv(int(content_length[16:len(content_length)]) - header_size).decode()

    # print("request: \n" + request)

    # Parse HTTP headers
    headers = request.split("\n")

    if headers[0].startswith("GET"):
        filename = headers[0].split()[1]
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
    elif headers[0].startswith("POST"):
        # turn json into file
        jsonString = request
        # while not(jsonString.endswith("end sheet")):
        #    jsonString += client_connection.recv(4096).decode()
        jsonString = jsonString[jsonString.index("var"):len(jsonString)]
        with open('charSheet.json', 'w') as f:
            f.write(jsonString)
        response = "HTTP/1.0 200 OK\n\n Saved character sheet"
    else:
        response = "HTTP/1.0 500\n\nwtf did you do?"

    # Send HTTP response
    client_connection.sendall(response.encode())
    client_connection.close()

# Close socket
server_socket.close()
