# 🧩 OXO — Deployment Diagram & Kubernetes Manifests

Mục tiêu: cung cấp **Mermaid architecture diagram**, **tài liệu triển khai** và **manifest YAML mẫu** để bắt đầu triển khai OXO lên Kubernetes (cloud-managed hoặc on-prem).  
Nội dung bao gồm:

- Sơ đồ hệ thống (Mermaid)
- Kiến trúc namespace & resource mapping
- Best practices (HPA, ConfigMaps, Secrets, PVC, NetworkPolicy)
- Mẫu manifest (Deployment, Service, StatefulSet (Postgres), PVC, Ingress, HPA)
- Gợi ý helm/values structure

---

## Mermaid — System Deployment (Kubernetes)

```mermaid
flowchart TD
  subgraph Internet
    User[User Browser]
  end

  subgraph Cluster["Kubernetes Cluster (oxo-cluster)"]
    subgraph IngressNS["namespace: ingress (ingress-nginx)"]
      Ingress[Ingress Controller (nginx/traefik)]
      CertMgr[Cert-Manager]
    end

    subgraph AppNS["namespace: oxo-app"]
      Envoy[API Gateway (Envoy/Kong)]
      Front[Next.js Frontend (Deployment)]
      Auth[Auth Service (Deployment)]
      UserS[User Service (Deployment)]
      PostS[Post Service (Deployment)]
      FeedS[Feed Service (Deployment)]
      Worker[Worker (Deployment) - BullMQ]
      WS[WebSocket/Notification (Deployment)]
      Cron[CronJobs]
    end

    subgraph InfraNS["namespace: oxo-infra"]
      Pg[Postgres (StatefulSet) - PVC]
      Redis[Redis (StatefulSet/Cluster) - PVC]
      MinIO[MinIO (Deployment) - PVC]
      ES[ElasticSearch (StatefulSet) - PVC]
      Kafka[Kafka (StatefulSet) - PVC]
      Prom[Prometheus]
      Graf[Grafana]
      Loki[Loki]
    end

    User -->|HTTPS| Ingress
    Ingress --> Envoy
    Envoy --> Front
    Envoy --> Auth
    Envoy --> UserS
    Envoy --> PostS
    Envoy --> FeedS
    Envoy --> WS

    PostS --> Pg
    UserS --> Pg
    Auth --> Pg
    Worker --> Redis
    FeedS --> Redis
    Worker --> Pg
    PostS --> MinIO
    Search[Search Service] --> ES
    Worker --> Kafka
    ServicesEventBus[Event Bus] --> Kafka
    Prom --> /metrics
  end
```

---

## Namespace & Resource Mapping

- `ingress` (or system): ingress-nginx / traefik, cert-manager
- `oxo-app`: frontend, api-gateway, all app microservices, workers, cronjobs
- `oxo-infra`: stateful infra components (Postgres, Redis, MinIO, Kafka/Strimzi, ElasticSearch, monitoring)

## Best practices

- **Security**

  - Secrets quản lý bằng SOPS/SealSecrets / cloud KMS.
  - NetworkPolicy: deny-by-default, chỉ allow traffic cần thiết.
  - RBAC: least privilege cho service accounts.
  - Pod Security Admission / OPA/Gatekeeper policies.

- **Storage**

  - Sử dụng StorageClass phù hợp (gp3/GCE pd-ssd) cho PVC.
  - Postgres StatefulSet: dedicated PVC, backup (pgbackrest or cloud snapshot).

- **Scaling**

  - HPA dựa trên CPU hoặc custom metrics (requests-per-second).
  - PodDisruptionBudget & readiness/liveness probes.

- **Observability**

  - Expose /metrics, instrument services (OpenTelemetry).
  - Prometheus Operator + Grafana dashboards.
  - Logging → Loki / ELK.

- **CI/CD**
  - Build image → scan → push → Helm release (canary with Argo Rollouts).

---

## Sample manifests (templates)

Các file YAML nằm trong thư mục `manifests/` để bạn copy & chỉnh cho phù hợp.
