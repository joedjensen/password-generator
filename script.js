// Assignment Code
var generateBtn = document.querySelector("#generate");

// create objects for each set of characters. 
// name to be used in messages
// characters included in set
// boolean indicating whether to include them
var lowerAlpha = { name: 'lower case', chars: 'abcdefghijklmnopqrstuvqxyz', isIncluded: false };
var upperAlpha = { name: 'upper case', chars: lowerAlpha.chars.toUpperCase(), isIncluded: false }
var nums = { name: 'numeric', chars: '0123456789', isIncluded: false };
var specChars = { name: 'special', chars: ' !"#$%&\'()*+,-./:;<=>?@{\\]^_`{|}~', isIncluded: false };
// create array of objects
var characterSetArray = [lowerAlpha, upperAlpha, nums, specChars];
// Write password to the #password input
function writePassword() {
  // prompt user to input length
  var length = prompt("How long should your password be? 8 to 128 (inclusive)?")
  // if length is not between 8 and 128 prompt again
  while (length < 8 || length > 128) {
    length = prompt("Please enter a length between 8 and 128");
  }
  // for each element of the array, ask user whether or not to include the characters
  characterSetArray.forEach(askToIncludeChars);
  // check that the at least one element has isIncluded set to true
  // otherwise alert and reprompt
  while (characterSetArray.filter(charObj => charObj.isIncluded).length == 0) {
    alert("Please select at least one type of character to include");
    characterSetArray.forEach(askToIncludeChars);
  }
  // gets required and included chars.
  // required chars are used to almost guarantee that one of each selected type is included 
  var inputCharacters = getIncludedChars(characterSetArray.filter(charObj => charObj.isIncluded))
  //generate password of length with selected characters
  var password = generatePassword(length, inputCharacters);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// helper function to prompt user to include or exclude characters
function askToIncludeChars(characterObject) {
  // reset the flag
  characterObject.isIncluded = false;
  // use the object name to write the message
  characterObject.isIncluded = confirm("Include " + characterObject.name + " characters?");
}

// function to generate password of a given length from an array of character sets
function generatePassword(length, inputCharacters) {
  // initialize empty array
  var password = [];
  // iterate up to the length, placing a random character from the included characters at selected index
  for (i = 0; i < length; ++i) {
    password[i] = getRandomCharacter(inputCharacters.includedChars);
  }
  // reverse the pattern to place selected elements at random indices. 
  // this almost guarantees that one of each will be included.
  // possible collisions to make not true e.g. lowerCase and then upperCase both written to [2].
  for (i = 0; i < inputCharacters.requiredChars.length; ++i) {
    password[getRandomIndex(password.length)] = inputCharacters.requiredChars[i];
  }
  return password.join('');
}

// creates an object with requiredChars and includedChars
// required chars is filled with a string containing one character from each character set object passed to the function
// included chars is filled with a string containing all the characters from the selected character sets
function getIncludedChars(characterSetArray) {
  characterSet = { requiredChars: '', includedChars: '' }
  characterSetArray.forEach(charObj => characterSet['requiredChars'] += getRandomCharacter(charObj.chars));
  characterSetArray.forEach(charObj => characterSet['includedChars'] += charObj.chars);
  return characterSet;
}

// helper function to get a random character from a string. 
function getRandomCharacter(string) {
  return string.charAt(getRandomIndex(string.length));
}


// helper function to get a random index given bounds
function getRandomIndex(length) {
  return Math.floor(Math.random() * length)
}