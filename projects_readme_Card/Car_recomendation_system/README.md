# MOTORMONY

Find Your Automotive Soul Partner - AI-Powered Car Recommendations Tailored Just for You.

---

## 📅 Project Metadata
* **Duration:** 2 Days (Focused Weekend Sprint: December 6, 2025 – December 7, 2025)
* **Team Setup:** Solo Project (Developed entirely by Sathyaseelan K)
* **Status:** Production Ready (Serverless Adapter Configured)

---

## 💻 Tech Stack

### Backend & Data Processing
* **Python 3.9+**: Core execution environment
* **Flask 3.0+ & Flask-CORS**: Web framework and API endpoint mapping
* **Pandas**: High-performance data manipulation, filtering, and aggregation
* **Scikit-learn (MinMaxScaler)**: Normalizing heterogeneous numerical features to a uniform 0-1 scale
* **NumPy**: Matrix math operations during score calculations
* **Gunicorn**: WSGI server hosting production instances

### Frontend & Visuals
* **HTML5**: Semantic document structure
* **CSS3**: Premium glassmorphic interface, dark theme gradients, responsive layout design, and micro-animations using custom CSS custom properties (Variables)
* **Vanilla JavaScript (ES6+)**: SPA state management, dynamic client-side filtering/sorting, modal control, and query parsing
* **Chart.js**: Included for visual radar/bar comparisons (Note: currently declared in the layout, with final JavaScript instantiations pending)
* **Font Awesome v6.4.0**: Iconography library

---

## 🔍 Project Overview

### What it is
MotorMony is a commercial-grade, single-page web application that connects users with their ideal vehicles using natural language queries. Instead of forcing users to fill out complex forms, it uses basic keyword heuristics to parse intents (e.g. family safety, cost efficiency, sports performance) and calculates a relative compatibility score across a cleaned database of 527 unique cars.

### Why it exists
Buying a car is an intimidating, parameter-heavy process. Traditional portals overwhelm buyers with technical details (e.g. displacement, wheelbase, torque curves) when the average buyer only cares about the qualitative value of the vehicle in their day-to-day life. 

### What problem it solves
It bridges the gap between natural human thoughts ("cheap family car with good mileage") and static relational data. It acts as an translator that:
1. Extracts semantic intents, budgets, and seating constraints from free-form text.
2. Applies dynamic weight profiles matching the user's focus (e.g., putting more weight on safety for family queries, and more weight on power for performance queries).
3. Ranks cars based on multi-factor normalized mathematical scores rather than hard boundaries.

---

## 🏆 Key Milestone & Achievement

* **527 Unique Models Across 40+ Brands:** Cleansed and aggregated from a raw dataset containing over 500,000 transaction records.
* **Intelligent Query Parser:** Implements multi-stage regular expressions to extract currency values (in Lakhs or standard Rupees) and seat requirements from user queries.
* **Serverless Production-Ready Setup:** Configured with a serverless directory mapping (`api/index.py`) and URL rewrites (`vercel.json`) for zero-configuration deployments on Vercel.

---

## 👑 Leadership & Responsibilities
As a solo developer, Sathyaseelan K took full ownership of the lifecycle:
* **Database & Data Pipeline Design:** Built the preprocessing scripts that turned a raw transaction log of used car sales into a structured, scaled vehicle database.
* **Algorithm Engineering:** Designed the merged-weight scoring system that handles overlapping queries (e.g. a sporty family car).
* **Frontend Architecture:** Coded the responsive glassmorphism UI/UX from scratch without UI library dependencies, relying on pure CSS variables.
* **Deployment & Testing:** Wrote standard verification test scripts and deployed the application to serverless platforms.

---

## ⚠️ Problem Statement

* **The Sliding Filter Paradox:** Traditional search pages require users to set hard limits (e.g., setting a budget of ₹10L hides a perfect car priced at ₹10.1L).
* **The Domain Knowledge Gap:** Buyers do not naturally know how many Brake Horsepower (BHP) or what engine displacement (cc) they need; they want the system to translate words like "quick" or "sporty" into those metrics.
* **Lack of Reasoning:** Search results usually display a list of matches without giving any explanation of why a vehicle was suggested, creating a black-box user experience.

---

## 💡 Solution Implemented

