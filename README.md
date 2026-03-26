# Assistive Decision-Making System
### A bounded-rational decision support tool for college students — prototype domain: internship selection

---

## What This Is

Most decision-support tools tell you what to choose. This one doesn't.

The Assistive Decision-Making System is a full-stack ML-powered web application that helps college students **understand their options** rather than prescribing a single "best" choice. A student rates up to 4 internship opportunities across 4 dimensions, and the system surfaces the **experience archetype** each opportunity most closely resembles — along with honest tradeoffs and reflection prompts to guide their own thinking.

The core belief behind the design: **a well-informed student makes a better decision than an algorithm that makes it for them.**

---

## The Problem It Solves

Internship selection is a multi-attribute decision made under significant uncertainty — limited information, time pressure, and competing personal priorities. Standard recommendation systems simplify this into a ranked list, which collapses the nuance of the decision and removes student agency.

This system takes a different approach: rather than ranking options, it **maps each option to an experience archetype** and lets the student reason from there.

---

## Design Philosophy

### Bounded Rationality as Foundation

The system is grounded in Herbert Simon's theory of **bounded rationality** — the idea that real human decision-making is not fully optimal, but constrained by limited information, cognitive capacity, and time. Rather than modeling a "rational agent" that maximizes utility, this system models a **satisficing agent** — one who seeks a good-enough option given their constraints.

This shapes everything:
- The system surfaces archetypes, not rankings
- Output is descriptive and reflective, not prescriptive
- The student retains full decision authority

### Unsupervised Learning — An Intentional Choice

The use of **K-Means clustering** over a supervised classifier was a deliberate design decision, not a default.

A supervised model would require labeled training data — someone having already decided which internship is "correct" for which student. That would bake a specific value system into the model. Instead, unsupervised clustering lets **patterns in the data define the archetypes**, without imposing what "good" looks like. The model groups experience profiles by structural similarity, and the interpretation is left to the student.

---

## The 4 Experience Archetypes

Each archetype represents a distinct pattern of internship experience — defined by how stipend, workload, company reputation, and time flexibility interact.

| Archetype | Stipend | Workload | Reputation | Flexibility |
|---|---|---|---|---|
| **High-Pressure, High-Reward** | High | High | High | Very Low |
| **Balanced & Brand-Oriented** | Moderate | Low–Moderate | High | High |
| **Demanding & Time-Intensive Grind** | Moderate | High | Moderate | Very Low |
| **Low-Intensity, Flexible Experience** | Low | Low | Low | High |

These archetypes were designed from the ground up — not derived from a pre-existing dataset — to reflect the range of internship experiences college students realistically encounter. Each archetype comes with curated highlights, honest tradeoffs, and reflection prompts.

---

## How It Works

```
Student rates internship attributes (1–5 sliders)
        ↓
Input passed to Flask backend via REST API
        ↓
Values scaled using trained StandardScaler
        ↓
K-Means model assigns input to nearest cluster centroid
        ↓
Cluster ID mapped to experience archetype + insight
        ↓
Frontend displays archetype card with tradeoffs and reflection prompts
```

**Key implementation detail:** The scaler was fit on the same 1–5 scale as the slider inputs, ensuring user inputs cover the full feature space and all 4 archetypes are reachable.

---

## Output

> ⚠️ This section will be updated once the output UI is finalized.

Each submitted internship returns an archetype card containing:
- Archetype label and core description
- Highlights and tradeoffs
- Reflection prompts to guide the student's own reasoning

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Python, Flask, Flask-CORS |
| ML | scikit-learn (K-Means, StandardScaler) |
| Model persistence | joblib |

---

## Running Locally

### Prerequisites
- Python 3.x
- Node.js

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend runs on `http://127.0.0.1:5000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

> Both must be running simultaneously for the app to work.

### Regenerating the Model
If you need to retrain from scratch:
```bash
python generate_dataset.py   # regenerates synthetic dataset
python retrain_model.py      # retrains scaler + KMeans, saves .pkl files
```
Then replace `backend/model/scaler.pkl` and `backend/model/kmeans_model.pkl` with the newly generated files.

---

## Project Structure

```
├── backend/
│   ├── model/
│   │   ├── kmeans_model.pkl
│   │   ├── scaler.pkl
│   │   └── cluster_insights.json
│   ├── services/
│   │   ├── prediction_service.py
│   │   └── insight_service.py
│   ├── utils/
│   │   ├── validations.py
│   │   └── response_formatter.py
│   └── app.py
├── frontend/
│   └── [React + Vite app]
├── generate_dataset.py
└── retrain_model.py
```

---

## Academic Context

Built as a **Design Engineering course project** exploring how ML systems can support human decision-making without replacing it. The prototype domain is internship selection, chosen for its relevance to the student population and the richness of its multi-attribute decision structure.

---

*Built by Vishwa B. and Shyama H.*
