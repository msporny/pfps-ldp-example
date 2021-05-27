# An Example of LDP for PFPS

This is an artisanal example of Linked Data Proofs for PFPS.

# Quickstart

```
npm i
node index.js
```

# Usage

To sign a Linked Data document in a way consistent with https://w3c-ccg.github.io/ld-proofs/#proof-algorithm do the following:

1. Modify `unsignedData` in index.js to be a valid JSON-LD document ensuring the @context is valid for the data being signed (e.g., all terms defined).
2. If you want to modify the signing key, modify `mockKeyPair2020` in `mock-data.js`.
3. Set `controller` in `mock-data.js` to a URI that identifies the controller (aka owner) of the key material.
4. Set `suite.date` to a valid ISO8601 datetime.

To verify, pass the `signedData` to `jsigs.verify` and print the result, which will contain a variety of verified information.

## Example Output

```
-------------- UNSIGNED DATA ---------------
{
  "@context": {
    "title": "https://schema.org#title"
  },
  "title": "Hello world!"
}
-------------- SIGN ---------------
{
  "@context": [
    {
      "title": "https://schema.org#title"
    },
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "title": "Hello world!",
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2021-05-29T19:23:24Z",
    "verificationMethod": "https://pfps.example/issuer#z6MkjLrk3gKS2nnkeWcmcxiZPGskmesDpuwRBorgHxUXfxnG",
    "proofPurpose": "assertionMethod",
    "proofValue": "z4oey5q2M3XKaxup3tmzN4DRFTLVqpLMweBrSxMY2xHX5XTYVQeVbY8nQAVHMrXFkXJpmEcqdoDwLWxaqA3Q1geV6"
  }
}
-------------- VERIFY ---------------
{
  "verified": true,
  "results": [
    {
      "proof": {
        "@context": [
          {
            "title": "https://schema.org#title"
          },
          "https://w3id.org/security/suites/ed25519-2020/v1"
        ],
        "type": "Ed25519Signature2020",
        "created": "2021-05-29T19:23:24Z",
        "verificationMethod": "https://pfps.example/issuer#z6MkjLrk3gKS2nnkeWcmcxiZPGskmesDpuwRBorgHxUXfxnG",
        "proofPurpose": "assertionMethod",
        "proofValue": "z4oey5q2M3XKaxup3tmzN4DRFTLVqpLMweBrSxMY2xHX5XTYVQeVbY8nQAVHMrXFkXJpmEcqdoDwLWxaqA3Q1geV6"
      },
      "verified": true,
      "purposeResult": {
        "valid": true,
        "controller": {
          "@context": "https://w3id.org/security/v2",
          "id": "https://pfps.example/issuer",
          "assertionMethod": [
            "https://pfps.example/issuer#z6MkjLrk3gKS2nnkeWcmcxiZPGskmesDpuwRBorgHxUXfxnG"
          ]
        }
      }
    }
  ]
}
```
