function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
delay(3000).then(() => alert('runs after 3 seconds'));