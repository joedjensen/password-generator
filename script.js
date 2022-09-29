// Assignment Code
var generateBtn = document.querySelector("#generate");

var alpha = {name:'alphabetic', chars: 'abcdefghijklmnopqrstuvqxyz', isIncluded: false};
var nums = {name:'numeric', chars: '0123456789', isIncluded: false};
var specChars = {name: 'special',chars:' !"#$%&\'()*+,-./:;<=>?@{\\]^_`{|}~', isIncluded: false};
var charArray = [alpha, nums, specChars];
// Write password to the #password input
function writePassword() {
  var length = prompt("How long should your password be? 8 to 128 (inclusive)?")
  while (length < 8 || length > 128){
    length = prompt("Please enter a length between 8 and 128");
  }

  charArray.forEach(askToIncludeChars);
  while (charArray.filter(charObj => charObj.isIncluded).length == 0){
    alert("Please select at least one type of character to include");
    charArray.forEach(askToIncludeChars);
  }

  var password = generatePassword(length, charArray.filter(charObj => charObj.isIncluded));
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function askToIncludeChars(characterObject){
  characterObject.isIncluded = false;
  characterObject.isIncluded = confirm("Include " + characterObject.name + " characters?");
}

function generatePassword(length, charObjects) {
  var includedChars='';
  charObjects.forEach(charObj => includedChars+=charObj.chars);
  var password=[];
  console.log(includedChars);
  for (i=0; i<length; ++i) {
    password[i] = includedChars.charAt(Math.floor(Math.random() * includedChars.length));
  }
  return password.join('');
}

