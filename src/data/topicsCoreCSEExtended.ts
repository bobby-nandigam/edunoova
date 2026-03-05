import { TopicContent } from "./topicContent";

export const computerNetworksTopics: TopicContent[] = [
  {
    title: "OSI & TCP/IP Model",
    theory: "The OSI (Open Systems Interconnection) model divides networking into 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. Each layer has specific responsibilities and communicates with adjacent layers.\n\nThe TCP/IP model is the practical implementation with 4 layers: Network Access, Internet, Transport, and Application. Understanding these models helps troubleshoot network issues and design protocols. Data encapsulation adds headers at each layer (PDU: bits → frames → packets → segments → data).",
    keyPoints: [
      "OSI: 7 layers — Physical, Data Link, Network, Transport, Session, Presentation, Application",
      "TCP/IP: 4 layers — Network Access, Internet, Transport, Application",
      "Encapsulation: data gets wrapped with headers at each layer",
      "Each layer provides services to the layer above",
      "PDUs: Bits → Frames → Packets → Segments → Data"
    ],
    codeExample: {
      language: "python",
      code: `# Simulating OSI layers with encapsulation
class Packet:
    def __init__(self, data):
        self.data = data
        self.headers = []
    
    def encapsulate(self, layer, header):
        self.headers.append((layer, header))
        print(f"[{layer}] Added header: {header}")
    
    def decapsulate(self):
        while self.headers:
            layer, header = self.headers.pop()
            print(f"[{layer}] Removed header: {header}")

pkt = Packet("Hello, Network!")
pkt.encapsulate("Application", "HTTP GET /")
pkt.encapsulate("Transport", "TCP SRC:5000 DST:80")
pkt.encapsulate("Network", "IP 192.168.1.1 → 10.0.0.1")
pkt.encapsulate("Data Link", "MAC aa:bb → cc:dd")`,
      explanation: "Demonstrates how data gets encapsulated with headers at each network layer."
    },
    handsOn: [
      { task: "Map common protocols (HTTP, TCP, IP, Ethernet) to their OSI layers.", hint: "HTTP → Application, TCP → Transport, IP → Network, Ethernet → Data Link." },
      { task: "Trace a packet from browser to web server through all TCP/IP layers.", hint: "Start at Application (HTTP), add TCP segment, IP packet, Ethernet frame." },
      { task: "Compare OSI and TCP/IP models — list which OSI layers map to each TCP/IP layer.", hint: "Application layer in TCP/IP covers OSI layers 5, 6, 7." }
    ]
  },
  {
    title: "Data Link Layer",
    theory: "The Data Link Layer provides node-to-node data transfer and handles error detection/correction. It's divided into two sublayers: Logical Link Control (LLC) and Media Access Control (MAC).\n\nKey protocols include Ethernet (IEEE 802.3), Wi-Fi (802.11), and PPP. Error detection uses CRC (Cyclic Redundancy Check). Flow control mechanisms include Stop-and-Wait, Go-Back-N, and Selective Repeat. MAC addresses are 48-bit hardware addresses uniquely identifying network interfaces.",
    keyPoints: [
      "MAC address: 48-bit unique hardware identifier",
      "Error detection: CRC, checksum, parity bits",
      "Flow control: Stop-and-Wait, Sliding Window",
      "CSMA/CD: Ethernet collision detection",
      "ARP maps IP addresses to MAC addresses"
    ],
    codeExample: {
      language: "python",
      code: `# CRC Error Detection simulation
def crc_check(data, divisor):
    """Simple CRC calculation"""
    data_bits = list(data)
    divisor_bits = list(divisor)
    n = len(divisor_bits)
    
    # Append zeros
    padded = data_bits + ['0'] * (n - 1)
    
    for i in range(len(data_bits)):
        if padded[i] == '1':
            for j in range(n):
                padded[i + j] = str(int(padded[i + j]) ^ int(divisor_bits[j]))
    
    remainder = ''.join(padded[-(n-1):])
    return remainder

data = "1101011011"
divisor = "10011"
crc = crc_check(data, divisor)
print(f"CRC remainder: {crc}")
print(f"Transmitted: {data}{crc}")`,
      explanation: "CRC calculation for error detection — the remainder is appended to data before transmission."
    },
    handsOn: [
      { task: "Calculate the CRC for a given data string and generator polynomial.", hint: "Perform binary division (XOR) of data padded with zeros by the generator." },
      { task: "Simulate the Stop-and-Wait ARQ protocol with acknowledgment and timeout.", hint: "Send frame, wait for ACK; if timeout, retransmit." }
    ]
  },
  {
    title: "Network Layer & IP",
    theory: "The Network Layer handles routing packets across networks. IP (Internet Protocol) provides addressing and fragmentation. IPv4 uses 32-bit addresses (4.3 billion); IPv6 uses 128-bit addresses.\n\nIP headers contain source/destination addresses, TTL (Time To Live), protocol field, and checksum. Fragmentation splits large packets to fit MTU. ICMP (ping, traceroute) provides diagnostic messages. NAT (Network Address Translation) allows multiple devices to share one public IP.",
    keyPoints: [
      "IPv4: 32-bit addresses (dotted decimal notation)",
      "IPv6: 128-bit addresses (colon-hex notation)",
      "TTL prevents packets from looping forever",
      "NAT: translates private IPs to public IPs",
      "ICMP: diagnostic protocol (ping, traceroute)"
    ],
    codeExample: {
      language: "python",
      code: `import socket
import struct

def ip_to_binary(ip):
    """Convert IP address to 32-bit binary"""
    octets = ip.split('.')
    binary = ''.join(f'{int(o):08b}' for o in octets)
    return binary

def is_same_network(ip1, ip2, subnet_mask):
    """Check if two IPs are on the same network"""
    ip1_int = struct.unpack('!I', socket.inet_aton(ip1))[0]
    ip2_int = struct.unpack('!I', socket.inet_aton(ip2))[0]
    mask_int = struct.unpack('!I', socket.inet_aton(subnet_mask))[0]
    return (ip1_int & mask_int) == (ip2_int & mask_int)

print(ip_to_binary("192.168.1.100"))
print(is_same_network("192.168.1.10", "192.168.1.200", "255.255.255.0"))`,
      explanation: "IP address manipulation — converting to binary and checking network membership using subnet masks."
    },
    handsOn: [
      { task: "Convert between decimal, binary, and CIDR notation for IP addresses.", hint: "Each octet is 8 bits; /24 means 24 bits for network, 8 for host." },
      { task: "Write a program that calculates the network address, broadcast address, and host range for a given IP/CIDR.", hint: "Network = IP AND mask; Broadcast = Network OR (NOT mask)." }
    ]
  },
  {
    title: "Transport Layer (TCP/UDP)",
    theory: "The Transport Layer provides end-to-end communication. TCP (Transmission Control Protocol) is reliable, connection-oriented with flow/congestion control. UDP (User Datagram Protocol) is unreliable but fast and connectionless.\n\nTCP uses a three-way handshake (SYN, SYN-ACK, ACK) to establish connections. Flow control uses sliding window. Congestion control algorithms: Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery. Port numbers identify applications (HTTP:80, HTTPS:443, DNS:53).",
    keyPoints: [
      "TCP: reliable, ordered, connection-oriented",
      "UDP: fast, connectionless, no guarantee",
      "Three-way handshake: SYN → SYN-ACK → ACK",
      "Port numbers: 0-1023 well-known, 1024-49151 registered",
      "TCP congestion control: Slow Start, AIMD"
    ],
    codeExample: {
      language: "python",
      code: `import socket

# TCP Server
def tcp_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('localhost', 9999))
    server.listen(1)
    print("Server listening on port 9999...")
    conn, addr = server.accept()
    print(f"Connected by {addr}")
    data = conn.recv(1024)
    print(f"Received: {data.decode()}")
    conn.send(b"Hello from server!")
    conn.close()

# TCP Client
def tcp_client():
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect(('localhost', 9999))
    client.send(b"Hello from client!")
    response = client.recv(1024)
    print(f"Server says: {response.decode()}")
    client.close()`,
      explanation: "Basic TCP client-server using Python sockets — demonstrates connection-oriented communication."
    },
    handsOn: [
      { task: "Build a simple TCP echo server that sends back whatever it receives.", hint: "Use socket.accept(), recv(), and send() in a loop." },
      { task: "Implement a UDP-based chat application.", hint: "Use SOCK_DGRAM; sendto() and recvfrom() for connectionless communication." },
      { task: "Simulate TCP's sliding window protocol.", hint: "Track sent but unacked packets; advance window on ACK receipt." }
    ]
  },
  {
    title: "Application Layer (HTTP, DNS)",
    theory: "The Application Layer provides network services to end-user applications. HTTP (HyperText Transfer Protocol) is the foundation of the web. DNS (Domain Name System) translates domain names to IP addresses.\n\nHTTP methods: GET, POST, PUT, DELETE, PATCH. HTTP/2 introduces multiplexing; HTTP/3 uses QUIC (UDP-based). DNS uses a hierarchical system: Root servers → TLD servers → Authoritative servers. Other protocols: FTP, SMTP, DHCP, SNMP.",
    keyPoints: [
      "HTTP: stateless, request-response protocol",
      "HTTP status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error",
      "DNS: hierarchical naming, recursive/iterative queries",
      "HTTPS = HTTP + TLS encryption",
      "REST: architectural style using HTTP methods"
    ],
    codeExample: {
      language: "python",
      code: `import socket

def simple_http_request(host, path="/"):
    """Make a raw HTTP GET request"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((host, 80))
    
    request = f"GET {path} HTTP/1.1\\r\\nHost: {host}\\r\\nConnection: close\\r\\n\\r\\n"
    sock.send(request.encode())
    
    response = b""
    while True:
        data = sock.recv(4096)
        if not data:
            break
        response += data
    
    sock.close()
    headers, body = response.decode().split("\\r\\n\\r\\n", 1)
    print("Status:", headers.split("\\r\\n")[0])
    return body

# DNS lookup
import socket
ip = socket.gethostbyname("example.com")
print(f"example.com → {ip}")`,
      explanation: "Raw HTTP request using sockets and DNS lookup — shows how browsers work under the hood."
    },
    handsOn: [
      { task: "Build a minimal HTTP server that serves a static HTML page.", hint: "Listen on port 8080, parse the request line, send back HTTP response with headers." },
      { task: "Implement a DNS resolver that performs iterative queries.", hint: "Query root server → TLD server → authoritative server step by step." }
    ]
  },
  {
    title: "Routing Algorithms",
    theory: "Routing algorithms determine the best path for packets through a network. They are classified as static (manually configured) or dynamic (adapt to network changes). Two main categories: Distance Vector and Link State.\n\nDistance Vector (Bellman-Ford): each router shares its routing table with neighbors. Suffers from count-to-infinity problem (solved by split horizon, poison reverse). Link State (Dijkstra): each router has complete network topology, computes shortest paths. OSPF uses link state; RIP uses distance vector; BGP is a path vector protocol for inter-domain routing.",
    keyPoints: [
      "Distance Vector: share routing tables with neighbors (RIP)",
      "Link State: flood topology info, compute shortest paths (OSPF)",
      "Dijkstra's algorithm: finds shortest path from source",
      "BGP: inter-domain routing, policy-based",
      "Count-to-infinity: distance vector convergence problem"
    ],
    codeExample: {
      language: "python",
      code: `import heapq

def dijkstra(graph, start):
    """Dijkstra's shortest path algorithm for routing"""
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    previous = {node: None for node in graph}
    
    while pq:
        dist, node = heapq.heappop(pq)
        if dist > distances[node]:
            continue
        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                previous[neighbor] = node
                heapq.heappush(pq, (new_dist, neighbor))
    
    return distances, previous

# Network topology
network = {
    'A': [('B', 1), ('C', 4)],
    'B': [('A', 1), ('C', 2), ('D', 5)],
    'C': [('A', 4), ('B', 2), ('D', 1)],
    'D': [('B', 5), ('C', 1)]
}
dist, prev = dijkstra(network, 'A')
print("Shortest distances from A:", dist)`,
      explanation: "Dijkstra's algorithm simulates how OSPF routers compute shortest paths in a network."
    },
    handsOn: [
      { task: "Implement Bellman-Ford algorithm for distance vector routing.", hint: "Relax all edges V-1 times; check for negative cycles on V-th iteration." },
      { task: "Simulate distance vector routing with multiple routers exchanging tables.", hint: "Each router updates its table based on neighbors' tables until convergence." }
    ]
  },
  {
    title: "Subnetting",
    theory: "Subnetting divides a network into smaller subnetworks. It improves security, reduces broadcast domains, and enables efficient IP allocation. CIDR (Classless Inter-Domain Routing) replaced classful addressing.\n\nSubnet mask determines network vs host portion of an IP address. VLSM (Variable Length Subnet Masking) allows different subnet sizes. Supernetting (route aggregation) combines multiple networks into one route. Key calculations: number of subnets = 2^borrowed bits, hosts per subnet = 2^host bits - 2.",
    keyPoints: [
      "Subnet mask separates network and host portions",
      "CIDR notation: /24 = 255.255.255.0",
      "Hosts per subnet = 2^(host bits) - 2 (network + broadcast)",
      "VLSM allows variable-size subnets",
      "Supernetting aggregates routes to reduce routing table size"
    ],
    handsOn: [
      { task: "Subnet 192.168.10.0/24 into 4 equal subnets and list each subnet's range.", hint: "Borrow 2 bits → /26 subnets with 62 hosts each." },
      { task: "Design a VLSM addressing scheme for a network with departments of different sizes.", hint: "Allocate largest subnets first, then subdivide remaining space." },
      { task: "Write a subnet calculator that takes IP/CIDR and outputs network, broadcast, and host range.", hint: "Use bitwise AND for network, OR with inverted mask for broadcast." }
    ]
  },
  {
    title: "Network Security",
    theory: "Network security protects data during transmission. Key concepts: confidentiality (encryption), integrity (hashing), authentication (certificates), and non-repudiation (digital signatures).\n\nSymmetric encryption (AES) uses the same key for encrypt/decrypt. Asymmetric encryption (RSA) uses public/private key pairs. TLS/SSL secures HTTP, creating HTTPS. Firewalls filter traffic based on rules. VPNs create encrypted tunnels over public networks. Common attacks: MITM, DDoS, phishing, packet sniffing.",
    keyPoints: [
      "Symmetric encryption: fast, same key (AES)",
      "Asymmetric encryption: public/private keys (RSA)",
      "Digital certificates verify identity (X.509)",
      "TLS handshake establishes secure connection",
      "Common attacks: MITM, DDoS, DNS spoofing"
    ],
    codeExample: {
      language: "python",
      code: `import hashlib
import hmac

# Hashing for integrity
message = "Transfer $1000 to Account 12345"
hash_digest = hashlib.sha256(message.encode()).hexdigest()
print(f"SHA-256: {hash_digest}")

# HMAC for authentication + integrity
secret_key = b"my_secret_key"
mac = hmac.new(secret_key, message.encode(), hashlib.sha256).hexdigest()
print(f"HMAC: {mac}")

# Verify
def verify_message(msg, received_mac, key):
    computed = hmac.new(key, msg.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(computed, received_mac)

print(f"Valid: {verify_message(message, mac, secret_key)}")`,
      explanation: "SHA-256 hashing ensures integrity; HMAC adds authentication using a shared secret key."
    },
    handsOn: [
      { task: "Implement a simple Caesar cipher and then break it using frequency analysis.", hint: "Caesar shifts letters by a fixed amount; English letter frequency helps crack it." },
      { task: "Create a program that performs a Diffie-Hellman key exchange.", hint: "Both parties agree on p, g; exchange g^a mod p and g^b mod p; shared secret = g^(ab) mod p." }
    ]
  },
  {
    title: "Firewalls",
    theory: "Firewalls control network traffic based on predefined security rules. Types: Packet Filter (inspects headers), Stateful Inspection (tracks connections), Application Gateway/Proxy (inspects content), Next-Generation (deep packet inspection + IPS).\n\nPacket filtering examines source/destination IP, port, and protocol. Stateful firewalls maintain connection tables. DMZ (Demilitarized Zone) hosts public-facing servers. ACLs (Access Control Lists) define allow/deny rules. Defense in depth combines multiple security layers.",
    keyPoints: [
      "Packet filter: fast, examines headers only",
      "Stateful inspection: tracks connection state",
      "Application gateway: inspects payload content",
      "DMZ: buffer zone between internal and external networks",
      "Default deny: block everything, allow exceptions"
    ],
    handsOn: [
      { task: "Design firewall rules for a web server that only allows HTTP/HTTPS and SSH.", hint: "Allow inbound TCP 80, 443, 22; deny all other inbound; allow all outbound." },
      { task: "Simulate a packet filter firewall that processes a list of incoming packets.", hint: "Check each packet's source IP, dest port against rule list; accept or drop." }
    ]
  },
  {
    title: "Socket Programming",
    theory: "Socket programming enables direct network communication between processes. A socket is an endpoint for communication identified by IP address and port number. The socket API provides functions: socket(), bind(), listen(), accept(), connect(), send(), recv(), close().\n\nServer workflow: create socket → bind to address → listen → accept connections → communicate → close. Client workflow: create socket → connect to server → communicate → close. Select/poll/epoll enable handling multiple connections efficiently. Non-blocking I/O and async patterns improve scalability.",
    keyPoints: [
      "Socket = IP address + port number",
      "TCP sockets: SOCK_STREAM (reliable, ordered)",
      "UDP sockets: SOCK_DGRAM (fast, unordered)",
      "Server: bind → listen → accept; Client: connect",
      "Select/epoll: handle multiple connections efficiently"
    ],
    codeExample: {
      language: "python",
      code: `import socket
import threading

def handle_client(conn, addr):
    print(f"New connection: {addr}")
    while True:
        data = conn.recv(1024)
        if not data:
            break
        response = data.decode().upper()
        conn.send(response.encode())
    conn.close()

def start_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(('localhost', 8888))
    server.listen(5)
    print("Multi-threaded server on port 8888")
    
    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target=handle_client, args=(conn, addr))
        thread.start()

# Run: start_server() in one terminal
# Connect: multiple telnet localhost 8888`,
      explanation: "Multi-threaded TCP server handling multiple concurrent clients — each connection gets its own thread."
    },
    handsOn: [
      { task: "Build a multi-client chat server where messages are broadcast to all connected users.", hint: "Maintain a list of connections; when one client sends, forward to all others." },
      { task: "Create a file transfer application using TCP sockets.", hint: "Send file size first, then file data in chunks; receiver writes chunks to file." },
      { task: "Implement a simple HTTP server that parses GET requests and serves files.", hint: "Parse the request line for the file path, read the file, send HTTP response headers + content." }
    ]
  }
];

