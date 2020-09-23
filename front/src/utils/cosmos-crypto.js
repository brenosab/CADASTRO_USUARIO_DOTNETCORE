import cryptoJS from "crypto-js";

export function computarChave() {
  const dataAtual = new Date();
  const diaAtual = dataAtual.getDate();
  const mesAtual = dataAtual.getMonth() + 1;
  const anoAtual = dataAtual.getFullYear();

  const chave =
    Math.PI.toString().substr(6, 4) * diaAtual + (anoAtual - mesAtual);
  return chave.toString();
}

export function cifrarChave(chave) {
  const hashMD5 = cryptoJS.MD5(chave).toString();
  const k1 = hashMD5.substring(0, 16);
  return hashMD5 + k1;
}

export function decifrar(conteudo, chave) {
  try {
    const criptografia = {
      chaveHex: cryptoJS.enc.Hex.parse(chave),
      options: {
        mode: cryptoJS.mode.ECB,
        padding: cryptoJS.pad.Pkcs7,
      },
      content: {
        ciphertext: cryptoJS.enc.Base64.parse(conteudo.toString()),
      },
    };

    const conteudoDecifrado = cryptoJS.TripleDES.decrypt(
      criptografia.content,
      criptografia.chaveHex,
      criptografia.options
    );

    return conteudoDecifrado.toString(cryptoJS.enc.Utf8);
  } catch (exception) {
    return `Erro: ${exception.message}`;
  }
}
