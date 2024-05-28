import socket

def check_web_server(host, port):
    try:
        sock = socket.create_connection((host, port), timeout=5)
        print(f"Web server at {host}:{port} is reachable")
        sock.close()
        return True
    except (socket.timeout, ConnectionRefusedError):
        print(f"Web server at {host}:{port} is not reachable")
        return False

# Example usage
web_server_host = "facebook.com"
web_server_port = 80
check_web_server(web_server_host, web_server_port)
