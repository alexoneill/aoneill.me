// @author Alex O'Neill
// @file util.js

// Find the first occurrence of a value in a list
function findInList(list, elem) {
  for(var index in list)
    if(list[index] === elem)
      return index

  // Return if cannot be found
  return -1;
}
