/*
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
const {
  mockKeyPair2020,
  controllerDoc2020,
  mockPublicKey2020,
} = require('./mock-data.js');
const {securityLoader} = require('@digitalbazaar/security-document-loader');

const loader = securityLoader();

loader.addStatic(mockKeyPair2020.controller, controllerDoc2020);
loader.addStatic(mockPublicKey2020.id, mockPublicKey2020);

module.exports = {
  loader
};
