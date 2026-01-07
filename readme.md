# OneClickOps - A2A DevOps Automation Platform

🚀 **OneClickOps** is a revolutionary DevOps automation platform that uses the **A2A (Agent-to-Agent) Protocol** to orchestrate multiple AI agents for project creation, PR management, and infrastructure provisioning.

## 🌟 Features

### 🤖 Multi-Agent Architecture
- **Orchestrator Agent**: Main AI agent that handles user conversations and coordinates other agents
- **GitHub Agent**: Creates repositories, branches, and pull requests
- **Kustomize Agent**: Generates Kubernetes manifests
- **ArgoCD Agent**: Creates GitOps application configurations
- **Slack Agent**: Sends notifications to team channels
- **CI/CD Agent**: Configures GitHub Actions or CircleCI pipelines

### 💬 Natural Language Interface
Create entire projects just by describing what you need:
```
"I want to create a Python microservice called user-auth with CircleCI and deploy to the auth namespace"
```

### 📋 Preview Mode
Review and edit all generated files before creating PRs:
- Split-screen preview panel
- Edit files in-browser
- Category-based file organization (Project, CI/CD, K8s, ArgoCD)
- Confirm or cancel before committing

### 🔄 Real-time Updates
- WebSocket connections for live status updates
- Progress tracking for all resource creation
- Instant notifications when PRs are created

### 📊 Comprehensive Dashboard
- Track all projects and their health status
- Monitor PR lifecycle with AI-powered insights
- Agent Health visualization with real-time communication tracking
- Skill matrix tracking based on real activity

### 💾 Production-Ready Persistence
- PostgreSQL database for data persistence
- Connection pooling for high performance
- Automatic fallback to in-memory for development

## 🛠️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Dashboard  │  │  AI Chat    │  │  PR Control │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└────────────────────────┬────────────────────────────────┘
                         │ REST API / WebSocket
┌────────────────────────▼────────────────────────────────┐
│              Backend (FastAPI A2A Server)                │
│  ┌─────────────────────────────────────────────────┐   │
│  │            Orchestrator Agent (AI)               │   │
│  │  - Natural language understanding                │   │
│  │  - Workflow coordination                         │   │
│  │  - Multi-turn conversations                      │   │
│  └─────────────────────┬───────────────────────────┘   │
│                        │ A2A Protocol                   │
│  ┌──────────┬──────────┼──────────┬──────────┐         │
│  ▼          ▼          ▼          ▼          ▼         │
│ GitHub   Kustomize   ArgoCD    Slack     CI/CD        │
│ Agent    Agent       Agent     Agent     Agent        │
└─────────────────────────┬──────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
   PostgreSQL      Anthropic/OpenAI     GitHub API
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- API Keys:
  - Anthropic API key OR OpenAI API key
  - GitHub Personal Access Token (with repo, workflow permissions)
  - Slack Webhook URL (optional)

### Production Setup (with PostgreSQL)

1. **Clone and configure:**
```bash
cd one-clickops
cp .env.example .env
# Edit .env with your API keys
```

2. **Start the full stack:**
```bash
docker-compose up -d
```

This starts:
- PostgreSQL database (port 5432)
- Backend API server (port 8080)
- Frontend app (port 3000)

3. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- API Docs: http://localhost:8080/docs

### Development Setup (without database)

For quick testing without persistence:

```bash
docker-compose -f docker-compose-dev.yml up -d
```

⚠️ **Note**: Data will be lost on restart in dev mode.

### Local Development

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt

# Set environment variables
export ANTHROPIC_API_KEY="your-key"
export GITHUB_TOKEN="your-token"
export DATABASE_URL="postgresql://user:pass@localhost:5432/oneclickops"  # optional

# Run the server
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Variables

```bash
# =============================================================================
# DATABASE (Production)
# =============================================================================
POSTGRES_PASSWORD=your-secure-password
DATABASE_URL=postgresql://oneclickops:password@postgres:5432/oneclickops

# =============================================================================
# AI PROVIDER (Required - at least one)
# =============================================================================
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
AI_PROVIDER=anthropic  # or "openai"

# =============================================================================
# GITHUB (Required for project creation)
# =============================================================================
GITHUB_TOKEN=ghp_...

# =============================================================================
# SLACK (Optional)
# =============================================================================
SLACK_WEBHOOK_URL=https://hooks.slack.com/...

# =============================================================================
# CORS (Optional)
# =============================================================================
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 📡 API Reference

### A2A Protocol Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/.well-known/agent.json` | GET | Agent discovery card |
| `/agents` | GET | List all available agents |
| `/agents/{id}` | GET | Get specific agent details |

### Chat & Preview Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/chat` | POST | Send a message to the orchestrator |
| `/preview` | POST | Generate preview of all files to be created |
| `/confirm-preview` | POST | Confirm and create PRs from preview |
| `/tasks/{id}` | GET | Get task details |

### Configuration

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/configure` | POST | Configure API keys at runtime |
| `/config/status` | GET | Get current configuration status |

## 🏗️ Project Creation Workflow

When you ask to create a project:

1. **AI parses** your request and gathers configuration
2. **Preview generated** - Review all files before committing
3. **On confirmation:**
   - **GitHub Agent**: Creates repository
   - **CI/CD Agent**: Generates pipeline config
   - **Kustomize Agent**: Creates K8s manifests
   - **ArgoCD Agent**: Creates GitOps app
   - **GitHub Agent**: Creates PRs for all changes
   - **Slack Agent**: Notifies the team

All steps are tracked in real-time with Agent Health visualization.

## 📁 Project Structure

```
one-clickops/
├── backend/
│   ├── agents/
│   │   ├── orchestrator.py      # Main AI agent
│   │   ├── github_agent.py      # GitHub operations
│   │   └── specialized_agents.py # Kustomize, ArgoCD, Slack, CICD
│   ├── models/
│   │   └── a2a_types.py         # A2A protocol types
│   ├── services/
│   │   ├── ai_service.py        # Anthropic/OpenAI integration
│   │   └── github_service.py    # GitHub API client
│   ├── database.py              # PostgreSQL connection
│   ├── models_db.py             # SQLAlchemy ORM models
│   ├── state.py                 # State management (DB + memory)
│   ├── main.py                  # FastAPI application
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.tsx              # Main application
│   │   ├── hooks/               # Custom hooks
│   │   └── services/            # API client
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml           # Production (with PostgreSQL)
├── docker-compose-dev.yml       # Development (in-memory)
└── README.md
```

## 💾 Database Schema

| Table | Description |
|-------|-------------|
| `projects` | Created projects with configuration |
| `pull_requests` | All PRs with status tracking |
| `activities` | Activity feed events |
| `agent_communications` | Agent-to-agent message log |
| `agent_metrics` | Per-agent performance stats |
| `preview_sessions` | Pending preview confirmations |

## 🔒 Security Considerations

- API keys stored in environment variables only
- PostgreSQL with connection pooling
- GitHub tokens should have minimal required permissions
- HTTPS recommended for production deployment
- Database credentials should use strong passwords

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use and modify for your needs.

---

Built with ❤️ using the A2A Protocol

**Need help?** Open an issue or reach out to the team!
