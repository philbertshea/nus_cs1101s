// 22/23 Paper
// Program X
/*
let w = 2;
function gee() {
{
let w = 3;
}
let hoo = x => (y => 100 * w + 10 * x + y);
w = 4;
return hoo;
}
{
let w = 5;
}
w = 6;
gee()(7)(8);
*/

// Program Y
/*
function something(xs, ys) {
function swap_pair(p, q) {
let head_p = head(p);
let tail_p = tail(p);
set_head(p, head(q));
set_tail(p, tail(q));
set_head(q, head_p);
set_tail(q, tail_p);
}
if (!is_null(xs)) {
swap_pair(xs, ys);
something(tail(xs), tail(ys));
}
}
let AA = list(list(11), list(22), list(33), list(44));
let BB = list(list(55), list(66), list(77), list(88));
let AA0 = AA;
let AA0_head = head(AA0);
let AA0_tail = tail(AA0);
let AA1 = tail(AA);
let AA1_head = head(AA1);
let AA1_tail = tail(AA1);
something(AA, BB);
*/

// Program Z
/*
function what(rows) {
let M = [];
let rr = 0;
while (rr < rows) {
M[rr] = [];
let cc = 0;
while (cc <= rr ) {
if ( cc % 2 === 0 ) {
M[rr][cc] = () => 10 * rr + cc;
} else {
let temp = 10 * rr + cc;
M[rr][cc] = () => temp;
}
cc = cc + 1;
}
rr = rr + 1;
}
return M;
}
let AA = what(7);
*/

// 21/22 Paper
// Program A
/*
function foo(xs, ys) {
if (is_null(xs)) {
return map(x => x, ys);
} else {
const wish = foo(tail(xs), ys);
set_tail(xs, wish);
return xs;
}
}
const AA = list(list(1), list(2));
const BB = list(list(3), list(4));
const CC = foo(AA, BB);
const AA2 = tail(tail(AA));
const BB2 = tail(tail(BB));
const CC2 = tail(tail(CC));
*/
// Program B
/*
let z = 1;
let y = 1;
let x = 1;
function goo(f) {
 z = 2;
 let y = 2;
 let x = 2;
 let g = () => 100 * x + f(y);
 z = 3;
 y = 3;
 x = 3;
 return g;
}
const hoo = goo(y => 10 * y + z);
z = 4;
y = 4;
x = 4;
hoo();
*/

// Program C
/*
function moo(f, xs) {
 function dee(g, ys) {
 if (is_null(ys)) {
 return ys;
 } else {
 return pair(g(head(ys)), moo(g, tail(ys)));
 }
 }
 return dee(f, xs);
}
let L = list(1, 2, 3);
let R = moo(w => 10 * w, L);
R;
*/

// Program D
/*
function koo(fun, A) {
 const len = array_length(A);
 let m = 0;
 while (m < len) {
 A[m] = fun(A[m], A[m]);
 m = m + 1;
 }
}
function see(a, n) {
 let acc = 0;
 let i = 0;
 while (i < n) {
 let sum = acc + a;
 acc = sum;
 i = i + 1;
 }
 return acc;
}
const AA = [1, 2, 3, 4];
koo(see, AA);
AA;
*/


// 2017/18 Paper
// Program A
/*
function make_matrix(x , y) {
let a = [];
for ( let i = 0; i < x; i = i + 1) {
a[ i] = [];
for ( let j = 0; j < y; j = j + 1) {
a [i ][ j] = 0;
}
}
return a;
}
make_matrix (3 ,4);
*/

// Program B
/*
function f (x) {
function g(y) {
return (y === 0) ? x : f( y - 1);
}
return g( x );
}
f (10);
*/

// Program C
/*
function curry (f) {
return x => y => f(x , y );
}
curry ( math_pow )(3)(4);
*/

// Program D
/*
function binary_search(a , v ) {
function search ( low , high ) {
if ( low > high ) {
return false ;
} else {
let mid = math_floor (( low + high ) / 2);
return ( v === a [ mid ])
||
( (v < a [ mid ])
? search ( low , mid - 1)
: search ( mid + 1 , high )
);
}
}
return search (0 , array_length(a) - 1);
}
binary_search ([1 ,3 ,5 ,7 ,9 ,11 ,13 ,15] , 12);
*/

// Program E
/*
function permutations(s ) {
return is_null(s )
? list ( null )
: accumulate(

append , null ,
map( x =>
map (p => pair (x , p ) ,
permutations( remove (x , s ))) ,
s ));

}
permutations( list (1));
*/