export const oopTopics: TopicContent[] = [
  {
    title: "Classes & Objects",
    theory: "A class is a blueprint defining properties (attributes) and behaviors (methods) of objects. An object is an instance of a class with specific state. Classes enable modeling real-world entities in code.\n\nConstructors initialize object state. Destructors clean up resources. Access modifiers (public, private, protected) control visibility. Static members belong to the class, not instances. Object identity (reference) vs equality (content) is an important distinction.",
    keyPoints: [
      "Class: blueprint; Object: instance with state",
      "Constructor initializes; Destructor cleans up",
      "Access modifiers: public, private, protected",
      "Static members shared across all instances",
      "this/self refers to the current object"
    ],
    codeExample: {
      language: "java",
      code: `public class BankAccount {
    private String owner;
    private double balance;
    private static int totalAccounts = 0;
    
    public BankAccount(String owner, double initialDeposit) {
        this.owner = owner;
        this.balance = initialDeposit;
        totalAccounts++;
    }
    
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
    
    public double getBalance() { return balance; }
    public static int getTotalAccounts() { return totalAccounts; }
}`,
      explanation: "BankAccount class with encapsulation — private fields, public methods, and a static counter."
    },
    handsOn: [
      { task: "Design a Student class with name, grades array, and methods to calculate GPA.", hint: "Store grades in a list; GPA = sum of grades / number of courses." },
      { task: "Create a Library system with Book and Member classes that tracks borrowing.", hint: "Book has isAvailable flag; Member has borrowedBooks list." },
      { task: "Implement a copy constructor and compare shallow vs deep copy.", hint: "Shallow copy shares references; deep copy creates new objects for fields." }
    ]
  },
  {
    title: "Inheritance",
    theory: "Inheritance allows a class (child/subclass) to inherit properties and methods from another class (parent/superclass). It promotes code reuse and establishes an IS-A relationship.\n\nTypes: Single, Multilevel, Hierarchical, Multiple (via interfaces in Java/C#, direct in C++/Python). Method overriding allows subclasses to provide specific implementations. The super/base keyword calls parent methods. Abstract classes cannot be instantiated and may have abstract methods.",
    keyPoints: [
      "IS-A relationship: Dog IS-A Animal",
      "Subclass inherits all non-private members of superclass",
      "Method overriding: subclass redefines parent method",
      "super() calls parent constructor or method",
      "Diamond problem in multiple inheritance (solved by virtual inheritance or interfaces)"
    ],
    codeExample: {
      language: "java",
      code: `abstract class Shape {
    protected String color;
    
    public Shape(String color) { this.color = color; }
    
    abstract double area();
    abstract double perimeter();
    
    public void display() {
        System.out.printf("%s: area=%.2f, perimeter=%.2f%n",
            getClass().getSimpleName(), area(), perimeter());
    }
}

class Circle extends Shape {
    private double radius;
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    double area() { return Math.PI * radius * radius; }
    double perimeter() { return 2 * Math.PI * radius; }
}

class Rectangle extends Shape {
    private double width, height;
    public Rectangle(String color, double w, double h) {
        super(color);
        this.width = w; this.height = h;
    }
    double area() { return width * height; }
    double perimeter() { return 2 * (width + height); }
}`,
      explanation: "Abstract Shape class with Circle and Rectangle subclasses — demonstrates inheritance and polymorphism."
    },
    handsOn: [
      { task: "Build a vehicle hierarchy: Vehicle → Car, Truck, Motorcycle with specific properties.", hint: "Vehicle has common fields (speed, fuel); subclasses add unique fields (numDoors, payload)." },
      { task: "Implement an Employee hierarchy with different pay calculation for each type.", hint: "FullTime: salary; PartTime: hourlyRate * hours; Contractor: projectFee." }
    ]
  },
  {
    title: "Polymorphism",
    theory: "Polymorphism means 'many forms' — the same interface behaves differently based on the actual object type. Compile-time polymorphism (method overloading) resolves at compile time. Runtime polymorphism (method overriding) resolves at runtime via dynamic dispatch.\n\nVirtual functions (C++) or overridden methods (Java) enable runtime polymorphism. The Liskov Substitution Principle states that objects of a superclass should be replaceable with objects of a subclass. Operator overloading is another form of compile-time polymorphism.",
    keyPoints: [
      "Compile-time: method overloading (same name, different parameters)",
      "Runtime: method overriding (subclass redefines parent method)",
      "Dynamic dispatch selects the correct method at runtime",
      "Liskov Substitution: subtype must be usable as supertype",
      "Operator overloading customizes operators for user-defined types"
    ],
    codeExample: {
      language: "python",
      code: `class Animal:
    def speak(self):
        raise NotImplementedError
    
    def __str__(self):
        return f"{self.__class__.__name__} says: {self.speak()}"

class Dog(Animal):
    def speak(self): return "Woof!"

class Cat(Animal):
    def speak(self): return "Meow!"

class Duck(Animal):
    def speak(self): return "Quack!"

# Polymorphism in action
animals = [Dog(), Cat(), Duck(), Dog()]
for animal in animals:
    print(animal)  # Each calls its own speak()

# Duck typing (Python-specific polymorphism)
class Robot:
    def speak(self): return "Beep boop!"

# Robot works too, even without inheriting Animal
print(Robot().speak())`,
      explanation: "Runtime polymorphism — same interface (speak), different behavior per class. Python also supports duck typing."
    },
    handsOn: [
      { task: "Create a payment processing system with different payment methods (CreditCard, PayPal, Crypto).", hint: "Define a processPayment() method in each class with different logic." },
      { task: "Implement operator overloading for a Vector2D class (add, subtract, dot product).", hint: "Override __add__, __sub__, __mul__ in Python or operator+ in C++." }
    ]
  },
  {
    title: "Encapsulation",
    theory: "Encapsulation bundles data and methods that operate on that data within a single unit (class), restricting direct access to some components. It protects object integrity by preventing external code from setting invalid states.\n\nGetters and setters provide controlled access to private fields. Properties (C#, Python) offer a cleaner syntax. Data hiding reduces coupling between classes. Immutable objects (all fields final/readonly) are inherently thread-safe.",
    keyPoints: [
      "Private fields + public methods = controlled access",
      "Getters read; Setters validate before writing",
      "Reduces coupling: internal changes don't affect external code",
      "Immutable objects: set once, never change",
      "Information hiding is key to maintainable code"
    ],
    codeExample: {
      language: "python",
      code: `class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius  # "protected" by convention
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

t = Temperature(100)
print(f"{t.celsius}°C = {t.fahrenheit}°F")
t.fahrenheit = 32
print(f"{t.celsius}°C = {t.fahrenheit}°F")`,
      explanation: "Python properties provide encapsulation with clean syntax — validation in setters prevents invalid state."
    },
    handsOn: [
      { task: "Build a Password class that stores hashed passwords and validates strength on setting.", hint: "Use hashlib for hashing; check length, uppercase, digits, special chars." },
      { task: "Create an immutable Money class with currency and amount that supports arithmetic.", hint: "Use __slots__ and property decorators; return new Money objects from operations." }
    ]
  },
  {
    title: "Abstraction",
    theory: "Abstraction hides complex implementation details and shows only essential features. Abstract classes define interfaces with some implementation; interfaces define pure contracts with no implementation.\n\nAbstraction reduces complexity by separating WHAT an object does from HOW it does it. In Java, abstract classes use 'abstract' keyword; interfaces use 'interface'. Python uses ABC (Abstract Base Class). Multiple interfaces can be implemented by a single class, enabling flexible design.",
    keyPoints: [
      "Abstract class: partial implementation, cannot instantiate",
      "Interface: pure contract, all methods abstract",
      "Separates what from how",
      "A class can implement multiple interfaces",
      "ABC module in Python for abstract classes"
    ],
    handsOn: [
      { task: "Design a Database abstraction layer with MySQL and PostgreSQL implementations.", hint: "Abstract: connect(), query(), close(). Each DB implements differently." },
      { task: "Create a notification system with Email, SMS, and Push notification abstractions.", hint: "Interface: send(message, recipient). Each implementation uses different APIs." }
    ]
  },
  {
    title: "Interfaces",
    theory: "Interfaces define a contract that implementing classes must fulfill. They specify WHAT methods a class must have without dictating HOW. This enables loose coupling and dependency injection.\n\nIn Java, interfaces can have default methods (Java 8+) and static methods. In Python, protocols and ABCs serve similar purposes. In TypeScript, interfaces define object shapes. Programming to interfaces (not implementations) is a core OOP principle enabling flexibility and testability.",
    keyPoints: [
      "Interface = pure contract (method signatures only)",
      "A class can implement multiple interfaces",
      "Default methods add backward-compatible functionality",
      "Program to interfaces, not implementations",
      "Enables dependency injection and mocking"
    ],
    codeExample: {
      language: "java",
      code: `interface Sortable<T extends Comparable<T>> {
    void sort();
    default void printSorted() {
        sort();
        System.out.println(this);
    }
}

interface Searchable<T> {
    int search(T item);
    boolean contains(T item);
}

class SortedList<T extends Comparable<T>> 
    implements Sortable<T>, Searchable<T> {
    
    private List<T> items = new ArrayList<>();
    
    public void add(T item) { items.add(item); }
    
    public void sort() { Collections.sort(items); }
    
    public int search(T item) {
        sort();
        return Collections.binarySearch(items, item);
    }
    
    public boolean contains(T item) {
        return search(item) >= 0;
    }
}`,
      explanation: "Multiple interface implementation — SortedList fulfills both Sortable and Searchable contracts."
    },
    handsOn: [
      { task: "Design a plugin system using interfaces where plugins are loaded dynamically.", hint: "Define a Plugin interface with init(), execute(), shutdown() methods." },
      { task: "Implement the Strategy pattern using interfaces for different sorting algorithms.", hint: "SortStrategy interface with sort() method; BubbleSort, QuickSort implementations." }
    ]
  },
  {
    title: "Design Patterns",
    theory: "Design patterns are proven solutions to common software design problems. Creational patterns (Singleton, Factory, Builder) handle object creation. Structural patterns (Adapter, Decorator, Facade) deal with object composition. Behavioral patterns (Observer, Strategy, Command) manage algorithms and communication.\n\nThe Gang of Four (GoF) catalog contains 23 patterns. Key patterns every developer should know: Singleton (one instance), Factory (create without specifying class), Observer (event-driven), Strategy (interchangeable algorithms), Decorator (extend behavior dynamically).",
    keyPoints: [
      "Singleton: exactly one instance globally",
      "Factory: create objects without specifying exact class",
      "Observer: publish-subscribe event system",
      "Strategy: swap algorithms at runtime",
      "Decorator: add responsibilities dynamically"
    ],
    codeExample: {
      language: "python",
      code: `# Observer Pattern
class EventEmitter:
    def __init__(self):
        self._listeners = {}
    
    def on(self, event, callback):
        self._listeners.setdefault(event, []).append(callback)
    
    def emit(self, event, *args):
        for cb in self._listeners.get(event, []):
            cb(*args)

# Usage
store = EventEmitter()

def log_sale(item, qty):
    print(f"LOG: Sold {qty}x {item}")

def update_inventory(item, qty):
    print(f"INVENTORY: -{qty} {item}")

store.on("sale", log_sale)
store.on("sale", update_inventory)
store.emit("sale", "Widget", 5)`,
      explanation: "Observer pattern — decoupled event system where multiple handlers react to events independently."
    },
    handsOn: [
      { task: "Implement the Singleton pattern in a thread-safe way.", hint: "Use double-checked locking or a module-level instance in Python." },
      { task: "Build a pizza ordering system using the Builder pattern.", hint: "PizzaBuilder with methods: setSize(), addTopping(), setCrust() → build()." },
      { task: "Create a logging framework using the Decorator pattern.", hint: "Base logger + decorators: TimestampDecorator, FileDecorator, ColorDecorator." }
    ]
  },
  {
    title: "SOLID Principles",
    theory: "SOLID is five principles for maintainable, scalable OOP code. S: Single Responsibility (one reason to change). O: Open/Closed (open for extension, closed for modification). L: Liskov Substitution (subtypes are substitutable). I: Interface Segregation (no fat interfaces). D: Dependency Inversion (depend on abstractions).\n\nViolating these principles leads to rigid, fragile, and hard-to-test code. SRP keeps classes focused. OCP uses polymorphism instead of conditionals. LSP ensures correct inheritance hierarchies. ISP splits fat interfaces. DIP enables dependency injection.",
    keyPoints: [
      "SRP: a class should have only one reason to change",
      "OCP: extend behavior without modifying existing code",
      "LSP: derived classes must honor base class contracts",
      "ISP: many specific interfaces over one general interface",
      "DIP: high-level modules shouldn't depend on low-level details"
    ],
    handsOn: [
      { task: "Refactor a God class that handles user auth, email, and logging into SRP-compliant classes.", hint: "Extract AuthService, EmailService, Logger — each with single responsibility." },
      { task: "Apply OCP to a shape area calculator without modifying existing code for new shapes.", hint: "Use polymorphism: each Shape subclass implements its own area() method." }
    ]
  },
  {
    title: "UML Diagrams",
    theory: "UML (Unified Modeling Language) provides standardized diagrams for visualizing software design. Class diagrams show structure (classes, relationships). Sequence diagrams show interactions over time. Use case diagrams capture requirements.\n\nClass diagram relationships: Association (uses), Aggregation (has-a, weak), Composition (has-a, strong), Inheritance (is-a), Dependency (depends on), Realization (implements). Activity diagrams model workflows. State diagrams model object lifecycle.",
    keyPoints: [
      "Class diagram: attributes, methods, relationships",
      "Association: simple relationship between classes",
      "Aggregation: whole-part, part can exist independently",
      "Composition: whole-part, part cannot exist alone",
      "Sequence diagram: message flow between objects over time"
    ],
    handsOn: [
      { task: "Draw a class diagram for an e-commerce system (User, Product, Cart, Order, Payment).", hint: "User has Cart (composition); Cart contains Products (aggregation); Order references Payment." },
      { task: "Create a sequence diagram for the checkout process in an online store.", hint: "User → Cart → OrderService → PaymentGateway → EmailService, showing messages and returns." }
    ]
  }
];

