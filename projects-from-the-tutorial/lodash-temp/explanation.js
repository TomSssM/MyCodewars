// all right let's take a look at the pattern in which most
// template engines work (using Lodash as an example):
// we are going to use the function _template() provided by this
// framework to work with templates
// however let's tease some things apart before we can get going:

// the syntax for templates is (let's call <% and %> separators):
// 1) <% code %> - everything between these separators isn't inserted 
//                 but executed as code
// 2) <%= expr %> - everything between these separators is inserted as innerHTML
// 3) <%- expr %> - everything between these separators is inserted as textContent, for
//                  example: <br> isn't inserted as '<br>' (it is HTML!) but instead
//                  inserted as '&lt;br&gt;' so as not to form a tag
// 4) everything else is inserted as plain text
// note: we will get down to exactly what these mean in a sec

// the template function takes a string and returns another function
const str = 
`<h1>
  <%=title%>
</h1>`;
const temp = _.template(str);

// let's take a look at the resulting function
console.log(temp);

// it is going to look like this:
// ƒ (obj) {
//   obj || (obj = {});
//   var __t, __p = '';
//   with (obj) {
//   __p += '<h1>' +
//   ((__t = (title)) == null ? '' : __t) +
//   '</h1>';
  
//   }
//   return __p
// }

// this function is created via the new Function constructor:
// new Function("obj", "<h1><%=title%></h1>");

// as a result our string (str) we pass in is parsed in a certain way
// let's now see what this function does:
// we are going to return the resulting HTML as string via writing everything
// to the variable __p. So as you can see our whole string is saved into __p except
// we replaced title with the value of the variable title

// in order to get HTML we need to invoke the temp function with the corresponding arguments:
const obj = {
  title: 'Some Title',
}

const html = temp(obj);
console.log(html);
// <h1>
//   Some Title
// </h1>

// all right let's now take a look at another example:
const str2 = 
`<ul>
  <%for(let i = 0; i < items.length; i++) { %>
    <li><%=items[i]%></li>
  <% } %>
</ul>`;

const temp2 = _.template(str2);

console.log(temp2);
// function(obj) {
//   obj || (obj = {});
//   var __t, __p = '', __j = Array.prototype.join;
//   function print() { __p += __j.call(arguments, '') }
//   with (obj) {
//   __p += '<ul>';
//   for(let i = 0; i < items.length; i++) {
//   __p += '<li>' +
//   ((__t = (items[i])) == null ? '' : __t) +
//   '</li>';
//   };
//   __p += '</ul>';
//   }
//   return __p
// }

const obj2 = {
  items: [
    'coffee',
    'tea',
    'coco',
  ],
};

const html2 = temp2(obj2);

console.log(html2);
// <ul>
//   <li>coffee</li>
//   <li>tea</li>
//   <li>coco</li>
// </ul>

// so here is a nice way to help you wrap your head around all this stuff:
// 1) everything inside the template is written into a single variable and returned as a string
// 2) whenever you write anything without <% %> it becomes directly part of the string
// 3) everything inside <%= %> or <%- %> is replaced with values of arguments
// 4) Think of the with block and mentally execute the code inside <% and %>

// here is another example with an escape:
const temp3 = _.template('<h2><%-text%></h2>');
console.log(temp3);
// ƒ (obj) {
//   obj || (obj = {});
//   var __t, __p = '', __e = _.escape;
//   with (obj) {
//   __p += '<h2>' +
//   __e(text) +
//   '</h2>';
//   }
//   return __p
// }
console.log(temp3({
  text: '<br><input type="button">'
}));
// <h2>&lt;br&gt;&lt;input type=&quot;button&quot;&gt;</h2>

// we don't have to use the with statement
// when we pass the object to temp why not refer to all the variables like:
// obj.text, obj.items, obj.title instead of the with statement
// we can do that if we pass in the second argument:

const tempNoWith = _.template('<h2><%-someOtherName.text%></h2>', {
  variable: 'someOtherName',
});

// do note however that when writing the string itself ('<h2><%-someOtherName%...') we should already
// refer to the right name 'someOtherName'

console.log(tempNoWith);
// ƒ (someOtherName) {
//   var __t, __p = '', __e = _.escape;
//   __p += '<h2>' +
//   __e(someOtherName.text) +
//   '</h2>';
//   return __p
// }

console.log(tempNoWith({
  text: 'I\'m a text!!!'
}));
// <h2>I&#39;m a text!!!</h2>