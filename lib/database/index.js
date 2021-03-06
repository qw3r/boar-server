'use strict';

class Database {

  constructor(mongoose, uri) {
    this._mongoose = mongoose;
    this._uri = uri;
  }


  connect() {
    return new Promise((resolve, reject) => {
      let cb = (err) => {
        if (err) return reject(err);
        resolve();
      };
      if (this._mongoose.connection.readyState === 1) return cb();
      if (this._mongoose.connection.readyState === 2) {
        return this._mongoose.connection.once('connected', cb);
      }
      this._mongoose.connect(this._uri, cb);
    });
  }


  disconnect() {
    return new Promise((resolve, reject) => {
      if (this._mongoose.connection.readyState === 0) return resolve();
      this._mongoose.connection.close((err) => {
        if (err) return reject(err);
        resolve();
      });
    });

  }

}

module.exports = Database;
