function checkPhoneKey(key) {
  // we also check for things like 'Delete' so that the default
  // action is not prevented for them and the user is actually able
  // to use the delete key if necessary

  // however our function isn't perfect as the user can copy-paste non-numeric data
  // for this it is actually better to use events like oninput, onchange etc.

  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
    key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
}