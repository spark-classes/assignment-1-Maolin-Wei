import { AzureFunction, Context, HttpRequest } from "@azure/functions"
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully. This is secret2: " + process.env.secret2
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    
    // Initialize Azure Key Vault client
    const credential = new DefaultAzureCredential();
    const keyVaultName = process.env.KEY_VAULT_NAME;
    const kvUrl = `https://${keyVaultName}.vault.azure.net/`;
    const secretClient = new SecretClient(kvUrl, credential);
    
    try {
        const secretName = "Secret2";
        const retrievedSecret = await secretClient.getSecret(secretName);
        context.log(`Secret2 = This is ${retrievedSecret.value}`);
        context.log(`This is the value of secret2 got from process.env.secret2, ${process.env.secret2}`)
    } catch (error) {
        context.log(`Error retrieving Secret2: ${error}`);
    }

    context.bindings.storageQueue = "This is a message to insert into the queue when triggered";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;
