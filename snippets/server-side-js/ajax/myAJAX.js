// Create an Https Request
const xmlhttp = new XMLHttpRequest();

// assign a function to call in case of
// a successful request
xmlhttp.onreadystatechange = function() {
  if(this.readyState === 4 && this.status === 200) {
    processResponce(this);
  }
};

// or we can listen to a successful response
// on the onload event
xmlhttp.onload = function() {
  processResponce(this);
};

// we can request files (XML or JSON) be sent
// to a client via GET (asynchronously === true)
xmlhttp.open('GET', 'expl.xml', true);
xmlhttp.send();

// if we are sending a request to a PHP application
// we should send parameters as strings
// we can do it either via GET or POST
const stringToSend = '?q=dogs';

// using GET
xmlhttp.open('GET', 'https://www.google.com/search' + stringToSend, true);
xmlhttp.send();

// using POST
xmlhttp.open('POST', 'https://www.google.com/search', true);

// the setRequestHeader method should be called
// before send but after open
req.setRequestHeader('Content-Type', 'text/plain');

// include info to send as a parameter
xmlhttp.send(stringToSend);

const processResponce = function(xmlhttp) {
  // extracting xml
  const xml = xmlhttp.responseXML;

  // xmlhttp.responseText would print out the text of the .xml file :)
  // if xmlhttp.responseText is in JSON format we can convert it to obj

  // extracting plain text (to be converted to an object
  // via JSON for instance)
  const txt = xmlhttp.responseText;

  // working with xml
  let art = 'artists:';
  const CDs = xml.getElementsByTagName("CD");
  Array.from(CDs).forEach(cd => {
    art += ` ${cd.getElementsByTagName('ARTIST')[0].childNodes[0].nodeValue},`;
  });

  console.log(art, txt);
  document.write(art);
};