export const compilersTopics: TopicContent[] = [
  {
    title: "Lexical Analysis",
    theory: "Lexical analysis (scanning) is the first phase of compilation. The lexer reads source code character by character and groups them into tokens — the smallest meaningful units (keywords, identifiers, operators, literals).\n\nLexers are typically implemented using finite automata (DFA). Regular expressions define token patterns. The lexer also strips whitespace and comments, reports lexical errors, and maintains line/column information for error messages. Tools like Lex/Flex automate lexer generation from regex specifications.",
    keyPoints: [
      "Token: <type, value> pair (e.g., <IDENTIFIER, 'x'>)",
      "Lexer uses DFA to recognize tokens",
      "Regular expressions define token patterns",
      "Handles whitespace stripping and comments",
      "Lex/Flex: automated lexer generators"
    ],
    codeExample: {
      language: "python",
      code: `import re

TOKEN_SPEC = [
    ('NUMBER',  r'\\d+(\\.\\d+)?'),
    ('IDENT',   r'[a-zA-Z_]\\w*'),
    ('OP',      r'[+\\-*/=<>!]=?'),
    ('LPAREN',  r'\\('),
    ('RPAREN',  r'\\)'),
    ('SEMI',    r';'),
    ('SKIP',    r'[ \\t]+'),
    ('NEWLINE', r'\\n'),
]

KEYWORDS = {'if', 'else', 'while', 'return', 'int', 'float'}

def tokenize(code):
    pattern = '|'.join(f'(?P<{name}>{regex})' for name, regex in TOKEN_SPEC)
    for match in re.finditer(pattern, code):
        kind = match.lastgroup
        value = match.group()
        if kind == 'SKIP' or kind == 'NEWLINE':
            continue
        if kind == 'IDENT' and value in KEYWORDS:
            kind = 'KEYWORD'
        yield (kind, value)

code = "int x = 42 + y;"
for token in tokenize(code):
    print(token)`,
      explanation: "Simple lexer using regex — converts source code into a stream of typed tokens."
    },
    handsOn: [
      { task: "Build a lexer that tokenizes arithmetic expressions with variables.", hint: "Define regex patterns for numbers, identifiers, operators, and parentheses." },
      { task: "Extend the lexer to handle string literals and single-line comments.", hint: "Add patterns: string = '\"[^\"]*\"', comment = '//[^\\n]*'." }
    ]
  },
  {
    title: "Syntax Analysis",
    theory: "Syntax analysis (parsing) checks if the token stream follows the grammar rules of the language. It builds a parse tree or AST (Abstract Syntax Tree) representing the program's structure.\n\nContext-Free Grammars (CFG) formally define language syntax. Parse trees show complete derivations; ASTs simplify by removing redundant nodes. Ambiguous grammars have multiple parse trees for the same input. Operator precedence and associativity resolve ambiguities in expression grammars.",
    keyPoints: [
      "CFG: productions define valid syntax",
      "Parse tree: complete derivation with all grammar symbols",
      "AST: simplified tree with only essential nodes",
      "Ambiguity: multiple valid parse trees for same input",
      "Precedence/associativity resolve expression ambiguity"
    ],
    codeExample: {
      language: "python",
      code: `# Recursive Descent Parser for arithmetic expressions
# Grammar: E -> T (('+' | '-') T)*
#          T -> F (('*' | '/') F)*
#          F -> NUMBER | '(' E ')'

class Parser:
    def __init__(self, tokens):
        self.tokens = list(tokens)
        self.pos = 0
    
    def parse(self):
        result = self.expr()
        return result
    
    def expr(self):
        left = self.term()
        while self.pos < len(self.tokens) and self.tokens[self.pos][1] in '+-':
            op = self.tokens[self.pos][1]
            self.pos += 1
            right = self.term()
            left = (op, left, right)
        return left
    
    def term(self):
        left = self.factor()
        while self.pos < len(self.tokens) and self.tokens[self.pos][1] in '*/':
            op = self.tokens[self.pos][1]
            self.pos += 1
            right = self.factor()
            left = (op, left, right)
        return left
    
    def factor(self):
        token = self.tokens[self.pos]
        if token[0] == 'NUMBER':
            self.pos += 1
            return float(token[1])
        elif token[1] == '(':
            self.pos += 1
            result = self.expr()
            self.pos += 1  # skip ')'
            return result`,
      explanation: "Recursive descent parser builds an AST for arithmetic expressions with correct precedence."
    },
    handsOn: [
      { task: "Write a recursive descent parser for a simple calculator language.", hint: "Implement one function per grammar rule; handle precedence with rule nesting." },
      { task: "Build an AST evaluator that computes the result of parsed expressions.", hint: "Recursively evaluate: if tuple (op, left, right), apply op to evaluated children." }
    ]
  },
  { title: "Parsing Techniques", theory: "Parsing techniques are classified as top-down or bottom-up. Top-down parsers (LL) start from the start symbol and derive the input. Bottom-up parsers (LR) start from input and reduce to the start symbol.\n\nLL(1) parsers use one lookahead token; computed via FIRST and FOLLOW sets. LR parsers are more powerful: SLR, LALR (used by YACC/Bison), and canonical LR. Shift-reduce parsing uses a stack: shift pushes tokens, reduce applies grammar rules. Parser generators (YACC, ANTLR, Bison) automate parser construction.", keyPoints: ["LL(1): top-down, predictive, uses FIRST/FOLLOW sets", "LR: bottom-up, shift-reduce, more powerful than LL", "LALR: practical subset of LR used by YACC/Bison", "FIRST set: terminals that can begin a derivation", "FOLLOW set: terminals that can appear after a non-terminal"], handsOn: [{ task: "Compute FIRST and FOLLOW sets for a given grammar.", hint: "FIRST: first terminal reachable; FOLLOW: what follows a non-terminal in any derivation." }, { task: "Build an LL(1) parsing table and parse a sample input.", hint: "Table[A][a] = production where a ∈ FIRST(α) for A → α." }] },
  { title: "Semantic Analysis", theory: "Semantic analysis checks for meaning errors that syntax analysis can't catch: type mismatches, undeclared variables, scope violations, and function argument count/type mismatches.\n\nType checking ensures operations are applied to compatible types. Symbol tables store information about identifiers (name, type, scope, memory location). Scope rules determine identifier visibility. Type inference deduces types without explicit annotations. Attribute grammars attach semantic rules to grammar productions.", keyPoints: ["Type checking: verify operation compatibility", "Symbol table: maps identifiers to their attributes", "Scope: lexical (static) vs dynamic scoping", "Type coercion: implicit type conversion", "Semantic errors: type mismatch, undeclared variable, wrong argument count"], handsOn: [{ task: "Build a symbol table that handles nested scopes (block scope).", hint: "Use a stack of dictionaries; push on scope entry, pop on exit." }, { task: "Implement a type checker for arithmetic expressions with int and float.", hint: "Float + Int = Float (widening); Int + Int = Int; String + Int = Error." }] },
  { title: "Intermediate Code", theory: "Intermediate code is a machine-independent representation between source and target code. It simplifies optimization and enables targeting multiple architectures from one front-end.\n\nCommon forms: Three-Address Code (TAC), where each instruction has at most three operands. Quadruples (op, arg1, arg2, result), triples, and SSA (Static Single Assignment) form. Control flow is represented with labels and gotos. Expression trees and DAGs (Directed Acyclic Graphs) eliminate common subexpressions.", keyPoints: ["TAC: t1 = a + b (at most 3 addresses per instruction)", "Quadruple: (op, arg1, arg2, result)", "SSA: each variable assigned exactly once", "DAG eliminates common subexpressions", "Enables machine-independent optimizations"], handsOn: [{ task: "Convert an arithmetic expression to three-address code using temporaries.", hint: "Break complex expressions: a+b*c → t1=b*c; t2=a+t1." }, { task: "Build a DAG for an expression and identify common subexpressions.", hint: "Reuse nodes when the same operation on same operands appears." }] },
  { title: "Code Optimization", theory: "Code optimization improves program performance without changing behavior. Machine-independent optimizations: constant folding, dead code elimination, common subexpression elimination, loop optimizations (invariant hoisting, unrolling, strength reduction).\n\nMachine-dependent optimizations: register allocation, instruction selection, instruction scheduling. Loop optimization is most impactful since programs spend most time in loops. Data flow analysis (reaching definitions, live variables, available expressions) enables systematic optimization.", keyPoints: ["Constant folding: evaluate constants at compile time", "Dead code elimination: remove unreachable/unused code", "Loop-invariant code motion: hoist out of loops", "Strength reduction: replace expensive ops (multiply → shift)", "Register allocation: minimize memory access"], handsOn: [{ task: "Apply constant folding and dead code elimination to a given code segment.", hint: "Replace constant expressions with values; remove code after unconditional returns." }, { task: "Identify loop-invariant computations and hoist them out of a loop.", hint: "If computation doesn't depend on loop variable, move it before the loop." }] },
  { title: "Code Generation", theory: "Code generation translates intermediate code to target machine code or assembly. It handles instruction selection (choosing machine instructions), register allocation (assigning variables to registers), and instruction ordering.\n\nRegister allocation uses graph coloring: build interference graph, color with k colors (k = number of registers). Spilling moves values to memory when registers are insufficient. Instruction selection can use tree pattern matching or dynamic programming. Peephole optimization improves small sequences of generated instructions.", keyPoints: ["Instruction selection: map IR to machine instructions", "Register allocation: graph coloring algorithm", "Spilling: move values to memory when registers full", "Peephole optimization: improve small code sequences", "Target: x86, ARM, RISC-V assembly or bytecode"], handsOn: [{ task: "Generate assembly code (pseudocode) for a simple arithmetic expression.", hint: "Use LOAD, ADD, MUL, STORE instructions; allocate registers sequentially." }, { task: "Implement a simple register allocator for basic blocks.", hint: "Track which values are in registers; spill least-recently-used when full." }] },
  { title: "Symbol Tables", theory: "Symbol tables store information about identifiers encountered during compilation: name, type, scope, memory location, and other attributes. They support efficient insert, lookup, and scope management operations.\n\nImplementations: hash tables (fast O(1) average lookup), balanced BSTs, or linked lists. Scoped symbol tables handle nested blocks using a stack of tables or scope chains. Symbol tables are used across all compiler phases — from lexical analysis through code generation.", keyPoints: ["Maps identifier names to attributes (type, scope, address)", "Hash table: most common implementation", "Scope management: push/pop scope on block entry/exit", "Used by semantic analysis, type checking, code generation", "Must handle variable shadowing in nested scopes"], handsOn: [{ task: "Implement a scoped symbol table supporting nested block scopes.", hint: "Use a list of dictionaries as a scope stack; search from innermost to outermost." }] },
  { title: "Error Handling", theory: "Error handling in compilers detects, reports, and recovers from errors to continue compilation and find more errors. Lexical errors: invalid characters. Syntax errors: unexpected tokens. Semantic errors: type mismatches, undeclared variables.\n\nPanic mode recovery: discard tokens until a synchronizing token is found. Phrase-level recovery: perform local corrections. Error productions: augment grammar with common error patterns. Global correction: find minimum changes to make input valid (expensive, rarely used). Good error messages include location, context, and suggestions.", keyPoints: ["Panic mode: skip tokens to synchronization point", "Phrase-level: local corrections (insert/delete/replace)", "Error productions: anticipate common mistakes in grammar", "Error messages should include line, column, and context", "Recovery allows finding multiple errors in one pass"], handsOn: [{ task: "Implement panic mode error recovery in a recursive descent parser.", hint: "On error, skip tokens until you find one in the FOLLOW set of the current non-terminal." }, { task: "Design informative error messages for common syntax mistakes.", hint: "Include the unexpected token, what was expected, and the line/column number." }] }
];

