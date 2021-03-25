const { customAlphabet } = require('nanoid');

class idGen {
  string = 'abcdefghijklmnopqrstuvwxyz';
  length = 6;

  generate() {
    return customAlphabet('abcdefghijklmnopqrstuvwxyz', 6)();
  }
}

module.exports = new idGen();
