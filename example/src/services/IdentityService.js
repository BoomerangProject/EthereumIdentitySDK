class IdentityService {
  constructor(sdk, emitter) {
    this.sdk = sdk;
    this.emitter = emitter;
    if (localStorage.getItem('identity')) {
      this.identity = JSON.parse(localStorage.getItem('identity'));
    } else {
      this.identity = {};
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
    localStorage.setItem("identity", JSON.stringify(this.identity)); //MAKE THIS MORE SECURE, THIS IS TEMPORARY WAY TO STORE USER IDENTITY.
    this.emitter.emit('identityCreated', this.identity);
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

  async isIdentitySavedLocally() {
    if (this.identity.name) {
      return true;
    } else {
      return false;
    }
  }
}

export default IdentityService;