export const tocTopics: TopicContent[] = [
  { title: "Finite Automata (DFA/NFA)", theory: "Finite automata are mathematical models of computation with a finite number of states. DFA (Deterministic FA) has exactly one transition per symbol per state. NFA (Non-deterministic FA) can have multiple transitions or ε-transitions.\n\nEvery NFA can be converted to an equivalent DFA using subset construction (may exponentially increase states). FA recognize regular languages. Minimum DFA: partition states into equivalence classes using Myhill-Nerode theorem or table-filling algorithm.", keyPoints: ["DFA: one transition per (state, symbol) pair", "NFA: multiple transitions, ε-transitions allowed", "NFA → DFA: subset construction algorithm", "FA recognize exactly the regular languages", "Minimization: merge indistinguishable states"], codeExample: { language: "python", code: `class DFA:\n    def __init__(self, states, alphabet, transitions, start, accept):\n        self.transitions = transitions\n        self.start = start\n        self.accept = accept\n    \n    def accepts(self, string):\n        state = self.start\n        for char in string:\n            state = self.transitions.get((state, char))\n            if state is None:\n                return False\n        return state in self.accept\n\n# DFA for strings ending in "01"\ndfa = DFA(\n    states={'q0', 'q1', 'q2'},\n    alphabet={'0', '1'},\n    transitions={\n        ('q0','0'):'q1', ('q0','1'):'q0',\n        ('q1','0'):'q1', ('q1','1'):'q2',\n        ('q2','0'):'q1', ('q2','1'):'q0',\n    },\n    start='q0', accept={'q2'}\n)\nprint(dfa.accepts("1101"))  # True\nprint(dfa.accepts("1100"))  # False`, explanation: "DFA implementation that accepts binary strings ending in '01'." }, handsOn: [{ task: "Build a DFA that accepts binary strings divisible by 3.", hint: "States represent remainder (0, 1, 2); start and accept state is remainder 0." }, { task: "Convert a given NFA to DFA using subset construction.", hint: "Each DFA state is a set of NFA states; compute ε-closure and transitions." }] },
  { title: "Regular Expressions", theory: "Regular expressions define patterns for regular languages using: concatenation (ab), union (a|b), and Kleene star (a*). They are equivalent in power to finite automata — every regex has an equivalent FA and vice versa.\n\nExtended operators: + (one or more), ? (zero or one), character classes ([a-z]), anchors (^, $). Thompson's construction converts regex to NFA. Brzozowski's derivative is an algebraic approach. Regular expressions cannot match nested structures (e.g., balanced parentheses).", keyPoints: ["Basic operators: concatenation, union (|), Kleene star (*)", "Regex ↔ FA: equivalent computational power", "Thompson's construction: regex → NFA", "Cannot express: balanced parentheses, a^n b^n", "Pumping lemma proves a language is not regular"], handsOn: [{ task: "Write regular expressions for: email addresses, phone numbers, and IP addresses.", hint: "Email: [a-zA-Z0-9.]+@[a-zA-Z0-9.]+\\.[a-zA-Z]{2,}" }, { task: "Use the pumping lemma to prove {a^n b^n | n≥0} is not regular.", hint: "Assume regular, choose w = a^p b^p, show pumping creates unequal counts." }] },
  { title: "Context-Free Grammars", theory: "Context-Free Grammars (CFG) generate context-free languages, which are more expressive than regular languages. A CFG has variables (non-terminals), terminals, productions, and a start symbol.\n\nDerivations: leftmost (expand leftmost non-terminal first) and rightmost. Parse trees visualize derivations. Ambiguous grammars have multiple parse trees for some string. Chomsky Normal Form (CNF): all productions are A → BC or A → a. CNF enables the CYK parsing algorithm (O(n³)).", keyPoints: ["CFG: V → w where V is a variable, w is a string of variables and terminals", "Generates context-free languages (CFLs)", "Ambiguous: multiple parse trees for same string", "CNF: A → BC or A → a (useful for CYK algorithm)", "CFLs include balanced parentheses, palindromes"], handsOn: [{ task: "Write a CFG for the language {a^n b^n | n ≥ 1} and derive a sample string.", hint: "S → aSb | ab. Derive: S ⇒ aSb ⇒ aaSbb ⇒ aaabbb." }, { task: "Convert a CFG to Chomsky Normal Form.", hint: "Eliminate ε-productions, unit productions, then convert long/mixed productions." }] },
  { title: "Pushdown Automata", theory: "Pushdown Automata (PDA) extend finite automata with a stack, enabling them to recognize context-free languages. The stack provides memory for counting and matching nested structures.\n\nA PDA can push, pop, or read the stack on each transition. Acceptance by final state or empty stack. Non-deterministic PDAs (NPDA) are more powerful than deterministic PDAs (DPDA) — unlike FA where NFA = DFA. Every CFG has an equivalent PDA and vice versa. DPDAs recognize a strict subset of CFLs (deterministic CFLs).", keyPoints: ["PDA = FA + stack (infinite memory, LIFO access)", "Transition: (state, input, stack_top) → (new_state, stack_push)", "NPDA is strictly more powerful than DPDA", "Every CFG ↔ equivalent NPDA", "Can recognize {a^n b^n}, balanced parentheses"], handsOn: [{ task: "Design a PDA that accepts {a^n b^n | n ≥ 0}.", hint: "Push 'a' for each a; pop 'a' for each b; accept when stack is empty." }, { task: "Construct a PDA for balanced parentheses and trace an example.", hint: "Push '(' on seeing '('; pop on ')'; accept if stack empty at end." }] },
  { title: "Turing Machines", theory: "A Turing Machine (TM) is the most powerful computational model. It has an infinite tape, a read/write head, and a finite control. It can move left or right, read, write, and change state.\n\nTMs recognize recursively enumerable languages and decide recursive (decidable) languages. A TM can simulate any computer algorithm (Church-Turing thesis). Variants: multi-tape, non-deterministic (same power as deterministic), universal TM (simulates any other TM). The Universal TM is the theoretical basis for stored-program computers.", keyPoints: ["Infinite tape + read/write head + finite control", "Most powerful model of computation", "Church-Turing thesis: anything computable can be computed by a TM", "Multi-tape TM = single-tape TM (in power)", "Universal TM simulates any other TM"], handsOn: [{ task: "Design a Turing Machine that accepts {w#w | w ∈ {0,1}*} (string matching).", hint: "Mark and match symbols one by one across the #; accept if all matched." }, { task: "Simulate a simple Turing Machine that increments a binary number.", hint: "Move to rightmost bit; if 1, change to 0 and carry left; if 0, change to 1 and halt." }] },
  { title: "Decidability", theory: "A language is decidable if there exists a TM that halts on every input and correctly accepts/rejects. A language is recognizable (recursively enumerable) if a TM accepts all strings in the language (but may loop on non-members).\n\nThe Halting Problem is undecidable: no TM can determine whether an arbitrary TM halts on a given input (proved by diagonalization). Rice's theorem: any non-trivial property of TM languages is undecidable. Reducibility: proving undecidability by reducing a known undecidable problem to a new one.", keyPoints: ["Decidable: TM halts and answers correctly on ALL inputs", "Recognizable: TM accepts members, may loop on non-members", "Halting Problem: undecidable (diagonal argument)", "Rice's theorem: non-trivial language properties are undecidable", "Reduction: A ≤ B means if B is decidable, so is A"], handsOn: [{ task: "Prove the Halting Problem is undecidable using diagonalization.", hint: "Assume a decider H exists; construct a machine D that contradicts H on input <D>." }, { task: "Use reduction to prove that determining if a TM accepts the empty string is undecidable.", hint: "Reduce from the Halting Problem: build a TM that erases input and runs M on w." }] },
  { title: "Complexity Classes (P, NP)", theory: "Complexity theory classifies problems by the resources (time, space) needed to solve them. P: problems solvable in polynomial time by a deterministic TM. NP: problems verifiable in polynomial time (or solvable in polynomial time by a non-deterministic TM).\n\nP ⊆ NP (every P problem is in NP). The P vs NP question: is P = NP? NP-Complete problems are the hardest in NP — if any NPC problem is in P, then P = NP. NP-Hard: at least as hard as NPC. Cook-Levin theorem: SAT is NP-Complete. Common NPC: TSP, 3-SAT, Vertex Cover, Clique, Knapsack.", keyPoints: ["P: polynomial-time solvable", "NP: polynomial-time verifiable", "NP-Complete: hardest problems in NP", "P = NP? Greatest open question in CS", "Cook-Levin: SAT is the first NP-Complete problem"], handsOn: [{ task: "Show that a problem is in NP by describing a polynomial-time verifier.", hint: "Given a certificate (proposed solution), verify it in polynomial time." }, { task: "Reduce 3-SAT to Independent Set to prove IS is NP-Complete.", hint: "Create a node per literal per clause; add edges within clauses and between contradictions." }] },
  { title: "Reductions", theory: "A reduction transforms one problem into another, preserving the answer. If problem A reduces to problem B, then B is at least as hard as A. Polynomial-time reductions (Karp reductions) are used for NP-completeness proofs.\n\nMapping reduction: transform input of A to input of B such that x ∈ A iff f(x) ∈ B. To prove a problem NPC: 1) Show it's in NP, 2) Reduce a known NPC problem to it. Common reduction chains: SAT → 3-SAT → Clique → Vertex Cover → Independent Set. Reductions also prove undecidability.", keyPoints: ["A ≤_p B: A reduces to B in polynomial time", "If A ≤_p B and B ∈ P, then A ∈ P", "NPC proof: show NP + reduce from known NPC", "Mapping reduction: f(x) computable in poly time", "Common chain: SAT → 3-SAT → various problems"], handsOn: [{ task: "Reduce Vertex Cover to Independent Set.", hint: "Complement: S is a vertex cover iff V-S is an independent set." }, { task: "Prove Hamiltonian Path is NP-Complete by reducing from Hamiltonian Cycle.", hint: "For each edge (u,v), create a graph where HP exists iff HC exists minus that edge." }] }
];

