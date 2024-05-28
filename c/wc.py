import http.client
import socket

def check_web_server(host, port):
    try:
        conn = http.client.HTTPConnection(host, port, timeout=5)
        conn.request("GET", "/")
        response = conn.getresponse()

        if response.status == 200:
            print(f"Web server at {host}:{port} is reachable")
            return True
        else:
            print(f"Web server at {host}:{port} returned status code: {response.status}")
            return False
    except (http.client.HTTPException, ConnectionRefusedError, socket.timeout) as e:
        print(f"Web server at {host}:{port} is not reachable: {e}")
        return False
    finally:
        if conn:
            conn.close()

# Example usage
web_server_host = "facebook.com"
web_server_port = 80
check_web_server(web_server_host, web_server_port)
