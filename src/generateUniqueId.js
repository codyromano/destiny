/**
* @module generateUniqueId
* @desc Create a memorable user Id out of English 
* words based on the current timestamp
*/

var fs = require('fs');

// 1,000 most common English words
var words = fs.readFileSync('commonWords.txt').toString().split("\n");

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function splitNumberIntoChunks(number, digitsPerChunk) {
  var regex = new RegExp('([0-9]){' + digitsPerChunk + '}', 'g');
  var captures = number.toString().match(regex);

  return (captures === null) ? [] : captures.map(parseFloat);
}

function getUniqueId() {
  var result = [],
      digitGroups = splitNumberIntoChunks(new Date().getTime(), 3);

  digitGroups.forEach(function(number) {
    if (words[number] !== undefined) {
      result.push(words[number]);
    }
  });

  return result.map(capitalize).join('');
}

module.exports = getUniqueId();