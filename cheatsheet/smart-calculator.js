// Your task is to implement class `SmartCalculator`. All methods in class should be *chainable*.
// The priority of different operations should be kept in mind.
// It means, that `2 + 2 * 2` is `6`, not `8`.
//
// For example:
// ```js
//   const calculator = new SmartCalculator(2);
//
//   const value = calculator
//     .add(2)
//     .multiply(2);
//
//   console.log(value); // 6
// ```
//
// Constructor should take initial value.
// Be sure, that all tests work with *integers*.

class SmartCalculator {
    static ADDITION = '+'

    static SUBTRACTION = '-'

    static MULTIPLICATION = '*'

    static DIVISION = '/'

    static POW = '^'

    static OPERATIONS_PRECEDENCE = [
        this.POW,
        this.MULTIPLICATION,
        this.DIVISION,
        this.SUBTRACTION,
        this.ADDITION,
    ]

    static DIRECTIONS = {
        FORWARD: '->',
        BACKWARD: '<-',
    }

    constructor(initialValue) {
        this._values = [initialValue];
        this._operations = [];
    }

    valueOf() {
        this._iterateOperations((operation, index) => {
            const val1 = this._values[index];
            const val2 = this._values[index + 1];

            this._values.splice(
                index,
                2,
                this._handleOperation(operation, val1, val2),
            );

            this._operations.splice(index , 1);
        });

        return this._values.pop();
    }

    _iterateOperations(cb) {
        SmartCalculator.OPERATIONS_PRECEDENCE.forEach((operation) => {
            this._currentOperation = operation;
            this._setOperationDirection();

            for (let i = this._initCounter(); this._condition(i); i = this._nextStep(i)) {
                const currentOperation = this._operations[i];

                if (currentOperation === operation) {

                    const out = cb(currentOperation, i);

                    if (!out && out !== 0) {
                        i = this._prevStep(i);
                    } else {
                        i = out;
                    }
                }
            }
        });
    }

    _setOperationDirection() {
        let direction;

        switch (this._currentOperation) {
            case SmartCalculator.POW:
                direction = SmartCalculator.DIRECTIONS.BACKWARD;
                break;
            default:
                direction = SmartCalculator.DIRECTIONS.FORWARD;
        }

        this._direction = direction;
    }

    _nextStep(val) {
        return this._direction === SmartCalculator.DIRECTIONS.FORWARD
            ? val + 1
            : val - 1;
    }

    _prevStep(val) {
        return this._direction === SmartCalculator.DIRECTIONS.FORWARD
            ? val - 1
            : val + 1;
    }

    _condition(val) {
        return this._direction === SmartCalculator.DIRECTIONS.FORWARD
            ? val < this._operations.length
            : val >= 0;
    }

    _initCounter() {
        return this._direction === SmartCalculator.DIRECTIONS.FORWARD
            ? 0
            : this._operations.length - 1;
    }

    _handleOperation(operation, val1, val2) {
        switch (operation) {
            case SmartCalculator.DIVISION:
                return val1 / val2;
            case SmartCalculator.MULTIPLICATION:
                return  val1 * val2;
            case SmartCalculator.SUBTRACTION:
                return val1 - val2;
            case SmartCalculator.ADDITION:
                return val1 + val2;
            case SmartCalculator.POW:
                return val1 ** val2;
            default:
                throw new Error(`Unknown operation ${operation}`);
        }
    }

    _carryOutOperation(operation, value) {
        this._operations.push(operation);
        this._values.push(value);
        return this;
    }

    add(number) {
        return this._carryOutOperation(SmartCalculator.ADDITION, number);
    }

    subtract(number) {
        return this._carryOutOperation(SmartCalculator.SUBTRACTION, number);
    }

    multiply(number) {
        return this._carryOutOperation(SmartCalculator.MULTIPLICATION, number);
    }

    devide(number) {
        return this._carryOutOperation(SmartCalculator.DIVISION, number);
    }

    pow(number) {
        return this._carryOutOperation(SmartCalculator.POW, number);
    }
}
