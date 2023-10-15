/*const add1 = x => x + 1;
const twice = f => x => f(f(x));
twice(add1)(2);*/

/*
function f(x) {
    let a = 10;
    function g(x) {
        if (x<2) {
            return g(x+1);
        } else {
            let a = 20;
            a = a + x;
            return x;
        }
    }
    a = g(1);
}
f(100);*/

/*
let i=0;
while(i < 2) {
    let x = i;
    i = i + 1;
}*/

let i=0;
const xs = pair(10, null);
while (i<2) {
    let p = pair(i, null);
    set_tail(xs, p);
    //xs = tail(xs);
    i = i + 1;
}