export const softwareEngineeringTopics: TopicContent[] = [
  { title: "SDLC Models", theory: "The Software Development Life Cycle defines phases for software creation: Requirements → Design → Implementation → Testing → Deployment → Maintenance. Different models organize these phases differently.\n\nWaterfall: sequential, each phase completes before the next. V-Model: testing parallels development. Iterative: repeated cycles. Spiral: risk-driven, combines iterative with systematic aspects. RAD: rapid prototyping. Choosing the right model depends on requirements stability, team size, and project risk.", keyPoints: ["Waterfall: sequential, good for stable requirements", "V-Model: each dev phase has a corresponding test phase", "Spiral: risk analysis at each iteration", "Iterative: deliver in increments, get feedback", "RAD: rapid prototyping for quick delivery"], handsOn: [{ task: "Compare Waterfall and Agile for a banking application vs a startup MVP.", hint: "Banking: stable requirements, regulatory compliance → Waterfall. Startup: changing requirements → Agile." }, { task: "Create a project plan using the Spiral model with risk assessment for each phase.", hint: "Each spiral: objectives → risk analysis → development → plan next iteration." }] },
  { title: "Agile & Scrum", theory: "Agile is an iterative approach emphasizing flexibility, collaboration, and customer feedback. The Agile Manifesto values: individuals over processes, working software over documentation, collaboration over contracts, responding to change over following a plan.\n\nScrum is a popular Agile framework with roles (Product Owner, Scrum Master, Dev Team), ceremonies (Sprint Planning, Daily Standup, Sprint Review, Retrospective), and artifacts (Product Backlog, Sprint Backlog, Increment). Sprints are 1-4 week iterations delivering potentially shippable increments.", keyPoints: ["Sprint: time-boxed iteration (1-4 weeks)", "Product Owner: prioritizes backlog", "Scrum Master: facilitates, removes blockers", "Daily standup: 15-min sync (what I did, will do, blockers)", "Velocity: points completed per sprint"], handsOn: [{ task: "Create a product backlog with user stories for a task management app.", hint: "Format: 'As a [user], I want [feature] so that [benefit]'. Prioritize by business value." }, { task: "Plan a 2-week sprint by selecting stories from the backlog based on team velocity.", hint: "If velocity is 30 points, select stories totaling ~30 story points." }] },
  { title: "Requirements Engineering", theory: "Requirements engineering captures, analyzes, specifies, validates, and manages software requirements. Functional requirements describe what the system does; non-functional requirements describe quality attributes (performance, security, usability).\n\nTechniques: interviews, surveys, use cases, user stories, prototyping. Requirements documentation: SRS (Software Requirements Specification). Requirements traceability ensures each requirement is addressed in design, implementation, and testing. Changing requirements is the #1 cause of project failure.", keyPoints: ["Functional: what the system does", "Non-functional: how well it does it (performance, security)", "Use cases describe user interactions with the system", "SRS: formal requirements documentation", "Traceability: track requirements through all phases"], handsOn: [{ task: "Write an SRS document for a food delivery application.", hint: "Include: introduction, functional requirements, non-functional requirements, use case diagrams." }, { task: "Identify and classify requirements for an online exam system as functional or non-functional.", hint: "Functional: login, submit exam. Non-functional: response time < 2s, support 1000 concurrent users." }] },
  { title: "System Design", theory: "System design translates requirements into a blueprint for implementation. High-Level Design (HLD) defines system architecture, components, and their interactions. Low-Level Design (LLD) details each component's internal workings.\n\nArchitectural patterns: Monolithic, Client-Server, Microservices, Event-Driven, Layered. Design decisions include: data flow, API design, database schema, caching strategy, load balancing, and fault tolerance. Document designs with architecture diagrams, API specifications, and database schemas.", keyPoints: ["HLD: system-level architecture and component interaction", "LLD: detailed component design with classes/methods", "Monolithic vs Microservices trade-offs", "API design: REST, GraphQL, gRPC", "Consider scalability, reliability, and maintainability"], handsOn: [{ task: "Design the architecture for a URL shortener service.", hint: "Components: API server, database (key-value), redirect service. Consider: hash function, collision handling." }, { task: "Create a low-level design for a notification service with email, SMS, and push.", hint: "Use Strategy pattern for notification types; queue for async delivery." }] },
  { title: "Testing Strategies", theory: "Software testing verifies that software meets requirements and is free of defects. Testing levels: Unit (individual functions), Integration (component interactions), System (complete system), Acceptance (user validates).\n\nTesting types: Functional, Performance, Security, Usability, Regression. Test-Driven Development (TDD): write tests before code. White-box testing examines internal structure; black-box testing examines external behavior. Code coverage metrics: statement, branch, path, condition coverage.", keyPoints: ["Unit tests: fast, isolated, test individual functions", "Integration tests: verify component interactions", "TDD: Red → Green → Refactor cycle", "Code coverage: statement, branch, path", "Regression tests prevent reintroduction of bugs"], codeExample: { language: "python", code: `import unittest\n\ndef calculate_discount(price, discount_percent):\n    if price < 0 or discount_percent < 0:\n        raise ValueError("Negative values not allowed")\n    if discount_percent > 100:\n        raise ValueError("Discount cannot exceed 100%")\n    return price * (1 - discount_percent / 100)\n\nclass TestDiscount(unittest.TestCase):\n    def test_normal_discount(self):\n        self.assertAlmostEqual(calculate_discount(100, 20), 80.0)\n    \n    def test_zero_discount(self):\n        self.assertEqual(calculate_discount(100, 0), 100)\n    \n    def test_full_discount(self):\n        self.assertEqual(calculate_discount(100, 100), 0)\n    \n    def test_negative_price(self):\n        with self.assertRaises(ValueError):\n            calculate_discount(-10, 20)\n    \n    def test_over_100_discount(self):\n        with self.assertRaises(ValueError):\n            calculate_discount(100, 150)`, explanation: "Unit tests with edge cases — testing normal, boundary, and error conditions." }, handsOn: [{ task: "Write unit tests for a shopping cart with add, remove, and total calculation.", hint: "Test: empty cart, add items, remove items, quantity updates, price calculation." }, { task: "Create an integration test for a user registration flow (validate → save → email).", hint: "Mock the email service; verify the user is saved and email is triggered." }] },
  { title: "Version Control (Git)", theory: "Version control systems track changes to code over time, enabling collaboration, branching, and rollback. Git is distributed — every developer has a full repository copy.\n\nKey concepts: commits (snapshots), branches (parallel development), merging (combining branches), rebasing (linear history). Branching strategies: Git Flow (feature/release/hotfix branches), GitHub Flow (feature branches + main), Trunk-Based (short-lived branches). Pull/Merge Requests enable code review before merging.", keyPoints: ["Git is distributed — full repo on every machine", "Branch: independent line of development", "Merge vs Rebase: merge preserves history; rebase linearizes", "Git Flow: develop, feature, release, hotfix branches", "Conventional commits improve changelog generation"], handsOn: [{ task: "Practice resolving a merge conflict between two branches.", hint: "Create conflicting changes on same file/line in two branches; git merge and resolve markers." }, { task: "Set up a Git Flow workflow with feature and release branches.", hint: "Main branch + develop branch; feature branches off develop; release branches for versioning." }] },
  { title: "CI/CD", theory: "Continuous Integration (CI) automatically builds and tests code on every commit. Continuous Delivery (CD) automates deployment to staging; Continuous Deployment goes to production automatically.\n\nCI/CD pipelines: Build → Test → Analyze → Deploy. Tools: GitHub Actions, Jenkins, GitLab CI, CircleCI. Pipeline stages include linting, unit tests, integration tests, security scanning, and deployment. Infrastructure as Code (IaC) with Terraform/Ansible automates environment setup. Blue-green and canary deployments minimize risk.", keyPoints: ["CI: automatic build and test on every commit", "CD: automatic deployment to staging or production", "Pipeline: build → test → analyze → deploy", "Blue-green: two identical environments, switch traffic", "Feature flags: deploy code without enabling features"], handsOn: [{ task: "Write a GitHub Actions workflow for a Node.js app (lint, test, build, deploy).", hint: "Use .github/workflows/ci.yml with jobs for each stage; use actions/checkout and actions/setup-node." }, { task: "Set up a CI pipeline that runs tests and blocks merging if tests fail.", hint: "Configure branch protection rules requiring status checks to pass before merge." }] },
  { title: "Code Review", theory: "Code review is the practice of examining code changes before merging. It improves code quality, shares knowledge, catches bugs, and ensures consistency. Pull/Merge Requests are the standard mechanism.\n\nBest practices: keep changes small and focused, provide context in PR descriptions, review promptly, be constructive, automate style checks (linters). Review checklist: correctness, edge cases, security, performance, readability, test coverage. Pair programming is real-time code review.", keyPoints: ["PRs should be small, focused, and well-described", "Review for: correctness, readability, security, performance", "Automate: linting, formatting, test runs", "Constructive feedback: suggest improvements, explain why", "Pair programming: continuous real-time review"], handsOn: [{ task: "Review a sample PR and identify bugs, style issues, and missing tests.", hint: "Check edge cases, error handling, naming conventions, and test coverage." }, { task: "Create a code review checklist for your team.", hint: "Include: logic correctness, error handling, security (SQL injection, XSS), tests, documentation." }] },
  { title: "Documentation", theory: "Documentation records system design, API contracts, usage instructions, and decision rationale. Good documentation reduces onboarding time, prevents knowledge silos, and improves maintainability.\n\nTypes: README (project overview), API docs (endpoints, parameters, responses), Architecture Decision Records (ADRs), inline comments, tutorials, and changelogs. Tools: Swagger/OpenAPI for API docs, JSDoc/Javadoc for code docs, Markdown for prose. Documentation-as-code: store docs alongside code, version together.", keyPoints: ["README: first file every developer reads", "API docs: endpoints, parameters, responses, examples", "ADRs: record why decisions were made", "Document the WHY, not just the WHAT", "Keep docs close to code; update together"], handsOn: [{ task: "Write comprehensive API documentation for a REST API with OpenAPI/Swagger.", hint: "Define paths, methods, parameters, request/response schemas, and examples." }, { task: "Create an Architecture Decision Record for choosing between SQL and NoSQL.", hint: "Context, decision, status, consequences format. Compare for the specific use case." }] }
];

