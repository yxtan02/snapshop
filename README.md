# SnapShop

## Getting Started 🛠️
### Prerequisites
- Python
- pip

### Setting up backend API
1. Navigate to the backend directory
```bash
cd backend
```
2. Create and activate a virtual environment:
```bash
python -m venv .venv
```
macOS/Linux: ```bash
source .venv/bin/activate
```
Windows: ```bash
.venv\Scripts\activate
```
3. Install the required dependencies by using: 
```bash
pip install -r requirements.txt
```
4. Run the API:
```bash
uvicorn main:app --reload
```