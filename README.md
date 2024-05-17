# SnapShop

## Getting Started 🛠️
### Prerequisites
- Python
- pip

### Setting up backend API
1. Clone this repository and navigate to the project directory
2. Create and activate a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate
```
3. Install the required dependencies by using: 
```bash
pip install -r requirements.txt
```
4. Navigate to the backend directory and run the API
```bash
cd backend
uvicorn main:app --reload
```