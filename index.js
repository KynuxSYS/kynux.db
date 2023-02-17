const fs = require('fs').promises;

class Database {
  constructor(filename = 'database.json') {
    this.filename = filename;
    this.data = {};
    this.load();
  }

  async load() {
    try {
      const contents = await fs.readFile(this.filename, 'utf8');
      this.data = JSON.parse(contents);
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.data = {};
      } else {
        throw error;
      }
    }
  }

  async save() {
    await fs.writeFile(this.filename, JSON.stringify(this.data, null, 2));
  }

  get(key, defaultValue = null) {
    return this.has(key) ? this.data[key] : defaultValue;
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
  }

  delete(key) {
    const result = this.has(key);
    delete this.data[key];
    this.save();
    return result;
  }

  add(key, value) {
    const result = (this.has(key) ? this.data[key] : 0) + value;
    this.data[key] = result;
    this.save();
    return result;
  }

  subtract(key, value) {
    const result = (this.has(key) ? this.data[key] : 0) - value;
    this.data[key] = result;
    this.save();
    return result;
  }

  has(key) {
    return key in this.data;
  }

  all() {
    return this.data;
  }

  type(key) {
    return typeof this.data[key];
  }

  push(key, value) {
    if (!Array.isArray(this.data[key])) {
      this.data[key] = [];
    }
    this.data[key].push(value);
    this.save();
    return this.data[key].length;
  }

  pull(key, value) {
    if (!Array.isArray(this.data[key])) {
      return false;
    }
    const index = this.data[key].indexOf(value);
    if (index === -1) {
      return false;
    }
    this.data[key].splice(index, 1);
    this.save();
    return true;
  }
}

module.exports = Database;
