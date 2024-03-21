const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

module.exports = async function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);

    // Initialize Azure Key Vault client
    const credential = new DefaultAzureCredential();
    const keyVaultName = process.env.KEY_VAULT_NAME;
    const kvUrl = `https://${keyVaultName}.vault.azure.net/`;
    const secretClient = new SecretClient(kvUrl, credential);
    
    try {
        const secretName = "Secret3";
        const retrievedSecret = await secretClient.getSecret(secretName);
        context.log(`Secret3 = This is ${retrievedSecret.value}`);
    } catch (error) {
        context.log(`Error retrieving Secret3: ${error}`);
    }
};
