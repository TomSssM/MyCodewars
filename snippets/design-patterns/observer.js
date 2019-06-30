// So we have a Subject which keeps references to many Observers:
//                                         Observer3
//                   Observer1  Observer2 /
//                        \      /    ___/
//       Observer4    -----  Subject   -- Observer5
//                          /      \
//                   Observer6     Observer7
//
// The Subject may add and delete Observers. In addition it has the ability
// to notify all Observers of something.
// We are actually using an observer pattern when we add
// an Event Handler via addEventLitener or in MVC ( when the
// controller updates, the view needs to update too )

// Observer Pattern

class Subject {
    constructor() {
        this.observers = [];
    }

    subscribeObserver(observer) {
        this.observers.push(observer);
    }

    unsubscribeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers[index].notify();
        }
    }
    notifyAllObservers() {
        for(let i = 0; i < this.observers.length; i += 1) {
            this.observers[i].notify();
        }
    }
}

class Observer {
    constructor(number) {
        this.number = number;
    }

    notify() {
        console.log(`Observer number ${this.number} is notified`);
    }
}

const subject = new Subject();
const observer1 = new Observer(1);
const observer2 = new Observer(2);
const observer3 = new Observer(3);
const observer4 = new Observer(4);

subject.subscribeObserver(observer1);
subject.subscribeObserver(observer2);
subject.subscribeObserver(observer3);
subject.subscribeObserver(observer4);

subject.notifyObserver(observer2);
subject.unsubscribeObserver(observer2);
subject.notifyAllObservers();

// Output:
// Observer number 2 is notified
// Observer number 1 is notified
// Observer number 3 is notified
// Observer number 4 is notified