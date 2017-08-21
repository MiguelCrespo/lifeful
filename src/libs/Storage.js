import localforage from 'localforage';

// Configure localforage config
localforage.config({
  name: 'base',
  version: 1.0,
});

let instances = {};

export default class Storage {
  static setItem(key, obj, instance) {
    let actualInstance = localforage;

    if (instance && !instances.hasOwnProperty(instance)) {
      instances[instance] = localforage.createInstance({
        name: instance,
      });
    }

    if (instance) {
      actualInstance = instances[instance];
    }

    return actualInstance.setItem(key, obj);
  }

  static getItem(key, defaultValue = null, instance) {
    if (instance && !instances.hasOwnProperty(instance)) return defaultValue;

    if (instance && instances.hasOwnProperty(instance))
      return instances[instance].getItem(key);

    return localforage.getItem(key).then(value => {
      return value || defaultValue;
    });
  }

  static removeItem(key, instance) {
    if (instance && instances.hasOwnProperty(instance))
      return instances[instance].removeItem(key);

    localforage.removeItem(key);
  }
}
