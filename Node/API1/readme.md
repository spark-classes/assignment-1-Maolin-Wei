# HTTP Trigger and Queue Output Binding in Azure Functions

This function is an Azure Function with an HTTP trigger that responds to HTTP requests and makes an output binding to Azure Queue Storage for queue message processing.

## How It Works
The function is a HTTP trigger in Azure Functions, which enables to run in response to HTTP requests. It can specify the methods (e.g., GET, POST) that the function responds to. Additionally, The function use output bindings to send messages via Azure Queue Storage, and it has set up the Key Vault (KV) integration and can read the KV value from its configuration.

### Configuration
The function's function.json file defines how the function interacts with different Azure services through bindings.

- HTTP Trigger Binding

`"authLevel": "function"`: Specifies the authorization level required to access the function. The function level means that a function-specific API key is required to call the function.

`"type": "httpTrigger"`: Indicates that this binding is an HTTP trigger, meaning the function is invoked by HTTP requests.

`"direction": "in"`: Shows that this is an input binding, receiving data (the HTTP request).

`"name": "req"`: The name used within the function code to refer to the HTTP request data.

`"methods"`: ["get", "post"]: Lists the HTTP methods that the function will respond to.

- HTTP Output Binding
  
`"type": "http"`: Defines an HTTP output binding, used to send responses back to the HTTP client.

`"direction": "out"`: Indicates an output binding, sending data out from the function.

`"name": "res"`: The name used in the function code to refer to the HTTP response object.

- Queue Output Binding
  
`"type": "queue"`: Specifies a queue binding, which allows the function to send messages to an Azure Queue Storage.

`"direction": "out"`: This is an output binding, indicating that the function will write data to the queue.

`"name": "storageQueue"`: The variable name in the function code that represents the queue output.

`"queueName": "storagequeue"`: The name of the Azure Queue Storage queue to which the messages will be sent.

`"connection": "AzureWebJobsStorage"`: The app setting that contains the connection string to the Azure Storage account where the queue is located.

### Code (index.ts)
The code implementation will make the function to respond to HTTP GET or POST requests, retrieve and log a secret from Azure Key Vault, sends a static message to an Azure Queue Storage, and return a personalized or generic message in the HTTP response.

`process.env.secret2` will retrieve the value of Key Vault secret2 that configured in the function App environment.

`context.bindings.storageQueue` will send a message to the specified Azure Queue Storage (storageQueue as defined in the function's configuration).

## Learn More
[Grant your app access to a KeyVault](https://learn.microsoft.com/en-us/azure/app-service/app-service-key-vault-references?tabs=azure-cli#grant-your-app-access-to-a-key-vault)

[Node.js developer reference for Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=typescript%2Cwindows%2Cazure-cli&pivots=nodejs-model-v3#folder-structure)

[Azure Queue storage output bindings](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue-output?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-javascript)
