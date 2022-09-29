// Assignment Code
var generateBtn = document.querySelector("#generate");

var alpha = { name: 'alphabetic', chars: 'abcdefghijklmnopqrstuvqxyz', isIncluded: false };
var nums = { name: 'numeric', chars: '0123456789', isIncluded: false };
var specChars = { name: 'special', chars: ' !"#$%&\'()*+,-./:;<=>?@{\\]^_`{|}~', isIncluded: false };
var charArray = [alpha, nums, specChars];
// Write password to the #password input
function writePassword() {
  var length = prompt("How long should your password be? 8 to 128 (inclusive)?")
  while (length < 8 || length > 128) {
    length = prompt("Please enter a length between 8 and 128");
  }

  charArray.forEach(askToIncludeChars);
  while (charArray.filter(charObj => charObj.isIncluded).length == 0) {
    alert("Please select at least one type of character to include");
    charArray.forEach(askToIncludeChars);
  }

  var characterSet = getCharacterSet(charArray.filter(charObj => charObj.isIncluded))
  var password = generatePassword(length, characterSet);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function askToIncludeChars(characterObject) {
  characterObject.isIncluded = false;
  characterObject.isIncluded = confirm("Include " + characterObject.name + " characters?");
}

function generatePassword(length, characterSet) {
  var password = [];
  for (i = 0; i < length; ++i) {
    password[i] = getRandomCharacter(characterSet.includedChars);
  }
  for (i = 0; i < characterSet.requiredChars.length; ++i) {
    password[getRandomIndex(password)] = characterSet.requiredChars[i];
  }
  return password.join('');
}

function getCharacterSet(charObjects) {
  characterSet = { requiredChars: '', includedChars: '' }
  charObjects.forEach(charObj => characterSet['requiredChars'] += getRandomCharacter(charObj.chars));
  charObjects.forEach(charObj => characterSet['includedChars'] += charObj.chars);
  return characterSet;
}

function getRandomCharacter(string) {
  return string.charAt(getRandomIndex(string));
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

