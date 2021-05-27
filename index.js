/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
const jsigs = require('jsonld-signatures');
const {purposes: {AssertionProofPurpose}} = jsigs;
const {Ed25519VerificationKey2020} =
  require('@digitalbazaar/ed25519-verification-key-2020');
const {Ed25519Signature2020, suiteContext} =
  require('@digitalbazaar/ed25519-signature-2020');
const {
  mockKeyPair2020,
  controllerDoc2020
} = require('./mock-data.js');
const {loader} = require('./documentLoader.js');

const documentLoader = loader.build();

async function main() {

  const unsignedData = {
    '@context': {
        title: 'https://schema.org#title'
    },
    title: 'Hello world!',
  };
  console.log('-------------- UNSIGNED DATA ---------------');
  console.log(JSON.stringify(unsignedData, null, 2));

  const keyPair = await Ed25519VerificationKey2020.from({...mockKeyPair2020});
  let suite = new Ed25519Signature2020({key: keyPair});
  suite.date = '2021-05-29T19:23:24Z';

  const signedData = await jsigs.sign(unsignedData, {
    suite,
    purpose: new AssertionProofPurpose(),
    documentLoader
  });
  console.log('-------------- SIGN ---------------');
  console.log(JSON.stringify(unsignedData, null, 2));

  suite = new Ed25519Signature2020();
  const verified = await jsigs.verify(signedData, {
    suite,
    purpose: new AssertionProofPurpose(),
    documentLoader
  });

  console.log('-------------- VERIFY ---------------');
  console.log(JSON.stringify(verified, null, 2));

}

main();
