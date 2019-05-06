class Thenable {
    constructor(num) {
        this.num = num;
    }

    then(fun) {
        // fun === callback is false
        // I know it is confusing the browser
        // creates some sort of wrapper around it
        // yet doesn't matter, when fun() is called
        // callback is also going to be called
        fun(this.num);
    }
}

const callback = (num) => {
    console.log(num);
    return ':)';
}

new Promise(res => {
        setTimeout(() => res(2), 1000);
    })
    .then(
        data => new Thenable(data)
    )
    .then(callback)
    .then(
        val => console.log(`< ${val} />`)
    );

// after one second:
// log: 2
// log: < :) />