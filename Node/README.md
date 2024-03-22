# Overview

## Web
The Web folder is an web application that will create a React App, it is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It will read the Key Vault secret from the environment and displays it when /api is invoked.
![Q1 1_webapp](https://github.com/spark-classes/assignment-1-Maolin-Wei/assets/144057115/e542a53d-1828-4c59-aec9-5f3b28c3d765)

## API1
API1 folder is for an Azure Functions application, which is a HTTP triggered function. When triggering, it will retrieve and log the value of the Key Vault secret. It also connects to a Storage Queue and will send a message to the Azure Queue Storage.
![Q1 2_funcapp](https://github.com/spark-classes/assignment-1-Maolin-Wei/assets/144057115/bb515443-ee93-4927-b201-38a1c9fe5c5a)

## API2
API2 folder is for an Azure Container application. The function in it will connects to the Azure Queue Storage and receive the message form API1.
![Q3 1](https://github.com/spark-classes/assignment-1-Maolin-Wei/assets/144057115/58dea300-c577-459a-96f4-fc6ade8060d3)

# Workflow Diagram
![Diagram](https://github.com/spark-classes/assignment-1-Maolin-Wei/assets/144057115/c0451f5d-192a-4117-bc94-9c35c30ff21c)

The deployment starts with a code push to GitHub, which is triggered through GitHub Actions. When user push something to the target folders of the main branch, the corresponding workflow will run and the app will be updated.

**GitHub workflows:** Automates the deployment process via Github actions. When code changes are pushed to the target folders, it triggers workflows that build and deploy the application to Azure.

**Web App:** The web App integrates the Key Vault secret1 and it will read the value of secret1 from the environment and displays it when /api is invoked.

**Azure Functions App (API1):** A serverless application component that runs backend services triggered by HTTP requests, timers, or other Azure services. This function is an Azure Function with an HTTP trigger that responds to HTTP requests and makes an output binding to Azure Queue Storage for queue message processing. It also integrates the Key Vault secret2.

**Azure Container Registry:** Stores Docker container images used by the application. It's where the container images for API2 are pushed to during the deployment process.

**Azure Container App (API2):** A scalable containerized service that runs the application logic. It's deployed from the images stored in the Azure Container Registry. It contains a QueueTrigger function, which react to new Queues inside of Azure Queue Storage. To be specific, it will be triggered when a message insert to the storage queue from API1, and retrive the message from the queue and log it. It also integrates the Key Vault secret3.

**Networking Boundaries:** Security boundaries. North-South boundaries refer to the traffic between the internet and the Azure services, while East-West boundaries refer to the traffic within Azure services.

**Front-end (User):** The user interface of the application that interacts with the Web App through the internet (North-South boundary).

# Deployment
**1. Create Azure Apps:** Create Web, Functions, and Container App on the Azure platform and deploy successfully. For the Container App, create a container registry first.
![image](https://github.com/spark-classes/assignment-1-Maolin-Wei/assets/144057115/5867fd43-9b63-4ea1-a5eb-bde207de053e)

**2. Create a Workflow File on Github:** create a workflow file via GitHub action, which resides in the .github/workflows/ directory. This .yaml file defines the steps that the GitHub Actions runner will execute.
![image](https://github.com/spark-classes/assignment-1-Maolin-Wei/assets/144057115/966dcfb5-e0c5-4e48-8c22-0efc170b1409)

**3. Add Secrets to GitHub Repository:** Store authentication information such as public-profile or RBAC credentials as secrets in the GitHub repository settings. 
![image](https://github.com/spark-classes/assignment-1-Maolin-Wei/assets/144057115/cf012476-6edc-4d07-9e48-827671fc5e9d)

**4. Configure the Workflow File:** modify the parameters including path, env, publish-profile, etc.
![image](https://github.com/spark-classes/assignment-1-Maolin-Wei/assets/144057115/5d846030-fea1-42e2-bda5-43fb4386491f)

**5. Test and debug the Deployment:** Verify if the deployment is successful. If not, check the error information and modify the configuration setting in the .yaml file.
![image](https://github.com/spark-classes/assignment-1-Maolin-Wei/assets/144057115/33d861e2-a01c-4e26-a0ac-cf687b37224a)
