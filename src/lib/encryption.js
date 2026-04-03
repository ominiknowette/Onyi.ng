import sodium from "libsodium-wrappers";

export async function generateKeypair() {
  await sodium.ready;
  const pair = sodium.crypto_box_keypair();

  return {
    publicKey: sodium.to_base64(pair.publicKey),
    privateKey: sodium.to_base64(pair.privateKey),
  };
}

export async function encryptMessage(message, recipientPublicKey) {
  await sodium.ready;

  const publicKey = sodium.from_base64(recipientPublicKey);
  const ephemeral = sodium.crypto_box_keypair();
  const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
  const ciphertext = sodium.crypto_box_easy(
    sodium.from_string(message),
    nonce,
    publicKey,
    ephemeral.privateKey,
  );

  return {
    ciphertext: sodium.to_base64(ciphertext),
    nonce: sodium.to_base64(nonce),
    senderPublicKey: sodium.to_base64(ephemeral.publicKey),
  };
}

export async function decryptMessage(ciphertext, nonce, senderPublicKey, recipientPrivateKey) {
  await sodium.ready;

  const plaintext = sodium.crypto_box_open_easy(
    sodium.from_base64(ciphertext),
    sodium.from_base64(nonce),
    sodium.from_base64(senderPublicKey),
    sodium.from_base64(recipientPrivateKey),
  );

  return sodium.to_string(plaintext);
}

