import {defaultAccounts} from 'ethereum-waffle';

module.exports = Object.freeze({
  jsonRpcUrl: 'http://localhost:18545',
  port: 3311,
  privateKey: defaultAccounts[0].secretKey,
  chainSpec: {
    ensAddress: process.env.ENS_ADDRESS,
    chainId: 0
  },
  ensRegistrars: {
    'boomerang.eth': {
      resolverAddress: process.env.ENS_RESOLVER1_ADDRESS,
      registrarAddress: process.env.ENS_REGISTRAR1_ADDRESS,
      privteKey: process.env.ENS_REGISTRAR1_PRIVATE_KEY
    }
  }
});
