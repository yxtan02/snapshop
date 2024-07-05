# SnapShop
SnapShop is a fuss-free shopping app that offers efficient visual product search and convenient price & review comparisons to facilitate a seamless shopping experience.

## Tech Stack
- Frontend: **React Native** (Expo)
- Backend: **FastAPI** (Python)

## Getting Started 🛠️
### Prerequisites
- Node.js
- Python
- npm
- pip

### Setting up frontend app
1. Navigate to the frontend directory
```bash
cd frontend
```
2. Install the required dependencies
```bash
npm install
```
3. Run the app
```bash
npx expo start
```
4. Open http://localhost:8081 to run the app in the browser

### Setting up backend API
1. Open a new command prompt and navigate to the backend directory
```bash
cd backend
```
2. Create and activate a virtual environment
```bash
python -m venv .venv
source .venv/bin/activate  (for macOs/Linux)
.venv\Scripts\activate     (for Windows)
```
3. Install the required dependencies
```bash
pip install -r requirements.txt
```
4. Run the API
```bash
uvicorn main:app --reload
```