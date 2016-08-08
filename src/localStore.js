let localStorage = require('localStorage');

const KEY_SEPARATOR = '-';

export default class LocalStore {
  constructor(prefix, api) {
    this.prefix = prefix;
    this.api = api || localStorage;
  }

  save(key, value) {
    let type = typeof value;
    if (type === 'object') {
      value = JSON.stringify(value);
    }
    
    let storageKey = [this.prefix, key].join(KEY_SEPARATOR);
    this.api.setItem(storageKey, value);

    let storeDataTypeKey = [storageKey, 'type'].join(KEY_SEPARATOR);
    this.api.setItem(storeDataTypeKey, type);
  }

  get(key) {
    let storageKey = [this.prefix, key].join(KEY_SEPARATOR);
    let storedValue = this.api.getItem(storageKey);

    let storeDataTypeKey = [storageKey, 'type'].join(KEY_SEPARATOR);
    let storeDataType = this.api.getItem(storeDataTypeKey);
    
    switch(storeDataType) {
      case 'object':
        storedValue = JSON.parse(storedValue);
      break;
      case 'number':
        storedValue = parseFloat(storedValue);
      break;
    }
    return storedValue;
  }
}