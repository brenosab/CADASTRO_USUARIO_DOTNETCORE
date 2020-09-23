/**
 * Função para transformar apenas a primeira letra de cada palavra em caixa alta
 * 
 * @export
 * @param {any} str
 * @returns
 */
export function toTitleCase(str) {
  return str.replace(/\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Verifica se o valor passado é numérico.
 * @param {any} value
 * @returns {boolean}
 */
export function isNumber(value) {
  return !isNaN(parseInt(value, 0)) && isFinite(value);
}

/**
 * Verifica se o valor passado é json.
 * @param {any} item
 * @returns {boolean}
 */
export function isJson(item) {
  item = typeof item !== "string"
    ? JSON.stringify(item)
    : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }
  if (typeof item === "object" && item !== null) {
    return true;
  }
  return false;
}
/**
 * Função para formatar a data em formato padrão
 * 
 * @export
 * @param {any} str
 * @returns
 */
export function formataData(data) {
  var dia = data.substring(8, 10);
  var mes = data.substring(5, 7);
  var ano = data.substring(0, 4);
  var _data = dia + "/" + mes + "/" + ano;
  return _data;
}