MotorMony resolves these problems with a unified, three-tiered solution:
1. **Intelligent Text Parsing:** The search bar captures raw text and maps it to specific intent profiles (Family, Budget, Performance, Collector, EV, Resale, and General).
2. **Normalized Multi-Factor Scoring:** All parameters are converted to a 0-1 scale. A custom algorithm aggregates weights based on identified intents, computes scores, and outputs a relative match percentage (e.g. "95% Match").
3. **CarPilot AI Explanations:** The system highlights the single best match and prints a custom bulleted summary explaining the reasons behind the recommendation (e.g. "Within budget", "Strong resale value", or "Top-tier safety").

---

## 🛠️ Key Features

### 1. Intent Detection & Parser (`intent_parser.py`)
* **Feature:** Regex-based query extractor.
* **Capability:** Scans raw strings for keywords, numeric amounts (e.g. `12 lakhs`, `8 L`, `500000`), passenger counts (`7 seater`, `5 seater`), fuels (petrol, diesel, EV, hybrid), and body styles.
* **Benefit:** Eliminates the need for input forms, letting users search naturally.

### 2. Multi-Factor Scoring Engine (`score_engine.py`)
* **Feature:** Dynamic weight-merging scoring algorithm.
* **Capability:** Applies specialized weight weights depending on the query's focus (e.g. Budget puts 45% weight on price and 30% on mileage, while Performance puts 50% on power).
* **Benefit:** Ensures that recommendations are customized to the user's specific context.

### 3. CarPilot AI Suggestions (`recommendation_system.py`)
* **Feature:** Heuristics-based natural language generator.
* **Capability:** Generates customized pro/con arguments and specifications for the top-ranked car.
* **Benefit:** Builds trust by detailing the math in simple, human-readable terms.

### 4. Interactive UI Components (`index.html` & `app.js`)
* **Feature:** Dynamic Single-Page Application (SPA) frontend.
* **Capability:** Supports list/table views, side-by-side comparison of up to 4 models, client-side sorting (by price, score, year), and year-based filtering.
* **Benefit:** Provides a premium, fluid desktop and mobile experience.

---

## 🏗️ System Architecture

The following diagram illustrates the flow of a search query through the MotorMony system:

```
[ User Input Query ]  (e.g., "Safe family car under 15 Lakhs")
        │
        ▼
┌────────────────────────────────────────────────────────┐
│               Frontend Interface (SPA)                 │
│  - Static Assets served from /static                   │
│  - Triggers POST request to /recommend                 │
└──────────────────────────┬─────────────────────────────┘
                           │ (JSON Payload)
                           ▼
┌────────────────────────────────────────────────────────┐
│                   Flask API Layer                      │
│  - Receives JSON payload with query and limits         │
│  - Invokes recommendation module                       │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│          Query Parser (intent_parser.py)               │
│  - Regular expressions extract budget and seat limits  │
│  - Keyword mapping maps words to Intent Profiles       │
└──────────────────────────┬─────────────────────────────┘
                           │ (Intents, Budget, Seats)
                           ▼
┌────────────────────────────────────────────────────────┐
│          Scoring Engine (score_engine.py)              │
│  - Merges weights if multiple intents are detected     │
│  - Filters rows by budget and seats                    │
│  - Calculates relative dot-product scores against      │
│    cars_dataset_normalized.csv                         │
└──────────────────────────┬─────────────────────────────┘
                           │ (Ranked Pandas DataFrame)
                           ▼
┌────────────────────────────────────────────────────────┐
│       CarPilot Generator (recommendation_system.py)   │
│  - Isolates the #1 car and creates reasoning list     │
│  - Packs everything into a clean JSON response         │
└──────────────────────────┬─────────────────────────────┘
                           │ (HTTP JSON Response)
                           ▼
┌────────────────────────────────────────────────────────┐
│                 Frontend Render                        │
│  - Displays CarPilot AI Hero Box                       │
│  - Populates glassmorphism car cards / table rows      │
│  - Powers Side-by-Side Comparison Panel                │
└────────────────────────────────────────────────────────┘
```

---

## 📊 Database Concepts Applied

### 1. Data Cleansing & Outlier Pruning
The project cleans the raw transaction database (`car_prices.csv`, ~88MB) to filter out noise:
* Removes entries with missing critical metadata (make, model, year, selling price).
* Limits cars to selling prices between $1,000 and $200,000 to eliminate damaged scrap cars and hyper-cars.
* Filters for model years $\ge 2010$ to ensure relevance.

