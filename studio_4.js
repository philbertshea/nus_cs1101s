function thrice(f) {
return compose(compose(f, f), f);
}

function compose(f, g){
return x => f(g(x));
}

const foo = thrice(math_sqrt);

foo(256);

thrice(thrice)(x=>x+1)(0); 
// equivalent to thrice(thrice(thrice(x => x + 1)))(0)
// which gives (x => x + 27)(0) <==> 27

const square = x => x * x;
const add1 = x => x + 1;

(thrice(thrice))(add1)(6);          // 6 + 27
(thrice(thrice))(x => x)(compose)   // compose
((thrice(thrice))(square))(1)       // 1
((thrice(thrice))(square))(2)       // 2^(2^27)




