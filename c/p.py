import socket

def get_host_info():
    hostname = socket.gethostname() 
    print(f"Hostname: {hostname}")
    
    ip_address = socket.gethostbyname(hostname)
    print(f"IP address: {ip_address}")

if __name__ == "__main__":
    get_host_info()


import socket

def check_tcp_port(host, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(5)
    try:
        sock.connect((host, port))
        print(f"Port {port} on {host} is open")
    except socket.error:
        print(f"Port {port} on {host} is closed")
    finally:
        sock.close()

if __name__ == "__main__":
    check_tcp_port('DESKTOP-FSM', 5000)
