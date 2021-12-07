import pkg from 'xbacked-sdk';
const {Account, Reserve, Vault} = pkg;
(async () => {
  const reserve = new Reserve({price: 9});
  const acc = new Account({mnemonic: '', interact: reserve});
  acc.addListener('getCollateralPrice', async () => 2);
  await acc.connectToVault({vault: new Vault({id: 186})});
  console.log('connected successful');
})();


