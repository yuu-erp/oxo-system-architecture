# 🏛️ Kiến trúc tổng thể OXO

## Thành phần chính

1. **Frontend (Next.js)**

   - Render UI (SSR + CSR).
   - Gọi API qua API Gateway.
   - Sử dụng WebSocket/SSE cho realtime notification.

2. **API Gateway (Nginx/Envoy/Kong)**

   - Entry point cho toàn bộ request.
   - Xác thực JWT/API Key.
   - Rate limiting cơ bản.
   - Route đến các microservice.

3. **Backend Microservices (NestJS)**

   - **Auth Service**: login/signup, OAuth2, JWT, refresh token.
   - **User Service**: quản lý profile.
   - **Post Service**: CRUD post, media upload (S3/MinIO).
   - **Feed Service**: tổng hợp timeline, cache Redis.
   - **Notification Service**: WebSocket/SSE, event push.
   - **Search Service**: full-text/ElasticSearch.

4. **Infra layer**
   - **Database**: PostgreSQL (partitioned tables).
   - **Cache/Queue**: Redis (cache feed, session) + BullMQ/Kafka (event bus).
   - **Object Storage**: S3/MinIO (ảnh/video).
   - **Observability**: Prometheus + Grafana + ELK.
   - **CI/CD**: GitHub Actions/GitLab CI → Docker → Kubernetes.

---

## Sơ đồ kiến trúc (Mermaid)

```mermaid
flowchart LR
    subgraph Client
        B[Browser / Next.js Frontend]
    end

    subgraph Gateway
        G[API Gateway (Nginx/Envoy)]
    end

    subgraph Services
        A[Auth Service]
        U[User Service]
        P[Post Service]
        F[Feed Service]
        N[Notification Service]
        S[Search Service]
    end

    subgraph Infra
        DB[(PostgreSQL)]
        R[(Redis)]
        Q[(Kafka/BullMQ)]
        M[(S3/MinIO)]
        E[(ElasticSearch)]
    end

    B -->|HTTP/WS| G
    G --> A
    G --> U
    G --> P
    G --> F
    G --> N
    G --> S

    P --> DB
    U --> DB
    F --> R
    P --> Q
    F --> Q
    N --> Q
    N --> R
    S --> E
    P --> M
```
