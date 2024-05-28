import socket

def start_udp_server(port):
    # Create a UDP server in Python using sockets.
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server_socket.bind(('localhost', port))
    print(f"UDP Server is listening on port {port}")
    
    while True:
        data, client_address = server_socket.recvfrom(1024)
        print(f"Received data from {client_address}: {data.decode()}")
        server_socket.sendto(data, client_address)

if __name__ == "__main__":
    port_number = 5000
    start_udp_server(port_number)


import socket

def send_udp_message(server_address, server_port, message):
    # Create a UDP client in Python using sockets.
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server_address = (server_address, server_port)
    client_socket.sendto(message.encode(), server_address)
    response, _ = client_socket.recvfrom(1024)
    print(f"Received response: {response.decode()}")

if __name__ == "__main__":
    server_address = 'localhost'
    server_port = 5000
    message_to_send = "Hello, UDP Server!"
    send_udp_message(server_address, server_port, message_to_send)
