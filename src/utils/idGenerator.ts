/**
 * Get random characters
 * @param {integer} length of string
 * @returns {string} random characters
 */
export function getRandomCharacters(length: number): string {
  let result: string = "";

  let characters: string[] = [];

  // list of numbers (1-9)
  for (var numberCharCode = 48; numberCharCode < 58; numberCharCode++)
    characters.push(String.fromCharCode(numberCharCode));
  // list of alphabets (A-Z)
  for (var alphabetCharCode = 65; alphabetCharCode < 91; alphabetCharCode++)
    characters.push(String.fromCharCode(numberCharCode));

  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters
      .join("")
      .charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
