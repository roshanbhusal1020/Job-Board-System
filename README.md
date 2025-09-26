# Job Board Platform

A full-stack project that connects job seekers with employers through curated listings, streamlined applications, and role-specific dashboards. I built it to deepen my Spring Boot + React skills while delivering features that mirror real hiring workflows.

## Highlights
- **Role-aware experience:** job seekers browse and apply, employers manage postings; UI and API enforce permissions end to end.
- **Spring Boot REST API** with session-based authentication, JPA entities, and a service-driven domain model.
- **React SPA** using Chakra UI for rapid iteration, with guarded routes and contextual navigation.
- **Container-ready** via Docker Compose (MySQL + backend + frontend) so reviewers can spin it up quickly.
- **Extensible roadmap** including resume feedback, interview tracking, and market insights dashboards.

## Architecture
```
frontend (React, Chakra UI)
   ↳ REST calls → backend (Spring Boot, Java 17)
         ↳ JPA repositories → MySQL
         ↳ Session storage → server-managed (Spring)
```
- **Controllers** expose job, user, and application APIs.
- **Services** handle business logic (job creation, applications, profile updates).
- **Repositories** use Spring Data JPA for persistence.
- **React** pages split by persona (employer vs. job seeker) with fetch helpers and guarded navigation.

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- Docker (optional, recommended for quickest setup)

### Quickstart with Docker Compose
```bash
# from the repo root
docker-compose up --build
```
- Backend: http://localhost:8080
- Frontend: http://localhost:3000 (proxied through the `Dockerfile.dev` setup)
- MySQL: localhost:3307 (credentials: `user` / `password`)

### Manual Setup
1. **Backend**
   ```bash
   cd jobBoard-backend
   ./mvnw spring-boot:run
   ```
   The API runs on http://localhost:8080 and connects to MySQL using the credentials in `src/main/resources/application.properties`.

2. **Frontend**
   ```bash
   cd jobBoard-frontend
   npm install
   npm start
   ```
   The React dev server runs on http://localhost:3000 and proxies API calls to the backend.

3. **Database**
   - Default JDBC URL: `jdbc:mysql://db:3306/jobboard`
   - Credentials: `user` / `password`
   - Tables are auto-created via `spring.jpa.hibernate.ddl-auto=update`.


## Feature Overview
| Area | Status | Notes |
| --- | --- | --- |
| User auth & session management | ✅ | Email + PIN login, session stored server-side |
| Role-based UI/API gating | ✅ | Job seekers cannot access employer endpoints or UI actions |
| Job feed & applications | ✅ | Browse, apply, withdraw |
| Employer job management | ✅ | Create and view own postings |
| Resume feedback bot | 🚧 | Planned & designed |
| Interview tracker | 🚧 | Planned, needs schema & UI |
| Trends dashboard | 🚧 | Planned, requires aggregation queries |

## Testing & Quality
- Planned:
  - Spring MockMvc tests for controllers
  - React component tests (Vitest/Testing Library)
  - CI workflow (GitHub Actions) to run builds and tests on PRs

## Roadmap
1. **Short Term**
   - Finish application entity logic (duplicate checks, status transitions)
   - Add user profile validation and better error messaging
   - Centralize auth context in the React app to reduce duplicate fetches
2. **Medium Term**
   - Implement interview tracking module with reminders
   - Integrate resume feedback service (initially rule-based, later AI-assisted)
   - Add dashboards with trending skills, salary insights, remote/on-site ratios
3. **Long Term**
   - Replace session PIN auth with Spring Security + password hashing/JWT
   - Introduce notifications (email or in-app)
   - Harden infrastructure (Flyway migrations, containerized deployments, monitoring)

## Screenshots / Demo
_Coming soon_