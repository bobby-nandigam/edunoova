export interface DesignStep {
  title: string;
  description: string;
  details: string[];
}

export interface DesignTopic {
  id: string;
  title: string;
  subtitle: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: "HLD" | "LLD" | "Both";
  estimatedTime: string;
  tags: string[];
  overview: string;
  requirements: string[];
  hld?: {
    steps: DesignStep[];
    components: string[];
    diagram: string; // text-based architecture description
  };
  lld?: {
    steps: DesignStep[];
    classes: { name: string; responsibilities: string[] }[];
    patterns: string[];
  };
  scaleConsiderations: string[];
  interviewTips: string[];
}

export const systemDesignTopics: DesignTopic[] = [
  {
    id: "url-shortener",
    title: "URL Shortener",
    subtitle: "Design TinyURL with analytics, rate limiting & caching",
    difficulty: "Medium",
    type: "Both",
    estimatedTime: "45 min",
    tags: ["Hashing", "Caching", "NoSQL", "Analytics"],
    overview: "Design a service like TinyURL or bit.ly that shortens long URLs and redirects users. Must handle billions of URLs, provide analytics, and operate with minimal latency.",
    requirements: [
      "Given a URL, generate a shorter unique alias",
      "Redirect short URL to original URL",
      "Custom short links (optional)",
      "Analytics: click count, geographic data, referrers",
      "Expiration time for links",
      "High availability and low latency"
    ],
    hld: {
      steps: [
        {
          title: "1. Capacity Estimation",
          description: "Estimate read/write ratio and storage needs",
          details: [
            "Assume 500M new URLs/month → ~200 URLs/sec writes",
            "Read:Write ratio = 100:1 → 20K reads/sec",
            "Each URL entry ~500 bytes → 500M × 500B × 5 years = 1.5 TB",
            "Cache: 20% of daily traffic → ~170 GB RAM"
          ]
        },
        {
          title: "2. API Design",
          description: "Define RESTful endpoints",
          details: [
            "POST /api/shorten { url, custom_alias?, expiry? } → { short_url }",
            "GET /:short_code → 301 Redirect to original URL",
            "GET /api/analytics/:short_code → { clicks, geo, referrers }",
            "DELETE /api/:short_code → Remove shortened URL"
          ]
        },
        {
          title: "3. Database Schema",
          description: "Choose storage and define schema",
          details: [
            "NoSQL (DynamoDB/Cassandra) for key-value lookups",
            "Table: urls { short_code PK, original_url, user_id, created_at, expires_at }",
            "Table: analytics { short_code, timestamp, ip, user_agent, referrer }",
            "Index on short_code for O(1) lookups"
          ]
        },
        {
          title: "4. Short URL Generation",
          description: "Algorithm to generate unique short codes",
          details: [
            "Base62 encoding (a-z, A-Z, 0-9) → 6 chars = 56.8B combinations",
            "Approach 1: Counter-based with Zookeeper for distributed IDs",
            "Approach 2: MD5/SHA256 hash → take first 6 chars + collision check",
            "Approach 3: Pre-generate keys in a Key Generation Service (KGS)"
          ]
        },
        {
          title: "5. System Architecture",
          description: "High-level component design",
          details: [
            "Load Balancer → Application Servers (stateless)",
            "Application Server → Cache (Redis) → Database",
            "Key Generation Service for unique IDs",
            "Analytics Pipeline: Kafka → Stream Processor → Analytics DB",
            "CDN for static content and redirect caching"
          ]
        },
        {
          title: "6. Caching Strategy",
          description: "Reduce database load with intelligent caching",
          details: [
            "Redis/Memcached for hot URLs (LRU eviction)",
            "Cache-aside pattern: check cache → DB on miss → populate cache",
            "80-20 rule: 20% URLs generate 80% traffic",
            "TTL-based expiration aligned with URL expiry"
          ]
        }
      ],
      components: ["Load Balancer", "App Servers", "Redis Cache", "NoSQL DB", "Key Generation Service", "Analytics Pipeline", "CDN"],
      diagram: "Client → DNS → Load Balancer → App Servers → Redis Cache → NoSQL DB\n                                    ↓\n                           Key Generation Service\n                                    ↓\n                           Analytics (Kafka → Processor → DB)"
    },
    lld: {
      steps: [
        {
          title: "1. Core Classes",
          description: "Define object-oriented structure",
          details: [
            "URLShortener: main service class with shorten() and redirect() methods",
            "URLEntry: data class holding original URL, short code, metadata",
            "KeyGenerator: interface for pluggable key generation strategies",
            "AnalyticsCollector: tracks clicks and aggregates data"
          ]
        },
        {
          title: "2. Design Patterns",
          description: "Apply appropriate patterns",
          details: [
            "Strategy Pattern: different key generation algorithms",
            "Observer Pattern: analytics collection on redirect",
            "Factory Pattern: create URL entries with validation",
            "Singleton: database connection pool"
          ]
        },
        {
          title: "3. Interface Design",
          description: "Define contracts between components",
          details: [
            "IKeyGenerator { generate(url: string): string }",
            "IURLStore { save(entry: URLEntry): void; get(code: string): URLEntry }",
            "IAnalytics { record(event: ClickEvent): void; getStats(code: string): Stats }",
            "ICacheProvider { get(key: string): string; set(key: string, val: string, ttl: number): void }"
          ]
        }
      ],
      classes: [
        { name: "URLShortenerService", responsibilities: ["Orchestrate shorten/redirect flow", "Validate URLs", "Handle custom aliases"] },
        { name: "Base62KeyGenerator", responsibilities: ["Generate base62 encoded keys", "Handle collisions", "Ensure uniqueness"] },
        { name: "URLEntry", responsibilities: ["Store URL data", "Track expiration", "Hold metadata"] },
        { name: "AnalyticsService", responsibilities: ["Record click events", "Aggregate statistics", "Generate reports"] },
        { name: "CacheManager", responsibilities: ["LRU cache management", "TTL-based eviction", "Cache warming"] }
      ],
      patterns: ["Strategy", "Observer", "Factory", "Singleton", "Cache-Aside"]
    },
    scaleConsiderations: [
      "Database partitioning by hash of short_code",
      "Read replicas for redirect traffic",
      "Geo-distributed cache nodes",
      "Rate limiting per user/IP",
      "Async analytics processing to avoid redirect latency"
    ],
    interviewTips: [
      "Start with requirements clarification — ask about scale",
      "Back-of-envelope calculations impress interviewers",
      "Discuss trade-offs between consistency and availability",
      "Mention monitoring: latency p99, cache hit ratio, error rates"
    ]
  },
  {
    id: "chat-application",
    title: "Chat Application",
    subtitle: "Real-time messaging with WebSockets, presence & delivery receipts",
    difficulty: "Hard",
    type: "Both",
    estimatedTime: "60 min",
    tags: ["WebSockets", "Message Queue", "Presence", "E2E Encryption"],
    overview: "Design a real-time chat application like WhatsApp or Slack supporting 1-on-1 and group messaging, online presence, delivery/read receipts, and message history.",
    requirements: [
      "1-on-1 and group messaging",
      "Real-time message delivery via WebSockets",
      "Online/offline presence indicators",
      "Delivery and read receipts",
      "Message history and search",
      "File/image sharing",
      "End-to-end encryption (optional)"
    ],
    hld: {
      steps: [
        {
          title: "1. Communication Protocol",
          description: "Choose real-time communication method",
          details: [
            "WebSockets for persistent bidirectional connections",
            "Long polling as fallback for restricted networks",
            "MQTT for mobile (lower battery usage)",
            "Connection gateway to manage WebSocket lifecycle"
          ]
        },
        {
          title: "2. Message Flow",
          description: "How messages travel from sender to receiver",
          details: [
            "Sender → WebSocket Gateway → Message Service → Message Queue",
            "Queue → Fan-out to recipient(s) WebSocket connections",
            "If recipient offline → Push Notification Service",
            "Store in Message DB for history retrieval"
          ]
        },
        {
          title: "3. Storage Design",
          description: "Persist messages efficiently",
          details: [
            "Cassandra/HBase for message storage (write-heavy, time-series)",
            "Partition by conversation_id for locality",
            "Redis for recent messages cache & presence",
            "S3/Blob storage for media files"
          ]
        },
        {
          title: "4. Group Messaging",
          description: "Handle group chat fan-out",
          details: [
            "Small groups (<100): fan-out on write — push to each member's queue",
            "Large groups (100+): fan-out on read — recipients pull from group queue",
            "Group metadata stored separately with member list",
            "Admin operations: add/remove members, change group settings"
          ]
        },
        {
          title: "5. Presence System",
          description: "Track online/offline status",
          details: [
            "Heartbeat-based: clients send ping every 30s",
            "Redis hash: user_id → {status, last_seen, device}",
            "Presence updates broadcast to contacts via pub/sub",
            "Graceful offline detection with 60s timeout"
          ]
        }
      ],
      components: ["WebSocket Gateway", "Message Service", "Kafka/RabbitMQ", "Cassandra", "Redis", "Push Notification", "Media Storage", "Presence Service"],
      diagram: "Clients ↔ WebSocket Gateway ↔ Message Service → Kafka\n                                  ↕              ↓\n                           Presence (Redis)   Cassandra + S3"
    },
    lld: {
      steps: [
        {
          title: "1. Message Model",
          description: "Define message data structures",
          details: [
            "Message { id, sender_id, conversation_id, content, type, timestamp, status }",
            "MessageStatus enum: SENT, DELIVERED, READ",
            "MediaMessage extends Message with { media_url, thumbnail, size }",
            "Conversation { id, type (1-1/group), participants[], last_message }"
          ]
        },
        {
          title: "2. WebSocket Handler",
          description: "Manage client connections",
          details: [
            "ConnectionManager: map of user_id → WebSocket connections",
            "Handle multiple devices per user",
            "Message serialization/deserialization (Protobuf for efficiency)",
            "Reconnection logic with message gap detection"
          ]
        },
        {
          title: "3. Delivery Pipeline",
          description: "Ensure reliable message delivery",
          details: [
            "At-least-once delivery with client-side deduplication",
            "Message ordering guaranteed per conversation (sequence numbers)",
            "Retry queue for failed deliveries",
            "Acknowledgment protocol: server ACK → delivery receipt → read receipt"
          ]
        }
      ],
      classes: [
        { name: "ChatService", responsibilities: ["Send/receive messages", "Create conversations", "Manage participants"] },
        { name: "WebSocketManager", responsibilities: ["Connection lifecycle", "Message routing", "Heartbeat monitoring"] },
        { name: "MessageStore", responsibilities: ["Persist messages", "Retrieve history", "Search messages"] },
        { name: "PresenceTracker", responsibilities: ["Track online status", "Broadcast presence changes", "Handle timeouts"] },
        { name: "NotificationService", responsibilities: ["Push notifications", "Email fallback", "Notification preferences"] }
      ],
      patterns: ["Observer", "Pub/Sub", "Command", "Mediator", "Strategy"]
    },
    scaleConsiderations: [
      "Shard WebSocket gateways by geographic region",
      "Message queue partitioning by conversation_id",
      "Separate read/write paths for message storage",
      "Connection pooling and sticky sessions",
      "Media processing pipeline with CDN delivery"
    ],
    interviewTips: [
      "Clarify: 1-on-1 only or groups? Scale of users?",
      "WebSocket vs polling — explain trade-offs clearly",
      "Discuss consistency model for message ordering",
      "End-to-end encryption adds complexity — mention Signal Protocol"
    ]
  },
  {
    id: "e-commerce-platform",
    title: "E-Commerce Platform",
    subtitle: "Product catalog, cart, payments, inventory & order management",
    difficulty: "Hard",
    type: "HLD",
    estimatedTime: "60 min",
    tags: ["Microservices", "Payment", "Inventory", "Search"],
    overview: "Design a scalable e-commerce platform like Amazon handling product catalog, search, shopping cart, checkout, payments, and order fulfillment.",
    requirements: [
      "Product catalog with categories and search",
      "Shopping cart with session persistence",
      "Checkout and payment processing",
      "Inventory management with stock tracking",
      "Order management and tracking",
      "Recommendations engine",
      "Seller dashboard"
    ],
    hld: {
      steps: [
        {
          title: "1. Microservices Architecture",
          description: "Decompose into bounded contexts",
          details: [
            "Product Service: catalog, categories, product details",
            "Search Service: Elasticsearch for full-text + faceted search",
            "Cart Service: session-based cart with Redis",
            "Order Service: order lifecycle management",
            "Payment Service: payment gateway integration",
            "Inventory Service: stock tracking with reservation"
          ]
        },
        {
          title: "2. Product Search",
          description: "Fast, relevant product discovery",
          details: [
            "Elasticsearch for full-text search with relevance scoring",
            "Faceted search: price, brand, rating, category filters",
            "Autocomplete with prefix matching",
            "CDC pipeline: DB changes → Kafka → Elasticsearch indexer"
          ]
        },
        {
          title: "3. Cart & Checkout",
          description: "Shopping flow design",
          details: [
            "Cart stored in Redis (logged-in) or cookies (guest)",
            "Cart merge on login (guest cart + user cart)",
            "Checkout: validate inventory → calculate pricing → create order → process payment",
            "Saga pattern for distributed transaction across services"
          ]
        },
        {
          title: "4. Inventory Management",
          description: "Prevent overselling and manage stock",
          details: [
            "Soft reservation during checkout (TTL-based hold)",
            "Optimistic locking for concurrent stock updates",
            "Warehouse-level inventory tracking",
            "Reorder alerts and supplier integration"
          ]
        },
        {
          title: "5. Payment Processing",
          description: "Secure payment handling",
          details: [
            "Integration with Stripe/PayPal via payment gateway",
            "PCI DSS compliance — never store card details",
            "Idempotency keys for retry-safe payments",
            "Webhook-based async payment confirmation"
          ]
        }
      ],
      components: ["API Gateway", "Product Service", "Search (ES)", "Cart (Redis)", "Order Service", "Payment Service", "Inventory Service", "Kafka", "CDN"],
      diagram: "Client → API Gateway → Product/Search/Cart/Order/Payment Services\n                          ↕\n                   Kafka Event Bus\n                          ↕\n              PostgreSQL + Elasticsearch + Redis"
    },
    scaleConsiderations: [
      "Database per service (polyglot persistence)",
      "Event-driven architecture with Kafka",
      "CQRS for read-heavy product catalog",
      "Circuit breaker for payment service calls",
      "Flash sale handling: queue-based purchase flow"
    ],
    interviewTips: [
      "Focus on one or two services in depth rather than all",
      "Discuss data consistency across microservices (Saga vs 2PC)",
      "Mention monitoring: order success rate, payment failures",
      "Address flash sale / high-traffic scenarios"
    ]
  },
  {
    id: "rate-limiter",
    title: "Rate Limiter",
    subtitle: "Token bucket, sliding window, distributed rate limiting",
    difficulty: "Medium",
    type: "Both",
    estimatedTime: "35 min",
    tags: ["Algorithms", "Redis", "Middleware", "Distributed"],
    overview: "Design a rate limiting system that controls the rate of requests a client can send to an API. Support multiple algorithms and distributed deployment.",
    requirements: [
      "Limit requests per client (by IP, API key, or user ID)",
      "Support multiple rate limiting algorithms",
      "Distributed rate limiting across multiple servers",
      "Return appropriate headers (X-RateLimit-Remaining, Retry-After)",
      "Configurable rules per endpoint",
      "Minimal latency overhead"
    ],
    hld: {
      steps: [
        {
          title: "1. Algorithms",
          description: "Choose the right rate limiting algorithm",
          details: [
            "Token Bucket: tokens added at fixed rate, consumed per request. Allows bursts.",
            "Leaky Bucket: requests processed at fixed rate. Smooths traffic.",
            "Fixed Window: count requests in fixed time windows. Simple but has edge spikes.",
            "Sliding Window Log: track each request timestamp. Most accurate, more memory.",
            "Sliding Window Counter: hybrid of fixed window + sliding. Good balance."
          ]
        },
        {
          title: "2. Architecture",
          description: "Where rate limiting happens",
          details: [
            "Option A: API Gateway level (centralized, simple)",
            "Option B: Middleware in each service (flexible, per-endpoint rules)",
            "Option C: Sidecar proxy (service mesh, e.g., Envoy)",
            "Centralized counter store: Redis for atomic operations"
          ]
        },
        {
          title: "3. Distributed Counting",
          description: "Synchronized rate limiting across nodes",
          details: [
            "Redis INCR + EXPIRE for atomic counter management",
            "Lua scripts for compound operations (check + increment atomically)",
            "Race condition handling: Redis transactions or Lua scripting",
            "Sticky sessions as alternative (less accurate, simpler)"
          ]
        },
        {
          title: "4. Rules Engine",
          description: "Configurable rate limit policies",
          details: [
            "Rules config: { endpoint, client_type, limit, window, algorithm }",
            "Tiered limits: free tier = 100/min, premium = 1000/min",
            "Per-endpoint overrides: /api/search = 10/sec, /api/upload = 5/min",
            "Dynamic rule updates without restart"
          ]
        }
      ],
      components: ["API Gateway", "Rate Limiter Middleware", "Redis", "Rules Config Store", "Monitoring"],
      diagram: "Client → API Gateway → Rate Limiter (check Redis) → App Server\n                              ↓ (if exceeded)\n                        429 Too Many Requests"
    },
    lld: {
      steps: [
        {
          title: "1. Core Interface",
          description: "Define the rate limiter contract",
          details: [
            "IRateLimiter { isAllowed(clientId: string, endpoint: string): RateLimitResult }",
            "RateLimitResult { allowed: boolean, remaining: number, retryAfter?: number }",
            "RateLimitRule { endpoint: string, maxRequests: number, windowMs: number, algorithm: Algorithm }",
            "Algorithm enum: TOKEN_BUCKET, LEAKY_BUCKET, SLIDING_WINDOW, FIXED_WINDOW"
          ]
        },
        {
          title: "2. Token Bucket Implementation",
          description: "Implement the most common algorithm",
          details: [
            "Bucket { tokens: number, lastRefillTime: timestamp, capacity: number, refillRate: number }",
            "On request: refill tokens based on elapsed time → check if tokens > 0 → consume",
            "Thread-safe: use atomic operations or locks",
            "Memory efficient: only store bucket state per client"
          ]
        },
        {
          title: "3. Middleware Integration",
          description: "Plug into request pipeline",
          details: [
            "Express/Fastify middleware: before route handler",
            "Extract client identifier from request (IP, auth token, API key)",
            "Set response headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset",
            "Return 429 with Retry-After header on limit exceeded"
          ]
        }
      ],
      classes: [
        { name: "RateLimiter", responsibilities: ["Check request allowance", "Apply configured rules", "Return rate limit metadata"] },
        { name: "TokenBucket", responsibilities: ["Manage token count", "Auto-refill based on time", "Thread-safe token consumption"] },
        { name: "SlidingWindowCounter", responsibilities: ["Track request counts per window", "Calculate weighted count", "Handle window transitions"] },
        { name: "RuleEngine", responsibilities: ["Load/reload rules from config", "Match rules to requests", "Support rule priorities"] },
        { name: "RedisStore", responsibilities: ["Atomic counter operations", "Distributed state management", "Lua script execution"] }
      ],
      patterns: ["Strategy", "Template Method", "Chain of Responsibility", "Decorator"]
    },
    scaleConsiderations: [
      "Redis cluster for high availability",
      "Local cache + sync for reduced Redis calls",
      "Graceful degradation: allow traffic if Redis is down",
      "Rate limit by multiple dimensions (IP + user + endpoint)"
    ],
    interviewTips: [
      "Know all algorithms and their trade-offs by heart",
      "Discuss the race condition problem in distributed systems",
      "Mention the 'thundering herd' problem at window boundaries",
      "Talk about monitoring: track how many requests get rate-limited"
    ]
  },
  {
    id: "notification-system",
    title: "Notification System",
    subtitle: "Multi-channel push, email, SMS with priority & batching",
    difficulty: "Medium",
    type: "HLD",
    estimatedTime: "40 min",
    tags: ["Message Queue", "Templates", "Priority", "Multi-channel"],
    overview: "Design a notification system that delivers messages across multiple channels (push, email, SMS, in-app) with priority handling, rate limiting, and user preferences.",
    requirements: [
      "Multi-channel: push, email, SMS, in-app",
      "User notification preferences",
      "Template-based notifications",
      "Priority levels (critical, high, normal, low)",
      "Delivery tracking and retry",
      "Rate limiting to prevent notification fatigue"
    ],
    hld: {
      steps: [
        {
          title: "1. Event Ingestion",
          description: "How notification requests enter the system",
          details: [
            "REST API for direct notification triggers",
            "Event-driven: subscribe to domain events (order placed, payment received)",
            "Kafka consumer groups for reliable event processing",
            "Idempotency: deduplicate based on event_id + recipient"
          ]
        },
        {
          title: "2. Processing Pipeline",
          description: "Notification processing workflow",
          details: [
            "1. Receive event → 2. Load user preferences → 3. Select channels",
            "4. Render template → 5. Route to channel queues → 6. Deliver",
            "Priority queues: critical notifications skip batching",
            "Batching: aggregate low-priority notifications (digest emails)"
          ]
        },
        {
          title: "3. Channel Adapters",
          description: "Integrate with delivery providers",
          details: [
            "Push: FCM (Android), APNs (iOS), Web Push API",
            "Email: SendGrid, SES — with HTML template rendering",
            "SMS: Twilio, MessageBird — keep under 160 chars",
            "In-app: WebSocket push or polling API"
          ]
        },
        {
          title: "4. Delivery Tracking",
          description: "Ensure notifications reach users",
          details: [
            "Track status: PENDING → SENT → DELIVERED → READ",
            "Retry with exponential backoff for failed deliveries",
            "Dead letter queue for permanently failed notifications",
            "Webhooks from providers for delivery confirmation"
          ]
        }
      ],
      components: ["API Gateway", "Notification Service", "Kafka", "Template Engine", "Channel Adapters", "Preference Store", "Tracking DB"],
      diagram: "Events → Kafka → Notification Service → Channel Queues → Adapters → Providers\n                         ↕                    ↕\n                  User Preferences       Tracking DB"
    },
    scaleConsiderations: [
      "Separate queues per channel for independent scaling",
      "Template caching with cache invalidation",
      "Rate limiting per user per channel",
      "Geo-aware delivery (timezone-based scheduling)",
      "A/B testing for notification content"
    ],
    interviewTips: [
      "Emphasize reliability — notifications must not be lost",
      "Discuss user preference handling and opt-out compliance (GDPR)",
      "Mention the trade-off between real-time and batched delivery",
      "Talk about notification fatigue and smart suppression"
    ]
  },
  {
    id: "parking-lot",
    title: "Parking Lot System",
    subtitle: "OOP design, state management, pricing strategies",
    difficulty: "Easy",
    type: "LLD",
    estimatedTime: "30 min",
    tags: ["OOP", "State Machine", "Strategy Pattern", "SOLID"],
    overview: "Design an object-oriented parking lot system that manages parking spots, vehicles, ticketing, and payment. Classic LLD interview question.",
    requirements: [
      "Multiple floors with different spot sizes (compact, regular, large)",
      "Support different vehicle types (motorcycle, car, truck)",
      "Ticket generation on entry",
      "Payment calculation based on duration",
      "Display available spots per floor/type",
      "Entry/exit gate management"
    ],
    lld: {
      steps: [
        {
          title: "1. Identify Core Objects",
          description: "Map real-world entities to classes",
          details: [
            "ParkingLot: top-level singleton managing the entire facility",
            "ParkingFloor: collection of spots on a floor",
            "ParkingSpot: individual spot with size and availability",
            "Vehicle: base class (Car, Truck, Motorcycle subclasses)",
            "Ticket: issued on entry, tracks vehicle + spot + entry time",
            "Payment: calculates fee based on duration and vehicle type"
          ]
        },
        {
          title: "2. Spot Assignment Strategy",
          description: "How to assign the best spot to a vehicle",
          details: [
            "Strategy Pattern: NearestToEntrance, NearestToElevator, FirstAvailable",
            "Vehicle-to-spot matching: motorcycle → compact, car → regular, truck → large",
            "Spot availability tracked via bitmask or queue per type",
            "Thread-safe assignment with optimistic locking"
          ]
        },
        {
          title: "3. Pricing Model",
          description: "Calculate parking fees",
          details: [
            "Strategy Pattern for different pricing: flat rate, hourly, progressive",
            "HourlyPricing: $2/hr for first 3 hrs, $3/hr after",
            "WeekendPricing: 1.5x multiplier on weekends",
            "Subscription/monthly pass support"
          ]
        },
        {
          title: "4. State Management",
          description: "Track parking lot state changes",
          details: [
            "Spot states: AVAILABLE → OCCUPIED → RESERVED",
            "Observer Pattern: notify display boards on state change",
            "Entry/exit gates as state machines: OPEN → PROCESSING → CLOSED",
            "Capacity tracking per floor and per spot type"
          ]
        }
      ],
      classes: [
        { name: "ParkingLot", responsibilities: ["Manage floors and gates", "Track total capacity", "Singleton instance"] },
        { name: "ParkingFloor", responsibilities: ["Manage spots on floor", "Track floor availability", "Display board updates"] },
        { name: "ParkingSpot", responsibilities: ["Hold vehicle reference", "Track availability state", "Match vehicle type"] },
        { name: "Vehicle (abstract)", responsibilities: ["Store license plate", "Define vehicle type", "Required spot size"] },
        { name: "ParkingTicket", responsibilities: ["Track entry time", "Reference assigned spot", "Calculate duration"] },
        { name: "PaymentProcessor", responsibilities: ["Calculate fee", "Process payment method", "Generate receipt"] }
      ],
      patterns: ["Singleton", "Strategy", "Observer", "Factory Method", "State"]
    },
    scaleConsiderations: [
      "Not a distributed system — focus on clean OOP design",
      "Thread safety for concurrent entry/exit",
      "Extensibility for new vehicle types or pricing models",
      "Integration with payment gateways"
    ],
    interviewTips: [
      "Start with core entities — don't overcomplicate",
      "Show SOLID principles: single responsibility, open/closed",
      "Draw a class diagram before coding",
      "Discuss extensibility: 'If we add EV charging spots...'"
    ]
  },
  {
    id: "distributed-cache",
    title: "Distributed Cache",
    subtitle: "Redis-like cache with eviction, replication & consistency",
    difficulty: "Hard",
    type: "Both",
    estimatedTime: "50 min",
    tags: ["Consistent Hashing", "Replication", "Eviction", "Partitioning"],
    overview: "Design a distributed caching system like Redis or Memcached that provides sub-millisecond lookups, supports eviction policies, and scales horizontally.",
    requirements: [
      "Key-value storage with TTL support",
      "Multiple eviction policies (LRU, LFU, FIFO)",
      "Horizontal scaling with data partitioning",
      "Replication for high availability",
      "Sub-millisecond read latency",
      "Atomic operations (INCR, CAS)"
    ],
    hld: {
      steps: [
        {
          title: "1. Data Partitioning",
          description: "Distribute data across nodes",
          details: [
            "Consistent hashing with virtual nodes for even distribution",
            "Hash ring: keys mapped to nearest clockwise node",
            "Virtual nodes: each physical node owns multiple positions on ring",
            "Rebalancing on node add/remove: only K/N keys need to move"
          ]
        },
        {
          title: "2. Replication",
          description: "Ensure data availability",
          details: [
            "Leader-follower: writes go to leader, reads from any replica",
            "Replication factor N: store copies on N successive nodes on hash ring",
            "Async replication for performance (eventual consistency)",
            "Sync replication for critical data (strong consistency)"
          ]
        },
        {
          title: "3. Eviction Policies",
          description: "Handle memory limits",
          details: [
            "LRU (Least Recently Used): doubly linked list + hashmap → O(1)",
            "LFU (Least Frequently Used): min-heap or frequency buckets",
            "TTL-based: lazy deletion on access + periodic cleanup thread",
            "Configurable per cache namespace"
          ]
        },
        {
          title: "4. Client-Side",
          description: "Smart client for optimal routing",
          details: [
            "Client maintains hash ring topology",
            "Direct routing to correct shard (skip proxy)",
            "Connection pooling to each cache node",
            "Automatic retry + failover to replica on node failure"
          ]
        }
      ],
      components: ["Cache Nodes", "Hash Ring / Coordinator", "Replication Manager", "Client Library", "Config Service (ZooKeeper)", "Monitoring"],
      diagram: "Client (hash ring) → Cache Node (primary) → Replicas\n                    ↕\n              ZooKeeper (topology)"
    },
    lld: {
      steps: [
        {
          title: "1. LRU Cache Implementation",
          description: "Core data structure for LRU eviction",
          details: [
            "Doubly linked list: move accessed items to head, evict from tail",
            "HashMap<Key, Node>: O(1) lookup",
            "Node { key, value, prev, next, expiry }",
            "get(): move to head, check expiry; put(): add to head, evict if full"
          ]
        },
        {
          title: "2. Consistent Hash Ring",
          description: "Implement partitioning logic",
          details: [
            "SortedMap<Integer, Node> to represent the ring",
            "Hash function: MD5 or MurmurHash for uniform distribution",
            "addNode(): insert virtual nodes → redistribute affected keys",
            "getNode(key): find ceiling entry in sorted map"
          ]
        },
        {
          title: "3. Concurrency",
          description: "Thread-safe cache operations",
          details: [
            "Read-write locks: multiple readers, exclusive writers",
            "Striped locking: partition lock space by key hash",
            "CAS (Compare-And-Swap) for atomic updates",
            "Lock-free reads with volatile/atomic references"
          ]
        }
      ],
      classes: [
        { name: "CacheNode", responsibilities: ["Store key-value pairs", "Apply eviction policy", "Handle TTL expiry"] },
        { name: "LRUEvictionPolicy", responsibilities: ["Track access order", "Evict least recent", "O(1) operations"] },
        { name: "ConsistentHashRing", responsibilities: ["Map keys to nodes", "Handle virtual nodes", "Rebalance on topology change"] },
        { name: "ReplicationManager", responsibilities: ["Sync data to replicas", "Handle failover", "Consistency level enforcement"] },
        { name: "CacheClient", responsibilities: ["Route to correct shard", "Connection pooling", "Retry and failover logic"] }
      ],
      patterns: ["Strategy", "Proxy", "Observer", "Template Method"]
    },
    scaleConsiderations: [
      "Hot key problem: replicate hot keys to multiple nodes",
      "Cache stampede: use locking or probabilistic early expiration",
      "Memory management: jemalloc or slab allocation",
      "Network partition handling: split-brain resolution"
    ],
    interviewTips: [
      "Implement LRU cache from scratch — very common coding question",
      "Explain consistent hashing with a clear diagram",
      "Discuss CAP theorem trade-offs for your design",
      "Mention real-world: Redis Cluster, Memcached, Hazelcast"
    ]
  },
  {
    id: "video-streaming",
    title: "Video Streaming Platform",
    subtitle: "CDN, adaptive bitrate, transcoding & recommendations",
    difficulty: "Hard",
    type: "HLD",
    estimatedTime: "55 min",
    tags: ["CDN", "Transcoding", "Adaptive Bitrate", "Storage"],
    overview: "Design a video streaming platform like YouTube or Netflix handling video upload, transcoding, storage, adaptive streaming, and recommendations.",
    requirements: [
      "Video upload and processing pipeline",
      "Adaptive bitrate streaming (multiple qualities)",
      "CDN for global low-latency delivery",
      "Video recommendations",
      "Comments, likes, and subscriptions",
      "Live streaming support"
    ],
    hld: {
      steps: [
        {
          title: "1. Upload Pipeline",
          description: "Handle large video file uploads",
          details: [
            "Resumable uploads: chunked upload with client-side tracking",
            "Upload to object storage (S3) via pre-signed URLs",
            "Metadata extraction: duration, resolution, codec",
            "Trigger transcoding pipeline on upload complete"
          ]
        },
        {
          title: "2. Transcoding",
          description: "Convert videos to multiple formats and qualities",
          details: [
            "FFmpeg-based transcoding workers (GPU-accelerated)",
            "Output: 240p, 360p, 480p, 720p, 1080p, 4K",
            "HLS (HTTP Live Streaming) or DASH segmentation",
            "Generate thumbnails and preview sprites",
            "Parallel processing: split video → transcode segments → merge"
          ]
        },
        {
          title: "3. Content Delivery",
          description: "Serve videos globally with low latency",
          details: [
            "CDN with edge caching (CloudFront, Akamai)",
            "Adaptive Bitrate (ABR): client switches quality based on bandwidth",
            "Manifest file (m3u8/mpd) lists available qualities and segments",
            "Pre-warming CDN cache for trending content"
          ]
        },
        {
          title: "4. Recommendation Engine",
          description: "Personalized video suggestions",
          details: [
            "Collaborative filtering: users who watched X also watched Y",
            "Content-based: match video metadata (tags, category, description)",
            "Real-time signals: watch time, likes, shares, skips",
            "ML pipeline: feature extraction → model training → serving"
          ]
        }
      ],
      components: ["Upload Service", "Object Storage (S3)", "Transcoding Workers", "CDN", "Metadata DB", "Search (ES)", "Recommendation Engine", "Analytics"],
      diagram: "Upload → S3 → Transcoding Queue → Workers → S3 (processed)\n                                                    ↓\n                                              CDN Edge Nodes\n                                                    ↓\n                                                 Clients"
    },
    scaleConsiderations: [
      "Storage costs: tiered storage (hot/warm/cold) based on video popularity",
      "Transcoding queue prioritization: popular creators first",
      "CDN cost optimization: cache hit ratio monitoring",
      "Database sharding by creator_id or region",
      "Live streaming: WebRTC or RTMP ingest → HLS output"
    ],
    interviewTips: [
      "Focus on the transcoding pipeline — it's unique to this problem",
      "Explain adaptive bitrate streaming in detail",
      "Discuss cost optimization — storage and CDN are major expenses",
      "Mention content moderation and copyright detection"
    ]
  },
  {
    id: "search-autocomplete",
    title: "Search Autocomplete",
    subtitle: "Trie-based suggestions with ranking & personalization",
    difficulty: "Medium",
    type: "Both",
    estimatedTime: "40 min",
    tags: ["Trie", "Ranking", "Caching", "Real-time"],
    overview: "Design a search autocomplete/typeahead system that provides real-time suggestions as users type, with ranking based on popularity and personalization.",
    requirements: [
      "Real-time suggestions as user types (< 100ms latency)",
      "Rank suggestions by popularity/relevance",
      "Support personalized suggestions",
      "Handle typos with fuzzy matching",
      "Scale to billions of queries per day",
      "Update suggestions based on trending queries"
    ],
    hld: {
      steps: [
        {
          title: "1. Data Collection",
          description: "Gather and process search queries",
          details: [
            "Log all search queries with timestamp and user context",
            "Aggregation pipeline: raw logs → hourly/daily frequency counts",
            "Filter: remove offensive content, very rare queries, bot traffic",
            "Decay function: recent queries weighted more than old ones"
          ]
        },
        {
          title: "2. Trie Construction",
          description: "Build the suggestion data structure",
          details: [
            "Trie with each node storing top-K suggestions for that prefix",
            "Pre-compute: at each node, store sorted list of (query, score) pairs",
            "Update: rebuild trie periodically (every few hours) from aggregated data",
            "Compression: merge single-child nodes (Patricia/Radix trie)"
          ]
        },
        {
          title: "3. Serving Architecture",
          description: "Low-latency suggestion serving",
          details: [
            "Trie stored in memory across multiple servers",
            "Partition by first character or character range",
            "Two-level cache: browser cache (short TTL) + CDN cache",
            "Zookeeper for trie server discovery and health checks"
          ]
        },
        {
          title: "4. Ranking",
          description: "Order suggestions by relevance",
          details: [
            "Base score: query frequency with time decay",
            "Personalization boost: user's past searches, location, language",
            "Trending boost: queries with sudden frequency increase",
            "Final score = base × personalization × freshness"
          ]
        }
      ],
      components: ["Query Log Collector", "Aggregation Pipeline", "Trie Builder", "Trie Servers", "CDN/Cache", "Personalization Service"],
      diagram: "User Types → CDN Cache → Trie Server (in-memory) → Ranked Results\n                             ↑\n              Aggregator → Trie Builder (periodic rebuild)"
    },
    lld: {
      steps: [
        {
          title: "1. Trie Implementation",
          description: "Core data structure",
          details: [
            "TrieNode { children: Map<char, TrieNode>, topSuggestions: List<(query, score)>, isEnd: boolean }",
            "insert(query, score): traverse/create nodes, update topK at each node",
            "search(prefix): traverse to prefix node, return topSuggestions",
            "Space optimization: use array[26] instead of HashMap for lowercase"
          ]
        },
        {
          title: "2. Top-K Maintenance",
          description: "Efficiently maintain top suggestions per node",
          details: [
            "Min-heap of size K at each node",
            "On insert: if score > heap.min, replace and heapify",
            "Pre-sorted results: no sorting needed at query time → O(1) retrieval",
            "K typically 5-10 suggestions"
          ]
        },
        {
          title: "3. Fuzzy Matching",
          description: "Handle typos in user input",
          details: [
            "Edit distance (Levenshtein) for 1-2 character typos",
            "BK-tree for efficient fuzzy search",
            "Phonetic matching (Soundex/Metaphone) for similar-sounding words",
            "Combine exact prefix matches with fuzzy matches, prioritize exact"
          ]
        }
      ],
      classes: [
        { name: "Trie", responsibilities: ["Insert queries with scores", "Prefix search", "Memory-efficient storage"] },
        { name: "TrieNode", responsibilities: ["Store children", "Maintain top-K suggestions", "Track end-of-word"] },
        { name: "RankingEngine", responsibilities: ["Compute relevance scores", "Apply personalization", "Time decay weighting"] },
        { name: "QueryAggregator", responsibilities: ["Count query frequencies", "Apply time decay", "Filter inappropriate content"] },
        { name: "AutocompleteService", responsibilities: ["Handle search requests", "Cache management", "A/B test different rankings"] }
      ],
      patterns: ["Strategy", "Builder", "Observer", "Flyweight"]
    },
    scaleConsiderations: [
      "Shard trie by prefix range across servers",
      "Pre-compute and cache hot prefixes at CDN level",
      "Separate online (serving) and offline (building) systems",
      "A/B testing different ranking algorithms"
    ],
    interviewTips: [
      "Implement a basic Trie in the interview — common coding followup",
      "Discuss the offline vs online split clearly",
      "Explain how to handle trending queries (real-time updates)",
      "Mention privacy concerns with personalized suggestions"
    ]
  },
  {
    id: "social-media-feed",
    title: "Social Media Feed",
    subtitle: "News feed ranking, fan-out strategies & content moderation",
    difficulty: "Hard",
    type: "HLD",
    estimatedTime: "55 min",
    tags: ["Fan-out", "Ranking", "Graph DB", "Timeline"],
    overview: "Design a social media news feed like Twitter or Instagram that aggregates content from followed users, ranks by relevance, and delivers in real-time.",
    requirements: [
      "Users can post content (text, images, videos)",
      "Follow/unfollow other users",
      "Personalized feed ranked by relevance",
      "Real-time feed updates",
      "Support for likes, comments, shares",
      "Content moderation and spam detection"
    ],
    hld: {
      steps: [
        {
          title: "1. Fan-out Strategy",
          description: "How posts reach followers' feeds",
          details: [
            "Fan-out on Write: when user posts, push to all followers' feed caches",
            "Fan-out on Read: when user opens feed, pull from all followed users",
            "Hybrid: fan-out on write for regular users, fan-out on read for celebrities",
            "Celebrity threshold: users with >10K followers use pull model"
          ]
        },
        {
          title: "2. Feed Ranking",
          description: "Order posts by relevance, not just recency",
          details: [
            "Features: recency, engagement (likes/comments), user affinity, content type",
            "ML model: predict probability of engagement for each post",
            "Diversity: avoid showing too many posts from same user",
            "Chronological option for users who prefer it"
          ]
        },
        {
          title: "3. Storage Architecture",
          description: "Store posts and social graph efficiently",
          details: [
            "Posts: sharded by user_id in PostgreSQL/MySQL",
            "Social graph: adjacency list in Redis or Neo4j",
            "Feed cache: Redis sorted set per user (score = ranking score)",
            "Media: S3 + CDN for images and videos"
          ]
        },
        {
          title: "4. Real-time Updates",
          description: "Push new posts to active users",
          details: [
            "WebSocket connections for active users",
            "New post notification via pub/sub",
            "Optimistic UI: show post immediately, sync in background",
            "Polling fallback for users without WebSocket support"
          ]
        }
      ],
      components: ["Post Service", "Feed Service", "Social Graph (Redis/Neo4j)", "Feed Cache (Redis)", "Ranking Service", "CDN", "Kafka", "Moderation Service"],
      diagram: "Post Created → Kafka → Fan-out Service → Feed Caches (Redis)\n                                          ↓\n                        Feed Request → Ranking Service → Client"
    },
    scaleConsiderations: [
      "Celebrity handling: lazy evaluation for high-follower users",
      "Feed cache invalidation and TTL management",
      "Sharding social graph by user_id",
      "Content moderation pipeline: ML-based + human review",
      "Geo-distributed feed caches"
    ],
    interviewTips: [
      "The fan-out discussion is the KEY part — know it cold",
      "Discuss hybrid approach and why it's needed",
      "Mention the cold start problem for new users",
      "Talk about feed diversity and filter bubbles"
    ]
  },
  {
    id: "load-balancer",
    title: "Load Balancer",
    subtitle: "Algorithms, health checks, L4 vs L7, sticky sessions",
    difficulty: "Medium",
    type: "Both",
    estimatedTime: "40 min",
    tags: ["Networking", "Algorithms", "Health Checks", "SSL"],
    overview: "Design a load balancer that distributes incoming traffic across multiple backend servers with health monitoring, session affinity, and SSL termination.",
    requirements: [
      "Distribute traffic across backend servers",
      "Multiple balancing algorithms (round robin, least connections, weighted)",
      "Health checks with automatic server removal/addition",
      "Session affinity (sticky sessions)",
      "SSL termination",
      "L4 (transport) and L7 (application) load balancing"
    ],
    hld: {
      steps: [
        {
          title: "1. L4 vs L7",
          description: "Choose the right layer for load balancing",
          details: [
            "L4 (Transport): route by IP/port, faster, no content inspection",
            "L7 (Application): route by URL/header/cookie, smarter, more overhead",
            "L4 for raw throughput (TCP/UDP), L7 for HTTP routing and caching",
            "Often combined: L4 in front distributing to L7 balancers"
          ]
        },
        {
          title: "2. Algorithms",
          description: "Traffic distribution strategies",
          details: [
            "Round Robin: simple, equal distribution, ignores server load",
            "Weighted Round Robin: assign weights based on server capacity",
            "Least Connections: route to server with fewest active connections",
            "IP Hash: consistent routing for same client (natural sticky sessions)",
            "Least Response Time: route to fastest responding server"
          ]
        },
        {
          title: "3. Health Monitoring",
          description: "Detect and handle unhealthy servers",
          details: [
            "Active health checks: periodic HTTP/TCP pings to each backend",
            "Passive health checks: monitor response errors/timeouts",
            "Configurable thresholds: mark unhealthy after N consecutive failures",
            "Graceful removal: drain connections before removing server"
          ]
        },
        {
          title: "4. High Availability",
          description: "Make the load balancer itself resilient",
          details: [
            "Active-passive: standby LB takes over on primary failure (VRRP)",
            "Active-active: DNS round robin or Anycast to multiple LBs",
            "Shared state: sync session tables between LB instances",
            "Floating IP / VIP for seamless failover"
          ]
        }
      ],
      components: ["Virtual IP", "L4 Balancer", "L7 Balancer", "Health Checker", "Session Store", "SSL Terminator", "Backend Servers"],
      diagram: "Client → DNS → Virtual IP → L4 LB → L7 LBs → Backend Servers\n                                          ↕\n                                    Health Checker"
    },
    lld: {
      steps: [
        {
          title: "1. Core Components",
          description: "Object model for the load balancer",
          details: [
            "LoadBalancer: main class coordinating routing and health",
            "Server: represents a backend with address, weight, health status",
            "HealthChecker: runs periodic checks and updates server status",
            "Router: applies the selected algorithm to pick a server"
          ]
        },
        {
          title: "2. Algorithm Implementations",
          description: "Pluggable routing strategies",
          details: [
            "IRoutingAlgorithm { selectServer(servers: Server[], request: Request): Server }",
            "RoundRobinRouter: atomic counter % server count",
            "LeastConnectionsRouter: min-heap by active connection count",
            "WeightedRouter: expand server list by weight, then round robin"
          ]
        },
        {
          title: "3. Connection Management",
          description: "Handle client-to-backend connections",
          details: [
            "Connection pool per backend server",
            "Keep-alive management for persistent connections",
            "Timeout handling: connect, read, write timeouts",
            "Circuit breaker: stop routing to failing server temporarily"
          ]
        }
      ],
      classes: [
        { name: "LoadBalancer", responsibilities: ["Accept incoming connections", "Route to backend", "Manage configuration"] },
        { name: "ServerPool", responsibilities: ["Track available servers", "Handle server weights", "Thread-safe server list"] },
        { name: "HealthChecker", responsibilities: ["Periodic health probes", "Mark servers up/down", "Configurable check intervals"] },
        { name: "RoundRobinRouter", responsibilities: ["Cycle through servers", "Skip unhealthy servers", "Atomic counter management"] },
        { name: "SessionManager", responsibilities: ["Sticky session mapping", "Session timeout handling", "Cookie-based affinity"] }
      ],
      patterns: ["Strategy", "Observer", "Circuit Breaker", "Proxy", "Singleton"]
    },
    scaleConsiderations: [
      "LB itself can be a bottleneck — scale with DNS + Anycast",
      "SSL termination is CPU-intensive — use hardware acceleration",
      "Connection limits: tune OS-level file descriptor limits",
      "Geographic load balancing with DNS-based routing"
    ],
    interviewTips: [
      "Clearly distinguish L4 vs L7 — interviewers love this",
      "Know the algorithms and when to use each",
      "Discuss how to make the LB itself highly available",
      "Mention real-world: Nginx, HAProxy, AWS ALB/NLB"
    ]
  },
  {
    id: "file-storage",
    title: "File Storage (Dropbox)",
    subtitle: "Chunking, deduplication, sync & conflict resolution",
    difficulty: "Hard",
    type: "HLD",
    estimatedTime: "55 min",
    tags: ["Chunking", "Sync", "Dedup", "Conflict Resolution"],
    overview: "Design a cloud file storage and sync service like Dropbox or Google Drive supporting file upload, sync across devices, sharing, and collaboration.",
    requirements: [
      "File upload and download",
      "Sync files across multiple devices",
      "File versioning and history",
      "Sharing and collaboration",
      "Offline access with eventual sync",
      "Efficient storage with deduplication"
    ],
    hld: {
      steps: [
        {
          title: "1. File Chunking",
          description: "Break files into manageable pieces",
          details: [
            "Split files into 4MB chunks for efficient transfer",
            "Content-defined chunking (Rabin fingerprint) for better dedup",
            "Each chunk identified by SHA-256 hash",
            "Only upload changed chunks on file modification"
          ]
        },
        {
          title: "2. Sync Protocol",
          description: "Keep files consistent across devices",
          details: [
            "Client maintains local file index with chunk hashes",
            "On change: compute diff → upload new/modified chunks → update metadata",
            "Server notifies other clients via long-polling or WebSocket",
            "Conflict detection: compare version vectors"
          ]
        },
        {
          title: "3. Storage Architecture",
          description: "Store files efficiently at scale",
          details: [
            "Chunk storage: S3 or distributed block storage",
            "Metadata DB: file tree, permissions, versions (PostgreSQL)",
            "Deduplication: if chunk hash exists, skip upload (save 30-50% storage)",
            "Tiered storage: hot (SSD) for recent, cold (S3 Glacier) for old versions"
          ]
        },
        {
          title: "4. Conflict Resolution",
          description: "Handle concurrent edits",
          details: [
            "Last-writer-wins for simple files (with version backup)",
            "Operational Transform or CRDT for collaborative editing",
            "Conflict file created when auto-merge isn't possible",
            "User prompted to manually resolve conflicts"
          ]
        }
      ],
      components: ["Desktop Client", "API Gateway", "Metadata Service", "Block Storage (S3)", "Sync Service", "Notification Service", "Queue (Kafka)"],
      diagram: "Client (chunker) → API → Metadata Service → PostgreSQL\n                    ↓\n              Block Store (S3) — deduplicated chunks\n                    ↓\n        Sync Service → Notify other clients via WebSocket"
    },
    scaleConsiderations: [
      "Deduplication saves 30-50% storage costs",
      "Content-defined chunking improves dedup rate over fixed-size",
      "Metadata DB sharding by user_id",
      "Global edge locations for upload/download acceleration",
      "Bandwidth optimization: delta sync (rsync-like)"
    ],
    interviewTips: [
      "Chunking + deduplication is the KEY insight — explain thoroughly",
      "Discuss the sync protocol step by step",
      "Mention conflict resolution strategies clearly",
      "Talk about offline support and eventual consistency"
    ]
  }
];

export const getTopicById = (id: string): DesignTopic | undefined =>
  systemDesignTopics.find((t) => t.id === id);
