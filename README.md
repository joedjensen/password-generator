# Password Generator

## Description 

This repository contains a simple application to generate a password meeting user submitted length and included character requirements.

This repository utilizes
* HTML
* CSS
* JavaScript

[Deployed Site](https://joedjensen.github.io/password-generator/)

## Installation 
N/A

## Usage 

Click the generate password button and follow the prompts! You will be rewarded with a new password.

## Code Snippets

The driver behind this code base is an array of character set objects. We create objects representing the character sets, containing a name, a string of characters, and whether the user has selected for input.
And put these in an array.

```Javascript
var lowerAlpha = { name: 'lower case', chars: 'abcdefghijklmnopqrstuvqxyz', isIncluded: false };
.
.
.
var characterSetArray = [lowerAlpha, upperAlpha, nums, specChars];
```

We are then able to loop over these objects to display prompts, and store on the object whether to include the character set. 
```Javascript
  characterSetArray.forEach(askToIncludeChars);
  // check that the at least one element has isIncluded set to true
  // otherwise alert and reprompt
  while (characterSetArray.filter(charObj => charObj.isIncluded).length == 0) {
    alert("Please select at least one type of character to include");
    characterSetArray.forEach(askToIncludeChars);
  }
```

Selected characters are then passed to the password generation function, and used to create a password of desired length. After random characters are selected from the entire set, one of each is placed at a random index. This is not a guarantee that one of each is included (due to potential collisions).
```Javascript
  for (i = 0; i < inputCharacters.requiredChars.length; ++i) {
    password[getRandomIndex(password.length)] = inputCharacters.requiredChars[i];
  }
```
## License

Please refer to the license in the repo
