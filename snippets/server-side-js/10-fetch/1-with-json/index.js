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
    alert(`Response: ${await post.text()}`);
})();