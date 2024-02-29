# Overview

## Web
The Web folder is an web application that will create a React App, it is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## API1
API1 folder is for an Azure Functions application, which is a basic HTTP triggered function.

## API2
API2 folder is for an Azure Container application.

## Workflow Diagram
![diagram](https://github.com/spark-classes/assignment-1-Maolin-Wei/assets/144057115/35d67af6-0cb0-4dc0-a879-1ae53c6c9087)

The deployment starts with a code push to GitHub, which is triggered through GitHub Actions. When user push something to the target folders of the main branch, the corresponding workflow will run and the app will be updated.

**GitHub workflows:** Automates the deployment process via Github actions. When code changes are pushed to the target folders, it triggers workflows that build and deploy the application to Azure.

**Azure Functions App (API1):** A serverless application component that runs backend services triggered by HTTP requests, timers, or other Azure services.

**Azure Container Registry:** Stores Docker container images used by the application. It's where the container images for API2 are pushed to during the deployment process.

**Azure Container App (API2):** A scalable containerized service that runs the application logic. It's deployed from the images stored in the Azure Container Registry.

**Web App:** The front-facing portion of the application that communicates with the APIs to process and serve data to the users.

**Networking Boundaries:** Security boundaries. North-South boundaries refer to the traffic between the internet and the Azure services, while East-West boundaries refer to the traffic within Azure services.

**Front-end (User):** The user interface of the application that interacts with the Web App through the internet (North-South boundary).
