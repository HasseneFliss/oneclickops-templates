# OneClickOps Templates Repository

Official templates for OneClickOps automated project scaffolding.

## Structure

```
├── project-templates/      # Application code templates
│   ├── python/            # Python FastAPI
│   ├── nodejs/            # Node.js Express
│   ├── reactjs/           # React + Vite + TypeScript
│   ├── vuejs/             # Vue.js 3 + Vite
│   ├── kotlin/            # Kotlin Spring Boot
│   └── golang/            # Go Gin
├── kubernetes/            # Kustomize templates
│   ├── base/             # Base manifests
│   └── overlays/         # Environment overlays
├── cicd/                  # CI/CD pipelines
│   ├── github-actions/   # GitHub Actions
│   ├── circleci/         # CircleCI
│   ├── gitlab-ci/        # GitLab CI
│   └── jenkins/          # Jenkins
├── argocd/               # ArgoCD apps
└── docker/               # Dockerfiles
```

## Template Variables

| Variable | Example |
|----------|---------|
| `{{PROJECT_NAME}}` | `my-service` |
| `{{PROJECT_NAME_UPPER}}` | `MY_SERVICE` |
| `{{DISPLAY_NAME}}` | `My Service` |
| `{{DOMAIN}}` | `api.example.com` |
| `{{NAMESPACE}}` | `production` |
| `{{SERVICE_PORT}}` | `8080` |
| `{{REPLICAS}}` | `3` |
| `{{GITHUB_ORG}}` | `mycompany` |
| `{{DOCKER_REGISTRY}}` | `ghcr.io` |
