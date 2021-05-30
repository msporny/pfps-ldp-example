/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
const jsigs = require('jsonld-signatures');
const jsonld = require('jsonld');

const {purposes: {AssertionProofPurpose}} = jsigs;
const {Ed25519VerificationKey2020} = require('@digitalbazaar/ed25519-verification-key-2020');
const {Ed25519Signature2020, suiteContext} = require('@digitalbazaar/ed25519-signature-2020');
const {mockKeyPair2020, controllerDoc2020} = require('./mock-data.js');
const {loader} = require('./documentLoader.js');

// set up the document loader that is used to load URLs from local (secure)
// static files and/or the Internet
const documentLoader = loader.build();

async function main() {
  // the unsigned data (RDF Dataset) that will be digitally signed using the
  // algorithms described in the Linked Data Proofs specification
  const unsignedData = {
    '@context': {
      title: 'https://schema.org#title'
    },
    title: 'Hello world!',
  };
  console.log('-------------- UNSIGNED DATA ---------------');
  console.log(JSON.stringify(unsignedData, null, 2));

  // convert JSON-LD to NQuads
  const nquads = await jsonld.toRDF(unsignedData, {
    documentLoader,
    format: 'application/n-quads'
  });
  console.log('\n-------------- NQUADS ---------------');
  console.log(nquads);

  // Perform RDF Dataset canonicalization on the unsigned data
  const c14nQuads = await jsonld.canonize(unsignedData, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads'
  });
  console.log('\n-------------- CANONICALIZED NQUADS ---------------');
  console.log(c14nQuads);

  // set up the keypair that will be used to generate the digital signature
  const keyPair = await Ed25519VerificationKey2020.from({...mockKeyPair2020});
  // create the cryptosuite that will perform the signature
  let suite = new Ed25519Signature2020({key: keyPair});
  // set the creation date for the signature as a valid ISO8601 datetime
  suite.date = '2021-05-29T19:23:24Z';

  // digitally sign the data by canonicalizing the RDF Dataset, serializing
  // to NQuads, hashing the NQuads, and generating a signature over the
  // hashed value
  const signedData = await jsigs.sign(unsignedData, {
    suite,
    purpose: new AssertionProofPurpose(),
    documentLoader
  });
  console.log('\n-------------- SIGN ---------------');
  console.log(JSON.stringify(unsignedData, null, 2));

  // create the cryptosuite that will verify the signature
  suite = new Ed25519Signature2020();
  // verify the digital signature by removing the proof nodes in the RDF
  // Dataset, canonicalizing the RDF Dataset, serializing
  // to NQuads, hashing the NQuads, and using the hash value and the
  // associated public key value (retrieved via the documentLoader)
  // to verify the digital signature over the hash value
  const verified = await jsigs.verify(signedData, {
    suite,
    purpose: new AssertionProofPurpose(),
    documentLoader
  });

  // Perform RDF Dataset canonicalization on the signed data
  const signedC14nQuads = await jsonld.canonize(signedData, {
    algorithm: 'URDNA2015',
    format: 'application/n-quads'
  });
  console.log('\n-------------- CANONICALIZED SIGNED NQUADS ---------------');
  console.log(signedC14nQuads);

  console.log('\n-------------- VERIFY ---------------');
  console.log(JSON.stringify(verified, null, 2));

}

main();
