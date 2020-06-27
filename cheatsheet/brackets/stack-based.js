class BracketConfig {
    constructor(config) {
        this._bracketsConfig = config;
        this._isMirror = config[0] === config[1];
        this._mirrorSwitch = false;
    }

    _toggleMirrorSwitch() {
        const prev = this._mirrorSwitch;
        this._mirrorSwitch = !this._mirrorSwitch;
        return prev;
    }

    isInConfig(character) {
        return this._bracketsConfig.includes(character);
    }

    shouldPop(character) {
        if (!this.isInConfig(character)) {
            throw new Error('The requested character is not in a config!');
        }

        if (this._isMirror) {
            return this._toggleMirrorSwitch();
        }

        return character === this._bracketsConfig[1];
    }
}

class ConfigsStack {
    static NOT_FOUND = -1

    constructor(bracketsConfigs) {
        this._stack = [];
        this._bracketsConfigs = bracketsConfigs.map((config) => {
            return new BracketConfig(config);
        });
    }

    _findInConfigs(character) {
        for (let i = 0; i < this._bracketsConfigs.length; i += 1) {
            if (this._bracketsConfigs[i].isInConfig(character)) {
                return i;
            }
        }

        return ConfigsStack.NOT_FOUND;
    }

    _push(index) {
        this._stack.push({
            configIndex: index,
        });
    }

    _pop() {
        this._stack.pop();
    }

    get _lastConfigIndex() {
        const val = this._stack[this._stack.length - 1] || {
            configIndex: ConfigsStack.NOT_FOUND,
        };
        return val.configIndex;
    }

    processChar(character) {
        const configIndex = this._findInConfigs(character);

        if (configIndex === ConfigsStack.NOT_FOUND) {
            return true;
        }

        const config = this._bracketsConfigs[configIndex];
        const shouldPop = config.shouldPop(character);
        const lastConfigIndex = this._lastConfigIndex;

        if (shouldPop) {
            if (
                lastConfigIndex !== ConfigsStack.NOT_FOUND &&
                configIndex !== lastConfigIndex
            ) {
                return false;
            }

            if (this.isEmpty()) {
                return false;
            }

            this._pop();
        } else {
            this._push(configIndex);
        }

        return true;
    }

    isEmpty() {
        return this._stack.length === 0;
    }
}

function check(str, bracketsConfigs) {
    const stack = new ConfigsStack(bracketsConfigs);
    const strArr = str.split('');

    for (let i = 0; i < strArr.length; i += 1) {
        if (!stack.processChar(strArr[i])) {
            return false;
        }
    }

    return stack.isEmpty();
}
