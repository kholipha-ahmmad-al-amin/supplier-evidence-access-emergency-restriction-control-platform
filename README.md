# Supplier Evidence Access Emergency Restriction Control Platform

## The Problem

An active threat to supplier evidence access requires a fast, accountable restriction that prevents further exposure while preserving a defensible decision record. Informal emergency action can leave uncertainty over the risk assessment, approved scope, affected parties, and closure evidence.

## The Solution

This service governs an emergency supplier evidence restriction from declaration through risk assessment, authority restriction, stakeholder notification, and assurance resolution. Role gates, ordered transitions, required references, audit events, and atomic persistence provide traceability under time-sensitive conditions.

## Live Demo and Tech Stack

Start the service and visit `http://localhost:65300/health` to confirm readiness. The stack uses Node.js 22, Express 5, ESM JavaScript, atomic JSON persistence, Vitest, and GitHub Actions.

| Layer | Implementation | Responsibility |
| --- | --- | --- |
| HTTP API | Express 5 | Emergency restriction lifecycle routes and errors |
| Control domain | ESM JavaScript | Role gates, state rules, and audit events |
| Persistence | Node file system | Temporary snapshot and atomic rename |
| Verification | Vitest and GitHub Actions | Domain tests and continuous integration |

## Local Setup and Run Instructions

```bash
git clone https://github.com/kholipha-ahmmad-al-amin/supplier-evidence-access-emergency-restriction-control-platform.git
cd supplier-evidence-access-emergency-restriction-control-platform
npm install
npm test
npm start
```

The service binds to `0.0.0.0:65300` for approved local area network use.

## System Documentation

### System Architecture Diagram
```mermaid
flowchart LR
  Reporter[Emergency Reporter] --> API[Express REST API]
  Risk[Risk Reviewer] --> API
  Authority[Access Authority] --> API
  Operator[Restriction Operator] --> API
  Assurance[Assurance Reviewer] --> API
  API --> Domain[EmergencyRestrictionService]
  Domain --> Store[AtomicJsonStore]
  Store --> File[(restrictions.json)]
```

### Entity-Relationship Diagram
```mermaid
erDiagram
  EMERGENCY_RESTRICTION ||--o{ AUDIT_EVENT : records
  EMERGENCY_RESTRICTION { string id PK string supplier string evidenceReference string threatSummary string requestedScope string status }
  AUDIT_EVENT { string id PK string type string actorId string actorRole string occurredAt }
```

### Data Flow Diagram
```mermaid
flowchart TD
  A[Emergency declared] --> B[Risk assessed]
  B --> C[Access restricted]
  C --> D[Stakeholders notified]
  D --> E[Resolution assured]
  E --> F[Atomic restriction snapshot]
```

### Use Case Diagram
```mermaid
flowchart LR
  Reporter --> Declare[Declare emergency]
  Risk --> Assess[Assess risk]
  Authority --> Restrict[Restrict access]
  Operator --> Notify[Notify stakeholders]
  Assurance --> Resolve[Resolve restriction]
```

### Sequence Diagram
```mermaid
sequenceDiagram
  participant R as Reporter
  participant K as Risk Reviewer
  participant A as Authority
  participant O as Operator
  participant Q as Assurance
  participant API as API
  participant Store as Atomic Store
  R->>API: Declare emergency
  K->>API: Assess risk
  A->>API: Restrict access
  O->>API: Notify stakeholders
  Q->>API: Resolve restriction
  API->>Store: Persist audit snapshot
```

## Owner

Created and maintained by Kholipha Ahmmad Al-Amin.

Software Engineer and AI Specialist

Founder and CEO of EquiSaaS BD

Principal Consultant at AR IT Consultancy

Full Stack Developer and SaaS Product Builder

### Official links

Portfolio: https://kholipha-ahmmad-al-amin.equisaas-bd.com/

GitHub: https://github.com/kholipha-ahmmad-al-amin

LinkedIn: https://www.linkedin.com/in/kholipha-ahmmad-al-amin

X: https://x.com/al_amin5519

Facebook: https://www.facebook.com/kholipha.ahmmad.al.amin

Instagram: https://www.instagram.com/kholipha.ahmmad.al.amin

## Ownership

This project was created and is maintained by Kholipha Ahmmad Al-Amin.

