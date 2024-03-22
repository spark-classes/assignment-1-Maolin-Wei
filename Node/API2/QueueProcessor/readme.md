# QueueTrigger - JavaScript

The `QueueTrigger` makes it incredibly easy to react to new Queues inside of Azure Queue Storage.

## How it works

The QueueTrigger activates the function when a new message is added to the specified Azure Queue Storage. Defining the path to the queue in the function's bindings will enable the function to listen for new messages and process them accordingly.

### Configuration
In function's function.json file, it specifies the binding configuration for the QueueTrigger.

`name`: The variable name used in the function code to represent the queue item.

`type`: Specifies the binding type, which is queueTrigger.

`direction`: Indicates the direction of the binding (in for input bindings).

`queueName`: The name of the queue in Azure Queue Storage.

`connection`: The name of the app setting that contains the connection string to the Azure Storage account.

### JavaScript Function Code
The code will run when triggered, it will receive the message from the queue and log it. It will also read the Key Vault environment variable and log its value.

`context`: Provides runtime information about the function, including logging.

`myQueueItem`: Represents the data from the queue message that triggered the function.

## Learn more
For more detailed information about the QueueTrigger and other bindings in Azure Functions, and GiuHub Action for container Apps, refer to the documentation:

[Azure Queue storage trigger and bindings](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue?tabs=isolated-process%2Cextensionv5%2Cextensionv3&pivots=programming-language-javascript)

[Azure Queue storage trigger for Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-javascript)

[Container Apps GitHub Action Reference](https://github.com/Azure/container-apps-deploy-action)
