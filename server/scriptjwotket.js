const NodeRSA = require("node-rsa");
const fs = require("fs");

// Create a new RSA key instance
const key = new NodeRSA({ b: 2048 });

// Generate the private and public keys
const privateKey = key.exportKey("private");
const publicKey = key.exportKey("public");

// Save the keys to files
fs.writeFileSync("private.pem", privateKey);
fs.writeFileSync("public.pem", publicKey);

console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);
