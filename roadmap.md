# 🛣️ Roadmap 6 tháng — OXO + BridgeX

## **Tháng 1 → 2: OXO Core (Mạng xã hội)**

🎯 **Mục tiêu:** Có bản MVP mạng xã hội nội bộ để user thật sự dùng.

- **Infra & Dev setup**
  - Monorepo: Backend (NestJS), Frontend (Next.js).
  - PostgreSQL (Prisma), Redis cache, Docker Compose cho local dev.
  - CI/CD cơ bản + staging env.
- **Core Features**
  - User Service (đăng ký, login OAuth2/JWT, profile).
  - Post Service (CRUD post, like, comment).
  - Feed Service (timeline, pagination).
  - Basic Notification (in-app).
- **UI (Next.js)**
  - Trang profile, trang feed, trang post detail.
- **Observability**
  - Logging + Prometheus metrics.

✅ **Milestone cuối Tháng 2:**

- OXO chạy được: user đăng ký, tạo post, xem feed, profile.
- Có ~demo cho 1k users nội bộ.

---

## **Tháng 3 → 4: OXO Production-ready**

🎯 **Mục tiêu:** Đưa mạng xã hội OXO ra production ổn định.

- **Feature nâng cao**
  - Media upload (ảnh/video → S3/MinIO).
  - Follow/Unfollow, trending posts.
  - Search (ElasticSearch / Postgres full-text).
  - Notification real-time (WebSocket/SSE).
- **Security & Privacy**
  - OAuth2 full flow, refresh token.
  - RBAC/ABAC (user roles).
  - GDPR basic (delete account).
- **Scaling**
  - Redis cache feed.
  - Background jobs (BullMQ: sync feed, send notifications).
- **UI**
  - Responsive, tối ưu performance (Next.js + Tailwind).

✅ **Milestone cuối Tháng 4:**

- OXO stable, 100k users.
- Có thể scale feed/notification.
- Đủ UX để người dùng thật sự engage.

---

## **Tháng 5 → 6: BridgeX (Public API + SDK + Portal)**

🎯 **Mục tiêu:** Mở dữ liệu OXO cho developer bên ngoài.

- **Public API**
  - REST/GraphQL `/v1/profiles`, `/v1/posts`.
  - Consent model (user phải approve → developer app lấy dữ liệu).
  - API Key system (tạo, revoke, rotate).
- **Embed SDK**
  - JS SDK (`@bridgex/sdk`) → load profile/posts vào iframe.
  - Embed Token Service (JWT).
- **Developer Portal**
  - UI tạo API key.
  - Usage dashboard, rate limit quota.
  - API docs (OpenAPI 3.0 + Redoc).
- **Infra & Observability**
  - Rate limiting (Redis).
  - Quota tracking.
  - Basic analytics (API usage, error tracking).

✅ **Milestone cuối Tháng 6:**

- BridgeX public: developer ngoài có thể embed OXO profile/posts lên website.
- Developer Portal online, docs + SDK sẵn sàng.
- Scale lên 1M users (OXO core + BridgeX API).

---

# 📊 Tổng quan theo thời gian

- **0 → 2 tháng (OXO Core MVP):** Mạng xã hội chạy được, user đăng ký, post, feed.
- **3 → 4 tháng (OXO Production):** Mạng xã hội ổn định, đủ tính năng cần thiết, scale 100k users.
- **5 → 6 tháng (BridgeX):** Public API, SDK, Developer Portal → mở cho developer ngoài.
