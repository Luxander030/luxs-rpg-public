const BigMath = {
    // Returns the maximum of two values
    max: (a, b) => (a > b ? a : b),

    // Returns the minimum of two values
    min: (a, b) => (a < b ? a : b),

    // Returns any negative value into a positive
    abs: (n) => (n < 0n ? -n : n),

    // Keeps a value between two valueus
    clamp: (val, min, max) => (val < min ? min : (val > max ? max : val)),

    // Returns -1n, 0n, or 1n depending on the sign
    sign: (n) => (n > 0n ? 1n : n < 0n ? -1n : 0n),

    // Note: exponent must be a BigInt or error
    pow: (base, exp) => base ** exp,

    // Power of 2 check
    isPowerOfTwo: (n) => {
        return n > 0n && (n & (n - 1n)) === 0n;
    },

    // Next/Previous power of 2
    nextPow2: (n) => {
        if (n <= 1n) return 1n;
        n--;
        let p = 1n;
        while (n > 0n) {
            n >>= 1n;
            p <<= 1n;
        }
        return p;
    },

    // Square Root
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
    },

    // Greatest Common Divisor
    gcd: (a, b) => {
        a = BigMath.abs(a);
        b = BigMath.abs(b);
        while (b) {
            a %= b;
            [a, b] = [b, a];
        }
        return a;
    },

    // Extended GCD (builds modular inverse + solves Diophantine equations)
    egcd: (a, b) => {
        if (a === 0n) return [b, 0n, 1n];
    
        let [g, x1, y1] = BigMath.egcd(b % a, a);
    
        let x = y1 - (b / a) * x1;
        let y = x1;
    
        return [g, x, y];
    },

    // Lowest Common Multiple
    lcm: (a, b) => (a === 0n || b === 0n) ? 0n : BigMath.abs(a * b) / BigMath.gcd(a, b),

    // Modulo
    mod: (n, m) => ((n % m) + m) % m,

    // Modulo inverse (very useful for crypto / combinatorics)
    modInv: (a, mod) => {
        let m0 = mod, x0 = 0n, x1 = 1n;
    
        if (mod === 1n) return 0n;
    
        while (a > 1n) {
            let q = a / mod;
            [a, mod] = [mod, a % mod];
            [x0, x1] = [x1 - q * x0, x0];
        }
    
        if (x1 < 0n) x1 += m0;
        return x1;
    },

    // Bit Length
    bitLength: (n) => { if (n === 0n) return 0; return n.toString(2).length;},

    // Returns the factorial of a number
    factorial: (n) => {
        if (n < 0n) throw new Error("Negative factorial");
        let res = 1n;
        for (let i = 2n; i <= n; i++) res *= i;
        return res;
    },

    // Returns the sum of all numbers
    sum: (...nums) => nums.reduce((a, b) => a + b, 0n),

    // Harmonic sum
    harmonic: (n) => {
        let sum = 0n;
        for (let i = 1n; i <= n; i++) {
            sum += 1n / i;
        }
        return sum;
    },

    // Retusn the average of a cetain amount of numbers
    avg: (...nums) => nums.reduce((a, b) => a + b, 0n) / BigInt(nums.length),

    // Chooses a random number from the two numbers the user provides
    random: (min, max) => {
        if (min > max) [min, max] = [max, min];
        const range = max - min;
        const bitLength = range.toString(2).length;
        const byteLength = Math.ceil(bitLength / 8);
        let rand;
        do {
            const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
            rand = bytes.reduce((acc, b) => (acc << 8n) + BigInt(b), 0n);
            const mask = (1n << BigInt(bitLength)) - 1n;
            rand &= mask;
        } while (rand > range);
        return min + rand;
    },

    // Genralization of square root
    nthRoot: (n, root) => {
        if (n < 0n) throw new Error("Negative base");
        if (root <= 0n) throw new Error("Root must be positive");
        if (n === 0n) return 0n;
        let x = n / root + 1n;
        let y = ((root - 1n) * x + n / (x ** (root - 1n))) / root;
        while (y < x) {
            x = y;
            y = ((root - 1n) * x + n / (x ** (root - 1n))) / root;
        }
        return x;
    },

    // Number of ways to choose k items from n
    combinations: (n, k) => {
        if (k < 0n || k > n) return 0n;
        if (k === 0n || k === n) return 1n;
        if (k > n / 2n) k = n - k;
        let res = 1n;
        for (let i = 1n; i <= k; i++) {
            res = res * (n - i + 1n) / i;
        }
        return res;
    },

    // Fibonacci sequence (Iterative for performance)
    fib: (n) => {
        if (n < 0n) throw new Error("Negative index");
        let a = 0n, b = 1n;
        for (let i = 0n; i < n; i++) {
            [a, b] = [b, a + b];
        }
        return a;
    },

    // Fast Modular Exponentiation: (base ** exp) % mod
    modPow: (base, exp, mod) => {
        if (mod === 0n) throw new Error("Division by zero");
        let res = 1n;
        base %= mod;
        while (exp > 0n) {
            if (exp % 2n === 1n) res = (res * base) % mod;
            base = (base * base) % mod;
            exp >>= 1n;
        }
        return res;
    },

    // Primality test (Basic version; use Miller-Rabin for high-perf crypto)
    isPrime: (n) => {
        if (n < 2n) return false;
        if (n % 2n === 0n) return n === 2n;
        if (n % 3n === 0n) return n === 3n;
        for (let i = 5n; i * i <= n; i += 6n) {
            if (n % i === 0n || n % (i + 2n) === 0n) return false;
        }
        return true;
    },

    // Prime factorization
    primeFactors: (n) => {
        n = BigMath.abs(n);
        const factors = [];
    
        while (n % 2n === 0n) {
            factors.push(2n);
            n /= 2n;
        }
    
        for (let i = 3n; i * i <= n; i += 2n) {
            while (n % i === 0n) {
                factors.push(i);
                n /= i;
            }
        }
    
        if (n > 2n) factors.push(n);
        return factors;
    },

    // Logarithm base 2 (identical to bitLength - 1)
    log2: (n) => {
        if (n <= 0n) throw new Error("Logarithm of non-positive number");
        return BigInt(n.toString(2).length - 1);
    },

    // Integer log base 10 (useful for digit count)
    log10: (n) => {
        if (n <= 0n) throw new Error("Log of non-positive number");
        let count = 0n;
        while (n >= 10n) {
            n /= 10n;
            count++;
        }
        return count;
    },

    // Digital count (base 10)
    digitCount: (n) => {
        n = BigMath.abs(n);
        if (n === 0n) return 1n;
        return BigMath.log10(n) + 1n;
    },

    // Population count (number of bits set to 1)
    popcount: (n) => {
        n = n < 0n ? ~n : n;
        let count = 0n;
        while (n) {
            n &= n - 1n;
            count++;
        }
        return count;
    },

    // Return the number of trailing zeros in binary representation
    countTrailingZeros: (n) => {
        if (n === 0n) return 0n;
        let count = 0n;
        while ((n & 1n) === 0n) {
            n >>= 1n;
            count++;
        }
        return count;
    },

    // Test, Set, Clear, Toggle specific bits
    testBit: (n, i) => (n & (1n << BigInt(i))) !== 0n,
    setBit: (n, i) => n | (1n << BigInt(i)),
    clrBit: (n, i) => n & ~(1n << BigInt(i)),
    tglBit: (n, i) => n ^ (1n << BigInt(i)),

    // Integer square check
    isPerfectSquare: (n) => {
        const r = BigMath.sqrt(n);
        return r * r === n;
    },

};