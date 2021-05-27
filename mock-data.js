/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
const controller = 'https://pfps.example/issuer';

const mockPublicKey2020 = {
  '@context': 'https://w3id.org/security/suites/ed25519-2020/v1',
  type: 'Ed25519VerificationKey2020',
  controller,
  id: controller + '#z6MkjLrk3gKS2nnkeWcmcxiZPGskmesDpuwRBorgHxUXfxnG',
  publicKeyMultibase: 'zEYJrMxWigf9boyeJMTRN4Ern8DJMoCXaLK77pzQmxVjf'
};

const mockKeyPair2020 = {
  type: 'Ed25519VerificationKey2020',
  controller,
  id: controller + '#z6MkjLrk3gKS2nnkeWcmcxiZPGskmesDpuwRBorgHxUXfxnG',
  publicKeyMultibase: 'zEYJrMxWigf9boyeJMTRN4Ern8DJMoCXaLK77pzQmxVjf',
  privateKeyMultibase: 'z4E7Q4neNHwv3pXUNzUjzc6TTYspqn9Aw6vakpRKpbVrCzwKWD4hQ' +
    'DHnxuhfrTaMjnR8BTp9NeUvJiwJoSUM6xHAZ'
};

const controllerDoc2020 = {
  '@context': [
    'https://www.w3.org/ns/did/v1',
    'https://w3id.org/security/suites/ed25519-2020/v1'
  ],
  id: controller,
  assertionMethod: [mockPublicKey2020]
};

module.exports = {
  controller,
  mockPublicKey2020,
  mockKeyPair2020,
  controllerDoc2020
};
