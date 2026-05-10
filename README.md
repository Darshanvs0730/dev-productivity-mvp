> An intelligent developer productivity dashboard designed to move engineering teams from raw data to actionable insights.

!Dashboard Screenshot
<img width="1710" height="946" alt="Screenshot 2026-05-11 at 1 02 39 am" src="https://github.com/user-attachments/assets/9b3a984f-01c1-4da1-b9e7-94f451fddea8" />


## 📖 Overview

Most engineering metrics tools suffer from a critical flaw: they present raw data (charts and graphs) without context, leaving developers wondering what the numbers mean or what actions to take. 

**DevPulse** is a lightweight, full-stack MVP built to solve this. Instead of a generic charting interface, DevPulse utilizes an **Insight Engine** that analyzes DORA and Agile metrics, assigns a weighted Health Score, and translates the data into a plain-English narrative (Headline → Root Cause → Action).

This project was built as an assignment focusing on critical thinking, user journey mapping, and product design.

## ✨ Core Features

- **The Insight Engine:** Analyzes data to surface specific bottlenecks (e.g., "High review wait times") rather than generic warnings.
- **Developer Health Score:** A weighted aggregate score (0-100) providing instant orientation for Individual Contributors.
- **Contextual Metric Cards:** Tracks 5 core SDLC metrics (Lead Time, Cycle Time, PR Throughput, Deployment Frequency, Bug Rate).
- **Manager View:** A team-wide summary table allowing engineering managers to spot bottlenecks before 1-on-1s.
- **Zero-Friction UX:** Clean, responsive UI built with custom CSS variables (no bloated CSS frameworks).

## 🏗️ Architecture & Tech Stack

DevPulse is built with a decoupled architecture focusing on explainability and rapid iteration.

* **Frontend:** React (Vite)
* **Backend:** Node.js / Express
* **Data Layer:** Static JSON (For the sake of this MVP and strict explainability, database infrastructure was intentionally bypassed in favor of in-memory data processing).
* **Styling:** Vanilla CSS (Custom Design Tokens)

## 🚀 Quick Start (Local Development)

To run this application locally, you will need [Node.js](https://nodejs.org/) installed.

### 1. Start the Backend API
```bash
cd backend
npm install
npm start
```

### 2. Start the Frontend Application
### Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```
### Design Trade-offs & Decisions
Why an Insight Engine over Charts? Numbers do not drive behavior change; narrative and clear actions do. The backend logic was heavily weighted toward generating advice rather than transforming data for charting libraries.
Why static data instead of a Database? The provided dataset consisted of exactly 32 issues/PRs. Implementing PostgreSQL or MongoDB would have added significant operational overhead without improving the end-user experience. Static JSON arrays allowed for 100% focus on business logic.
Designed & Developed by Darshan V S
