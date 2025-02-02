const {getAllAccounts, VaultClient, Vault, VAULTS} = require('..');
const {loadStdlib} = require('@reach-sh/stdlib');
const dotenv = require('dotenv');
dotenv.config();

(async () => {
  const mnemonic = process.env.MNEMONIC;
  const VAULT_ID = VAULTS.MainNet.algo.vaultId;
  const INDEXER_TOKEN = process.env.INDEXER_TOKEN;
  const account = new VaultClient({
    mnemonic,
    network: 'MainNet',
  });
  const vault = new Vault({id: VAULT_ID});
  const reach = loadStdlib('ALGO');
  const token = {'X-API-Key': INDEXER_TOKEN};
  const indexer = new reach.algosdk.Indexer(
      // indexer key
      token,
      // indexer url
      'https://mainnet-api.algonode.network',
      // indexer port
      '',
  );
  // recursive function to get all opted in addresses
  const accounts = await getAllAccounts(
      // application ID
      VAULT_ID,
      indexer,
      [],
  );
  // get state for each vault
  const vaultData = accounts.map( (vaultAccount) => {
    return account.getUserInfo({address: vaultAccount.address, vault});
  });
  const resolvedVaultData = await Promise.all(vaultData);
  return resolvedVaultData;
})();