export const computerOrgTopics: TopicContent[] = [
  { title: "Number Representation", theory: "Computers represent data in binary. Integer representations: unsigned (all positive), sign-magnitude, one's complement, two's complement (most common — supports arithmetic naturally). Floating-point follows IEEE 754: sign bit + exponent + mantissa.\n\nTwo's complement range for n bits: -2^(n-1) to 2^(n-1)-1. IEEE 754 single precision: 1 sign + 8 exponent + 23 mantissa bits. Overflow occurs when result exceeds representable range. BCD (Binary Coded Decimal) represents each decimal digit separately.", keyPoints: ["Two's complement: most used signed integer representation", "IEEE 754: standard for floating-point (single: 32-bit, double: 64-bit)", "Overflow: result exceeds max representable value", "Endianness: big-endian vs little-endian byte ordering", "BCD: each decimal digit encoded in 4 bits"], handsOn: [{ task: "Convert between decimal, binary, octal, and hexadecimal number systems.", hint: "Binary ↔ Decimal: positional notation. Binary ↔ Hex: group by 4 bits." }, { task: "Represent -37 in 8-bit two's complement and perform binary addition.", hint: "37 = 00100101; invert: 11011010; add 1: 11011011." }] },
  { title: "ALU Design", theory: "The Arithmetic Logic Unit performs all arithmetic (add, subtract, multiply, divide) and logical (AND, OR, NOT, XOR) operations. It's the computational core of the processor.\n\nAdder circuits: half adder (2 inputs), full adder (3 inputs with carry-in), ripple-carry adder (chain of full adders, slow carry propagation), carry-lookahead adder (fast, parallel carry computation). Multiplication uses shift-and-add (Booth's algorithm for signed). Division uses restoring or non-restoring algorithms.", keyPoints: ["Half adder: sum = A XOR B, carry = A AND B", "Full adder: adds carry-in for multi-bit addition", "Carry-lookahead: parallel carry computation for speed", "Booth's algorithm: efficient signed multiplication", "ALU control signals select the operation"], handsOn: [{ task: "Design a 4-bit ripple carry adder using full adders.", hint: "Chain 4 full adders; carry-out of each feeds carry-in of next." }, { task: "Perform multiplication using Booth's algorithm for two signed numbers.", hint: "Check last two bits: 10 subtract, 01 add, 00/11 shift. Repeat n times." }] },
  { title: "Processor Design", theory: "The processor executes instructions through the fetch-decode-execute cycle. The datapath includes: Program Counter (PC), Instruction Register (IR), ALU, Register File, and Memory interface.\n\nControl unit generates signals to coordinate datapath components. Single-cycle: each instruction completes in one clock cycle (simple but slow — clock = slowest instruction). Multi-cycle: instructions take variable cycles (faster clock, more complex control). MIPS is a common teaching architecture.", keyPoints: ["Fetch → Decode → Execute → Memory → Write-back", "Datapath: PC, IR, ALU, registers, memory", "Control unit: hardwired (fast) or microprogrammed (flexible)", "Single-cycle: simple but clock limited by slowest instruction", "Multi-cycle: variable cycles, faster clock"], handsOn: [{ task: "Trace the execution of an R-type MIPS instruction through the datapath.", hint: "Fetch from PC; decode opcode + registers; ALU computes; write result to register." }, { task: "Design the control signals for basic MIPS instructions (add, lw, sw, beq).", hint: "Create a truth table: opcode → RegWrite, MemRead, MemWrite, ALUOp, Branch signals." }] },
  { title: "Pipelining", theory: "Pipelining overlaps execution of multiple instructions, improving throughput. The classic 5-stage pipeline: Instruction Fetch (IF), Instruction Decode (ID), Execute (EX), Memory Access (MEM), Write Back (WB).\n\nHazards reduce pipeline efficiency: Data hazards (dependency between instructions), Control hazards (branches), Structural hazards (resource conflicts). Solutions: forwarding/bypassing, stalling, branch prediction, delayed branches. Speedup approaches n (number of stages) for ideal pipelines.", keyPoints: ["5 stages: IF → ID → EX → MEM → WB", "Data hazard: RAW, WAR, WAW dependencies", "Forwarding: bypass results to earlier stages", "Branch prediction: speculate on branch outcome", "Pipeline speedup ≈ number of stages (ideal)"], handsOn: [{ task: "Identify data hazards in a sequence of MIPS instructions and apply forwarding.", hint: "Check if any instruction reads a register written by a recent instruction." }, { task: "Calculate pipeline speedup and efficiency for a given instruction mix.", hint: "Speedup = time_sequential / time_pipelined. Account for stalls." }] },
  { title: "Memory Hierarchy", theory: "Memory hierarchy balances speed, cost, and capacity: Registers (fastest, smallest) → Cache → Main Memory (RAM) → Secondary Storage (SSD/HDD). Programs exhibit locality of reference — temporal (reuse) and spatial (nearby access).\n\nThe principle of locality makes caching effective. Hit ratio = hits / (hits + misses). Average access time = hit_time + miss_rate × miss_penalty. Virtual memory extends physical memory using disk. Memory technologies: SRAM (cache), DRAM (main memory), Flash (SSD).", keyPoints: ["Hierarchy: Registers → L1 → L2 → L3 → RAM → SSD → HDD", "Temporal locality: recently accessed data likely accessed again", "Spatial locality: nearby data likely accessed soon", "Hit rate determines effective access time", "SRAM: fast, expensive (cache); DRAM: slower, cheaper (main memory)"], handsOn: [{ task: "Calculate average memory access time given hit rates and access times for each level.", hint: "AMAT = L1_time + L1_miss × (L2_time + L2_miss × RAM_time)." }, { task: "Analyze a memory access pattern and predict cache hit rate.", hint: "Track which addresses are in cache; sequential access has good spatial locality." }] },
  { title: "Cache Memory", theory: "Cache stores frequently accessed data close to the CPU. Mapping policies determine where a block can be placed: Direct-mapped (one location), Fully associative (any location), Set-associative (k locations in a set).\n\nReplacement policies: LRU (most common), FIFO, Random. Write policies: Write-through (write to cache + memory) vs Write-back (write to cache, update memory on eviction). Cache coherence in multiprocessor systems: MESI protocol. Cache size, block size, and associativity affect performance.", keyPoints: ["Direct-mapped: fast lookup, more conflicts", "Set-associative: balance between direct and fully associative", "LRU replacement: evict least recently used block", "Write-back: better performance, more complex", "Cache coherence: MESI protocol for multiprocessors"], handsOn: [{ task: "Simulate a direct-mapped cache with given address stream and compute hit rate.", hint: "Block address = address / block_size; cache index = block_address % num_blocks." }, { task: "Compare direct-mapped vs 2-way set-associative for the same address stream.", hint: "Set-associative: index into set, check both ways; LRU on miss." }] },
  { title: "I/O Organization", theory: "I/O organization handles data transfer between the CPU and peripheral devices. Methods: Programmed I/O (CPU polls device status), Interrupt-driven I/O (device interrupts CPU when ready), DMA (device transfers directly to/from memory).\n\nBus architecture connects components: data bus, address bus, control bus. Bus arbitration handles multiple devices requesting the bus. I/O interfaces: parallel (multiple bits simultaneously) vs serial (one bit at a time). Common buses: PCI Express, USB, SATA.", keyPoints: ["Programmed I/O: CPU busy-waits (wastes cycles)", "Interrupt-driven: CPU handles other work until interrupt", "DMA: device accesses memory directly (minimal CPU involvement)", "Bus: shared communication pathway", "PCI Express: high-speed serial interconnect"], handsOn: [{ task: "Calculate data transfer time for different I/O methods given device speed and bus bandwidth.", hint: "DMA: transfer_time = data_size / bus_bandwidth + setup overhead." }, { task: "Design an interrupt priority system for multiple devices.", hint: "Assign priorities; higher-priority interrupts can preempt lower-priority handlers." }] },
  { title: "RISC vs CISC", theory: "RISC (Reduced Instruction Set Computer) uses simple, fixed-length instructions executing in one cycle. CISC (Complex Instruction Set Computer) uses variable-length instructions with complex operations.\n\nRISC: ARM, MIPS, RISC-V — load/store architecture, many registers, pipelining-friendly. CISC: x86 — fewer registers, complex addressing modes, variable instruction length. Modern x86 processors internally translate CISC to RISC-like micro-operations. RISC-V is an open-source ISA gaining traction.", keyPoints: ["RISC: simple instructions, fixed length, load/store architecture", "CISC: complex instructions, variable length, memory operands", "RISC: easier to pipeline, more registers", "Modern x86: CISC externally, RISC internally (micro-ops)", "RISC-V: open-source ISA, growing ecosystem"], handsOn: [{ task: "Compare the instruction count and CPI for RISC vs CISC implementations of the same task.", hint: "RISC: more instructions, lower CPI. CISC: fewer instructions, higher CPI." }, { task: "Write a simple program in MIPS assembly and analyze its pipeline behavior.", hint: "Use: add, sub, lw, sw, beq. Check for data and control hazards." }] },
  { title: "Assembly Basics", theory: "Assembly language is a human-readable representation of machine code. Each instruction maps directly to a machine instruction. Understanding assembly is crucial for performance optimization, debugging, and security analysis.\n\nMIPS assembly is commonly taught: R-type (register operations), I-type (immediate/memory), J-type (jumps). Registers: $0-$31 with conventions ($t0-$t9 temporaries, $s0-$s7 saved, $a0-$a3 arguments, $v0-$v1 return values, $sp stack pointer, $ra return address). System calls for I/O in simulation.", keyPoints: ["Each assembly instruction = one machine operation", "MIPS registers: 32 general-purpose ($0-$31)", "R-type: add $t0, $t1, $t2", "I-type: lw $t0, 0($sp), addi $t0, $t1, 5", "J-type: j label, jal function"], codeExample: { language: "c", code: `# MIPS Assembly: Sum array elements\n# $a0 = array address, $a1 = array length\n# $v0 = result (sum)\nsum_array:\n    li    $v0, 0          # sum = 0\n    li    $t0, 0          # i = 0\nloop:\n    bge   $t0, $a1, done  # if i >= n, exit\n    sll   $t1, $t0, 2     # offset = i * 4\n    add   $t1, $a0, $t1   # addr = base + offset\n    lw    $t2, 0($t1)     # load arr[i]\n    add   $v0, $v0, $t2   # sum += arr[i]\n    addi  $t0, $t0, 1     # i++\n    j     loop\ndone:\n    jr    $ra              # return`, explanation: "MIPS assembly function summing an integer array — demonstrates loops, memory access, and register conventions." }, handsOn: [{ task: "Write MIPS assembly to find the maximum value in an array.", hint: "Initialize max with first element; loop through, compare each with max, update if larger." }, { task: "Implement a recursive factorial function in MIPS assembly.", hint: "Use stack: push $ra and $a0 before recursive call, pop after return." }] }
];
