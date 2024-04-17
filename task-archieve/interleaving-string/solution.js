

// TODO: take out big guns
    // * NOTE: perhaps watching these videos at random at different times of the day is this system on steroids !!!
    // https://youtu.be/ih2OZ9-M3OM?si=57bep5dDMKBs7cuW
    // https://youtu.be/3Rw3p9LrgvE?si=tn9pxd9ogXO-EjtJ
    // https://youtu.be/EzQ_YEmR598?si=oxBaFIeVDdBHvXAe
    // https://youtube.com/playlist?list=PLjOcsOwEjb12kPbh4f1BjWh-sao0tX-Md&si=7e8s9Y6xrA4612jk

// TODO: here: tabulation: see the idea of the solution in task.md

function isInterleave(s1, s2, s3) {
    // Check if the total length of s1 and s2 is equal to s3
    if (s1.length + s2.length !== s3.length) {
        return false;
    }

    // Create a 2D dynamic programming array dp
    const dp = new Array(s1.length + 1)
        .fill(false)
        .map(() => {
            return new Array(s2.length + 1).fill(false);
        });

    // Base case: Both s1 and s2 are empty, and s3 is also empty
    dp[0][0] = true;

    // Fill the first column of dp using s1 and s3
    for (let i = 1; i <= s1.length; i++) {
        dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
    }

    // Fill the first row of dp using s2 and s3
    for (let j = 1; j <= s2.length; j++) {
        dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
    }

    // Fill the rest of the dp array based on character matching logic
    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            dp[i][j] = (
                (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
                (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1])
            );
        }
    }

    // Return whether the last cell of dp is true, indicating s3 can be formed by interleaving s1 and s2
    return dp[s1.length][s2.length];
}

const s1 = "aabcc";
const s2 = "dbbca";
const s3 = "aadbbcbcac";

console.log(isInterleave(s1, s2, s3)); // Output: true

/*

  a a b c c
a + + * * *
a + + * * *
d * * * * *
b * * + * *
b * * + * *
c * * * + +
b * * + * *
c * * * + +
a + + * * *
c * * * + +

  d b b c a
a * * * * +
a * * * * +
d + * * * *
b * + + * *
b * + + * *
c * * * + *
b * + + * *
c * * * + *
a * * * * +
c * * * + *

a 1 1 * * 2
a 1 1 * * 2
d 2 * * * *
b * 2 3 * *
b * 2 3 * *
c * * * 3 1
b * 2 3 * *
c * * * 3 1
a 1 1 * * 2
c * * * 3 1

MAYBE: take from each row one choice such so as to walk all the way down

*/
