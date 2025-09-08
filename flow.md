# OXO System Architecture - Tổng thể

## 1️⃣ Kiến trúc tổng thể (Overview)

OXO cần được thiết kế theo **microservices architecture** để đảm bảo **scalability**, **high availability**, và **ease of deployment**. Tổng quan sẽ gồm các lớp sau:

* **Frontend Layer**:

  * Web (oxo.com)
  * Developer Portal (oxo.develop.com)
  * Mobile apps (iOS/Android)

* **API Gateway / Edge Layer**:

  * Authentication, rate-limiting, caching, WAF (Web Application Firewall)
  * CDN (cho assets, JS SDK, iframe)

* **Application Layer (Microservices)**:

  1. **Auth Service**: đăng ký, đăng nhập, social login, token management
  2. **User Profile Service**: profile, settings, privacy controls
  3. **Post Service**: tạo, chỉnh sửa, hiển thị bài viết, phân quyền audience
  4. **Developer API Service**: quản lý API key, SDK, rate limit
  5. **Feed / Timeline Service**: generate timeline/newsfeed, ranking algorithm
  6. **Notification Service**: push, email, in-app notifications
  7. **Analytics / Logging Service**: tracking, metrics, auditing

* **Data Layer**:

  * Relational DB (PostgreSQL / Aurora) cho user, post metadata
  * NoSQL DB (Cassandra / DynamoDB / MongoDB) cho feed/timeline, activity stream
  * Search Engine (Elasticsearch / OpenSearch) cho tìm kiếm bài viết, profile
  * Object Storage (S3 / MinIO) cho media (images, videos)

* **Infrastructure Layer**:

  * Container orchestration (Kubernetes / EKS / GKE)
  * Service Mesh (Istio / Linkerd)
  * Load balancer, auto-scaling, monitoring, logging

* **Security & Compliance**:

  * OAuth2/OpenID Connect, JWT tokens
  * Rate limiting, WAF, DDoS protection
  * Data encryption at rest & in transit
  * GDPR/CCPA compliance

---

## 2️⃣ Chi tiết các layer / module

### 2.1 Frontend Layer

* SPA (React/Next.js) cho web và Developer Portal
* Mobile apps: React Native / Flutter hoặc native iOS/Android
* CDN (CloudFront / Cloudflare) caching các static assets, SDK, iframe

**Ưu điểm**: tốc độ tải nhanh, tối ưu developer experience
**Nhược điểm**: SPA cần SSR/ISR cho SEO

### 2.2 API Gateway / Edge Layer

* Route đến các microservices
* Thực hiện authentication, rate limiting
* Caching common requests
* WAF protection

**Công nghệ**: NGINX + Kong / Envoy / AWS API Gateway

### 2.3 Microservices Layer

* **Auth Service**: social login, email/password, MFA, JWT
* **User Profile Service**: CRUD profile, privacy settings, versioning data
* **Post Service**: tạo/hiển thị bài viết, phân quyền audience
* **Developer API Service**: tạo API key, hạn mức, SDK, iframe embedding
* **Feed Service**: generate feed theo ranking algorithm, cache kết quả
* **Notification Service**: real-time (WebSocket), push, email
* **Analytics Service**: log events, dashboards, monitoring

**Ưu điểm**: dễ mở rộng, deploy độc lập, fault isolation
**Nhược điểm**: quản lý service nhiều, cần service mesh

### 2.4 Data Layer

* **Relational DB**: user, posts metadata, API keys
* **NoSQL DB**: feed, activity stream, caching write-heavy workloads
* **Search Engine**: Elasticsearch/OpenSearch, phục vụ tìm kiếm nhanh
* **Object Storage**: media storage, CDN integration

**Ưu điểm**: tối ưu read/write theo loại dữ liệu
**Nhược điểm**: cần data sync, consistency giữa DB và cache

### 2.5 Infrastructure Layer

* Kubernetes cluster + autoscaling
* Service mesh cho secure service-to-service communication
* Observability: Prometheus + Grafana, ELK Stack
* CI/CD pipelines cho deployment nhanh, rollback dễ

### 2.6 Security & Compliance

* OAuth2 / OpenID Connect cho SSO & social login
* JWT cho session management
* Rate limiting + WAF chống abuse / spam
* End-to-end encryption cho private posts & messages
* Audit logs + compliance (GDPR, CCPA)

---

## 3️⃣ Kiến trúc tổng thể (Interactive Mermaid)

```html
<div id="oxo-diagram-container" style="width:100%; height:600px; border:1px solid #ccc"></div>

<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/panzoom@9.4.0/dist/panzoom.min.js"></script>
<script>
  mermaid.initialize({ startOnLoad: true });

  const graphDefinition = `
  graph TD
    subgraph Frontend
      Web[Web App: oxo.com]
      Mobile[Mobile Apps: iOS/Android]
      DevPortal[Developer Portal: oxo.develop.com]
    end

    subgraph Edge
      APIGW[API Gateway / WAF / CDN]
    end

    subgraph Microservices
      Auth[Auth Service]
      Profile[User Profile Service]
      Post[Post Service]
      Feed[Feed / Timeline Service]
      DevAPI[Developer API Service]
      Notification[Notification Service]
      Analytics[Analytics / Logging Service]
    end

    subgraph Data
      RDB[(Relational DB)]
      NoSQL[(NoSQL DB)]
      Search[(Elasticsearch)]
      Storage[(Object Storage)]
    end

    subgraph Infra
      K8s[Kubernetes Cluster]
      Mesh[Service Mesh]
      Monitoring[Prometheus + Grafana]
    end

    Web --> APIGW
    Mobile --> APIGW
    DevPortal --> APIGW

    APIGW --> Auth
    APIGW --> Profile
    APIGW --> Post
    APIGW --> DevAPI
    APIGW --> Feed
    APIGW --> Notification

    Auth --> RDB
    Profile --> RDB
    Post --> RDB
    Feed --> NoSQL
    Feed --> Storage
    Notification --> RDB
    Analytics --> RDB
    Analytics --> NoSQL
    Analytics --> Storage
    Search --> RDB
    Search --> NoSQL

    Microservices --> Mesh
    Microservices --> K8s
    Infra --> Monitoring
  `;

  const container = document.getElementById('oxo-diagram-container');
  container.innerHTML = mermaid.render('oxoDiagram', graphDefinition);

  // Apply panzoom for interactive control
  panzoom(container);
</script>
```

**Hướng dẫn sử dụng**:

* Mở file MD trên trình duyệt hỗ trợ HTML.
* Sơ đồ Mermaid sẽ hiển thị trong div.
* Dùng chuột để **zoom & pan** tương tác.
* Có thể mở rộng/custom thêm các buttons collapse/expand nếu muốn.