### 2. Aggregation & De-duplication
A single car model has hundreds of individual sales listings. The pipeline groups all transactions by model name using Pandas:
```python
df_grouped = df.groupby('name').agg(agg_dict).reset_index()
```
This consolidates hundreds of thousands of rows down to **527 unique make/model combinations** with averaged metrics.

### 3. Feature Imputation & Engineering
Since the raw transaction log lacked mechanical specifications, custom heuristics were built to estimate them:
* **Seats:** Deduced from body shapes (e.g. SUVs and Vans get 7 seats, Sedans/Coupes get 5 seats).
* **Mileage:** Estimated based on age and body style (Hatchbacks get a +5 km/l bonus, SUVs get a -5 km/l penalty).
* **Power:** Scaled based on selling price and body type (Coupes and SUVs get bonus offsets).
* **Safety Rating:** Estimated from vehicle age and auction condition notes (newer/cleaner cars get higher scores).
* **Resale Value:** Modeled using a standard depreciation rate of 8% per year, adjusted by vehicle condition.

### 4. MinMaxScaler Normalization
To prevent large numbers (like BHP power) from dominating smaller values (like safety stars), all numeric columns are normalized to a strict $0.0 - 1.0$ scale:
$$\text{Normalized Value} = \frac{x - x_{\min}}{x_{\max} - x_{\min}}$$
This makes it possible to calculate composite scores by summing weighted normalized attributes.

---

## ⚡ Challenges Faced

### `[CHALLENGE-01]` Raw Data Scale & Processing Time
* **Problem:** Loading, filtering, and scaling a raw 88MB CSV with over 500,000 entries dynamically on every API request was slow and crashed free hosting tiers.
* **Solution:** Created offline preprocessing scripts (`normalize_car_prices.py` and `normalize_dataset.py`). These scripts aggregate the data, impute specifications, normalize columns, and save a lightweight 78KB aggregated database (`cars_dataset_normalized.csv`). The live Flask server loads this preprocessed file into memory instantly at startup.

### `[CHALLENGE-02]` Overlapping Multi-Intent Weights
* **Problem:** When a user search triggers multiple intents (e.g. "sporty family car under 15 Lakhs"), combining weight vectors could result in individual weight coefficients exceeding $1.0$ or cancelling each other out.
* **Solution:** Implemented a weight-merging function in `score_engine.py` that aggregates raw coefficients and normalizes the absolute sum to $1.0$, preserving relative weights across attributes:
```python
total = sum(abs(v) for v in combined.values())
for k in combined:
    combined[k] /= total
```

### `[CHALLENGE-03]` Chart.js Visual Canvas Instantiation
* **Problem:** The HTML frontend (`index.html`) reserves layout space for a `radarChart` and a `barChart` and links to the Chart.js library. However, the JS script (`static/js/app.js`) declares them as `null` and lacks the rendering logic, which would cause empty containers or layout issues.
* **Solution:** Set the charts section wrapper to use the class `hidden` by default in the layout. Under active search, only the recommendations and the CarPilot AI box are rendered. The dashboard will remain clean and bug-free until the Chart.js visual bindings are fully implemented.

---

## 📈 Results & Impact

* **Reduced Search Friction:** Users no longer need to know technical specifications to search. A query like *"good mileage family car under 12L"* instantly returns relevant models.
* **No Hard Boundaries:** Instead of excluding a car because it is slightly over budget or missing a seat, the engine scores it slightly lower but still shows it, allowing users to find near-perfect matches.
* **Clear Explanations:** The CarPilot AI box explains why the top match was selected, making it easy to compare and understand recommendations.

---

## 🔮 Future Scope

1. **LLM-Based Semantic Parsing:** Integrate a lightweight transformer model or API (like Gemini Nano/Flash) to parse intents, replacing the current keyword matching.
2. **Dealer Database Sync:** Hook up real-time inventory APIs to show active listings with accurate local pricing.
3. **Database Integration:** Add user accounts and persistence (PostgreSQL/Firebase) so users can save searches and build comparisons over time.
4. **Mobile App:** Package the interface into a React Native or Flutter mobile application.

---

## 🔗 Project Links
* **Live Demo:** [Visit MotorMony Live](https://your-app.vercel.app)
* **GitHub Repository:** [sathyaseelan2006/MotorMony](https://github.com/sathyaseelan2006/MotorMony)
