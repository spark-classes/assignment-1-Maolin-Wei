const express = require('express');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const app = express();
const port = process.env.PORT || 3000

// Initialize Azure Key Vault client
const credential = new DefaultAzureCredential();
const keyVaultName = process.env.KEY_VAULT_NAME;
const kvUrl = `https://${keyVaultName}.vault.azure.net/`;

const client = new SecretClient(kvUrl, credential);

app.use('/', express.static('frontend/build'));

app.get('/api', async (req, res) => {
  try {
    const secretName = 'Secret1';
    const retrievedSecret = await client.getSecret(secretName);
    res.send(`Hello, world! This is ${retrievedSecret.value}`);
  } catch (error) {
    console.error('Error accessing secret from Key Vault:', error);
    res.status(500).send('Error accessing secret from Key Vault');
  }
});

app.listen(port, () => {
  console.log('Server listening on port '+ port);
});
