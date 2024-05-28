import socket

def start_echo_server(port):
    # Create an echo server in Python using sockets.
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('localhost', port))
    server_socket.listen(5)  # Listen for up to 5 incoming connections
    print(f"Echo server is listening on port {port}")
    
    while True:
        client_socket, client_address = server_socket.accept()
        print(f"Connection from {client_address}")
        
        while True:
            data = client_socket.recv(1024)
            if not data:
                break
            client_socket.send(data)
        
        print(f"Connection with {client_address} closed")
        client_socket.close()
        
if __name__ == "__main__":
    port_number = 8000
    start_echo_server(port_number)
