const select = document.querySelector('#genres');

// alert the currently selected option
alert(select.options[select.selectedIndex].text);

const option = new Option('classic', 'Classic', true, true);
select.append(option);
// or
// const newOption = new Option("Classic", "classic");
// select.append(newOption);
// newOption.selected = true;