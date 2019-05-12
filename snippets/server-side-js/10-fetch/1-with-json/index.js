(async () => {
    const data = {
        title: "The Unparalleled Adventure of One Hans Pfaall",
        year: "1835",
        text: "text text text"
    };
    const post = await fetch('./post-this-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    });
    // Please note, if the body is a string, then Content-Type is set to text/plain;charset=UTF-8 by default
    // So we use headers option to send application/json instead
    alert(`Response: ${await post.text()}`);
})();