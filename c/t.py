import socket
import threading

def start_client():
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect(('localhost', 8006))

    while True:
        message = input("Enter your message (type 'exit' to end): ")
        client.send(message.encode('utf-8'))
        
        if message.lower() == "exit":
            break
        
        response = client.recv(1024).decode('utf-8')
        print(f"Received from server: {response}")

    client.close()

if __name__ == "__main__":
    start_client()


import socket
import threading

def handle_client(client_socket):
    while True:
        data = client_socket.recv(1024).decode('utf-8')
        if data.lower() == "exit":
            break
        print(f"Received from client: {data}")

        response = input("Enter your message (type 'exit' to end): ")
        client_socket.send(response.encode('utf-8'))
    
    client_socket.close()

def start_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('0.0.0.0', 8006))
    server.listen(5)
    print("Server is listening...")

    while True:
        client_socket, client_address = server.accept()
        print(f"Accepted connection from {client_address}")
        
        client_handler = threading.Thread(target=handle_client, args=(client_socket,))
        client_handler.start()

if __name__ == "__main__":
    start_server()
