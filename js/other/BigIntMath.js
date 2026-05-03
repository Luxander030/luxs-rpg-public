const BigMath = {
    // Returns the larger of two values
    max: (a, b) => (a > b ? a : b),

    // Returns the smaller of two values
    min: (a, b) => (a < b ? a : b),

    // Returns the absolute value (makes negative positive)
    abs: (n) => (n < 0n ? -n : n),

    // Keeps a number between a min and max
    clamp: (val, min, max) => (val < min ? min : (val > max ? max : val)),

    // Returns -1n, 0n, or 1n depending on the sign
    sign: (n) => (n > 0n ? 1n : n < 0n ? -1n : 0n),

    // Note: exponent must be a BigInt or error
    pow: (base, exp) => base ** exp,

    sqrt: (n) => {
        if (n < 0n) throw new Error("Cannot take square root of a negative number");
        if (n < 2n) return n;

        let x = n / 2n + 1n;
        let y = (x + n / x) / 2n;
        
        while (y < x) {
            x = y;
            y = (x + n / x) / 2n;
        }
        return x;
    }

};