// Module design pattern is represented by a function
// that returns an object with private / public fields:

const ourModule = (function() {
    // private fields:
    const _privateMethod = (val) => {
        _privateVariable = val;
    };

    let _privateVariable = null;

    return {
        // public fields:
        setValueToTen: () => {
            _privateMethod(10);
        },
        getValue: () => {
            return `Value is ${_privateVariable}`;
        },
    };
}());

ourModule.getValue(); // Value is null
ourModule.setValueToTen();
ourModule.getValue(); // Value is 10

// nowadays modules are ES2015 :)