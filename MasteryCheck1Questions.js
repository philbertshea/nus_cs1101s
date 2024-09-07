// Scoping: What is the result of this function below?
function w(z) {
    const w = x => x + 1;
    return x => y => w(x + y + n);
}

const n = 20;
display(w(10)(1)(2));


// Higher Order Functions
// What does this return? Is addition taking place here?
function f(g, x) {
    return x;
}
f(x => x + 1, 3);


// Does this have an iterative or a recursive process?
// Which of the following does it follow, under applicative order evaluation?
function f(x) {
    return x === 0 || x === 1
            ? x
            : f(x-1) + f(x-2);
}
f(3);

/* Explain what's wrong with the following evaluation order
f(3)
f(3-1) + f(3-2)
f(2) + f(1)
f(2-1) + f(2-2) + f(1)
f(1) + f(0) + f(1)
1 + f(0) + 1
2 + f(0)
2
*/
