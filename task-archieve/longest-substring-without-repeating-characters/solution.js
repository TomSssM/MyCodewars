function lengthOfLongestSubstring(s) {
    let left = 0;
    let right = 0;
    let maxLength = 0;
    const repeated = {};

    while (right < s.length) {
        const letter = s[right];

        if (!(letter in repeated)) {
            repeated[letter] = 1;
        } else {
            repeated[letter]++;
        }

        while (repeated[letter] > 1) {
            const leftLetter = s[left];
            repeated[leftLetter]--;
            left++;

            if (repeated[leftLetter] === 0) {
                delete repeated[leftLetter];
            }
        }

        maxLength = Math.max(maxLength, right - left + 1);
        right++;
    }

    return maxLength;
}
