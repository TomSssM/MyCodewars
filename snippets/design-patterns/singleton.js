// Singleton is when a Class creates only one instance
// and then, well, doesn't in ever create another one at all.
// It may be handy sometimes, for instance jQuery is a singleton

// the Constructor Function way:
const singletonConstructor = (function () {
    function createSingleton() {
        // private fields:
        let _name = 'Tom';

        function _setName(newName) {
            _name = newName;
        }

        // public fields:
        function setNameToJohn() {
            _setName('John');
        }

        function setNameToDefault() {
            _setName('Tom');
        }

        return {
            setNameToJohn,
            setNameToDefault,
        };
    }

    let singletonInstance = null;

    return {
        getSingleton() {
            if (!singletonInstance) {
                singletonInstance = createSingleton();
            }
            return singletonInstance;
        },
    };
}());

const singleton1 = singletonConstructor.getSingleton();
const singleton2 = singletonConstructor.getSingleton();
singleton1 === singleton2; // true

// hardcore new one:

class Singleton {
    constructor() {
        if (!Singleton.singletonInstance) {
            Singleton.singletonInstance = this;
        }
        return Singleton.singletonInstance;
    }

    sing() {
        return 'la-la';
    }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

instance1 === instance2; // true ( making sure it is singleton )
instance1.sing(); // singleton sings!

// here is how we would export such a singleton aright so
// it remains a ingleton:
Object.freeze(instance1);
export default instance1;