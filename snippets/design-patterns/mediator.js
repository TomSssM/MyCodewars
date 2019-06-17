// In the Mediator design pattern we have lots of Colleagues that
// communicate with each other through Mediator:
//
//                    Mediator
//          _____________|______________
//          |            |            |
//      Colleague1   Colleague1   Colleague1
//
// They each can tell the Mediator something and in response Mediator can
// tell them something back. It is kind of like Airport Traffic Control System.
// All planes communicate with it and it tells them what to do. And the ATC tower
// is the one that controls that planes don't destroy one another. Thus planes
// have normal traffic though they don't communicate with one another.
// Let's check out this pattern on an example of participants that join a chat session:

class Participant {
    constructor(name) {
        this.name = name;
        this.chatroom = null;
    }

    send(message, to) {
        this.chatroom.send(message, this, to);
    }

    receive(message, from) {
        console.log(`${from.name} to ${this.name}: ${message}`);
    }
}

class Chatroom {
    constructor() {
        this.participants = {};
    }

    register(participant) {
        this.participants[participant.name] = participant;
        participant.chatroom = this;
    }

    send(message, from, to) {
        if (to) {
            // we know to whom
            to.receive(message, from);
        } else {
            // we don't know to whom, thus
            // send to everybody
            const names = Object.keys(this.participants);
            let participant;
            names.forEach(name => {
                participant = this.participants[name];
                if (participant !== from) {
                    participant.receive(message, from);
                }
            });
        }
    }
}

const beau = new Participant("Beau");
const quincy = new Participant("Quincy");
const rafael = new Participant("Rafael");
const berkeley = new Participant("Berkeley");
const evaristo = new Participant("Evaristo");
const chatroom = new Chatroom();

chatroom.register(beau);
chatroom.register(quincy);
chatroom.register(rafael);
chatroom.register(berkeley);
chatroom.register(evaristo);

quincy.send("How's it going?");
beau.send("The YouTube channel is up to 1 million subscribers!", quincy);
rafael.send("The FCC wiki is more popular than Wikipedia!", quincy);
evaristo.send("98% of our graduates got their dream job!", quincy);
berkeley.send("The government forked our repo and is now using it to create world peace!", quincy);

// Output:
// "Quincy to Beau: How's it going?"
// "Quincy to Rafael: How's it going?"
// "Quincy to Berkeley: How's it going?"
// "Quincy to Evaristo: How's it going?"
// "Beau to Quincy: The YouTube channel is up to 1 million subscribers!"
// "Rafael to Quincy: The FCC wiki is more popular than Wikipedia!"
// "Evaristo to Quincy: 98% of our graduates got their dream job!"
// "Berkeley to Quincy: The government forked our repo and is now using it to create world peace!"