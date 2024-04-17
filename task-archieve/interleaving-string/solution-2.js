function isInterleave(s1, s2, s3) {
    function inspect(left, right, s) {
        if (s.length === 0 && left.length === 0 && right.length === 0) {
            return true;
        }

        if (s.length === 0 && (left.length !== 0 || right.length !== 0)) {
            return false;
        }

        if (s[0] === left[0]) {
            if (inspect(left.slice(1), right, s.slice(1))) {
                return true;
            }
        }

        if (s[0] === right[0]) {
            if (inspect(left, right.slice(1), s.slice(1))) {
                return true;
            }
        }

        return false;
    }

    return inspect(s1, s2, s3);
}
