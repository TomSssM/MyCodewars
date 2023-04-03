function isValid(s) {
    const stack = [];

    for (const ch of s) {
        if (ch === '(' || ch === '{' || ch === '[') {
            // if opening bracket then push into the stack
            stack.push(ch);
        } else {
            // if a closing bracket then we compare with the top of the stack
            // while comparing with top of stack we have 2 cases
            // the stack can be empty or the stack is not empty

            if (stack.length !== 0) {
                const topOfTheStack = stack[stack.length -1];

                if (
                    (ch === ')' && topOfTheStack === '(') ||
                    (ch === '}' && topOfTheStack === '{') ||
                    (ch === ']' && topOfTheStack === '[')
                ) {
                    // if matches then pop
                    stack.pop();
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    if (stack.length === 0) {
        return true;
    }

    return false;
}
