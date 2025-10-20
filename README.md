# Cooki

Cooki GPU Services is a peer-to-peer GPU computing platform designed to leverage idle GPU power from host computers. The service aims to simplify access to computing resources, allowing users to accomplish complex tasks such as machine learning, 3D rendering, video editing, and more at a fraction of the cost of traditional cloud computing solutions.

- Peer-to-Peer Resource Pooling: By tapping into the existing vast network of idle GPUs, Cooki maximizes resource utilization and offers users significant savings on computing costs.
- GPU Allocation: Users simply describe their desired computing task, and Cooki can automatically handle the allocation of the appropriate GPU resources based on the task requirements.
- Pay-per-Use Model: Users are charged based on the amount of computing power consumed for their task rather than on GPU model or rental time.
- Win-Win: Hosts earn based on how much computing power was used.

## Acknowledgements
This was created for the 2025 Startup Hackathon @ UNCC. 

Big thanks to my teammates Aryan Kharva and Pranav Sadhu for creating the website.
This repo represents a Minimum Viable Product (MVP). Stay tuned—big things are planned!

## Overview (For the lovely recruiters out there 😘)
Cooki is a monorepo that houses both the frontend and backend applications:  
- `frontend/` – TypeScript + React (Vite), communicates with backend APIs  
- `backend/` – Python + Django + SQLite for user data, integrates with OpenAI for the assistant  
- `application/` – Prototype of the provider-side client (Python + Ray for distributed compute)

## Quick startup for those interested  

### Prerequisites  
- Node.js (v14+ or as specified in `frontend/`)  
- Python (v3.8+ or as specified in `backend/`)  
- Package manager (npm/yarn for frontend, pip for backend)
- OpenAI API key (if you wish to test the assistant — see `backend/.env`)  
- Anaconda (optional, for running the prototype application)  

### Installation  
Clone the repository:  
```bash
git clone https://github.com/SquidCooki2/Cooki.git
cd Cooki
```

Install dependencies:
```bash
# Frontend
cd frontend
npm install   # or yarn install

# Backend
cd ../backend
pip install -r requirements.txt
```

### Running
```bash
# In one terminal → backend
cd backend
python manage.py runserver  # or the entry-point script

# In another terminal → frontend
cd frontend
npm run dev     # or npm start depending on setup
```

Task-splitting application prototype:
```bash
cd application
# Run on the main computer (will install dependencies and all)
# Requires Anaconda → set user name in `application/config.env`
# Will create a new Anaconda environment in py3.10. Delete afterward if you wish
setup_head.bat

# Or just run with all dependencies installed
pip install -r requirements.txt
ray start --head --port=6379

# Run on worker computers (Linux or WSL2). Ray doesn't support a Windows only cluster
ray start --address='192.168.x.x:6379'

# Run on main computer and watch it split a task between all connected nodes!
python main.py

# You can also run a test cluster (Windows). Make sure you are on the correct Python version or environment
test_cluster.bat
```
Right now, the it simply allocates the multiplication of multiple 3000x3000 matrices

## Images

<img width="1914" height="936" alt="Screenshot 2025-10-20 161027" src="https://github.com/user-attachments/assets/5e99a493-ce7d-47df-a01b-e9d5fe8153e6" />
<img width="1900" height="939" alt="Screenshot 2025-10-20 161129" src="https://github.com/user-attachments/assets/091eab71-9451-4ef0-ba79-faedccbc6551" />
<img width="1897" height="936" alt="Screenshot 2025-10-20 161212" src="https://github.com/user-attachments/assets/4357982b-b28c-41a4-af4b-b3a2bf9acc3c" />
<img width="1904" height="874" alt="Screenshot 2025-10-20 161419" src="https://github.com/user-attachments/assets/04452d3b-716c-4a98-b3b8-8781f6b520c3" />
