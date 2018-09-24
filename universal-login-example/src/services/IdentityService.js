import {Wallet} from 'ethers';

class IdentityService {
  constructor(sdk, emitter) {
    this.sdk = sdk;
    this.emitter = emitter;
    if (localStorage.getItem('boomerang-identity')) {
      this.identity = JSON.parse(localStorage.getItem('boomerang-identity'));
      this.email = JSON.parse(localStorage.getItem('boomerang-email'));
    } else {
      this.identity = {};
      this.email = {};
    }
  }

  async connect() {
    const privateKey = await this.sdk.connect(this.identity.address);
    const {address} = new Wallet(privateKey);
    this.subscription = this.sdk.subscribe('KeyAdded', this.identity.address, (event) => {
      if (event.address == address) {
        this.cancelSubscription();
        this.identity = {
          name: this.identity.name,
          privateKey,
          address: this.identity.address
        };
        this.emitter.emit('setView', 'MainScreen');
      }
    });
  }

  cancelSubscription() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
  }

  async createIdentity(name) {
    this.emitter.emit('creatingIdentity', {name});
    let [privateKey, address] = await this.sdk.create(name);
    this.identity = {
      name,
      privateKey,
      address
    };
    localStorage.setItem("boomerang-identity", JSON.stringify(this.identity)); //MAKE THIS MORE SECURE, THIS IS TEMPORARY WAY TO STORE USER IDENTITY. (LOCALSTORAGE)
    this.emitter.emit('identityCreated', this.identity);
  }

  async clearIdentity() {
    this.identity = {};
    this.email = {};
    localStorage.clear();
    // Use sdk to de-register this public key from identity contract
  }

  async deregisterDevice(deviceKey){
    // Use device key to deregister a device
  }

  async execute(message) {
    await this.sdk.execute(this.identity.address, message, this.identity.privateKey);
  }

  async identityExist(identity) {
    const identityAddress = await this.sdk.identityExist(identity);
    if (identityAddress) {
      this.identity = {name: identity, address: identityAddress};
      return true;
    }
  }

  async setEmail(email) {
    this.email = email;
    localStorage.setItem("boomerang-email", JSON.stringify(email));
  }

  async isIdentitySavedLocally() {
    if (this.identity.name) {
      return true;
    } else {
      return false;
    }
  }
}

export default IdentityService;
