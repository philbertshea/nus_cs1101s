/*function find_ranks(lst) {
    return map(n => 
                accumulate((x, ys) => x <= n
                                      ? 1 + ys
                                      : ys,
                                      0,
                                      lst),
              lst);
}
find_ranks(list(9, 8, 5, 6));


function find_ranks_2(lst) {
    return map(n =>
                length(filter(x => x <= n, lst)),
                lst);
}
find_ranks_2(list(9, 8, 5, 6));
*/

const twice = f => x => f(f(x));
const thrice = f => x => f(f(f(x)));
twice(thrice(x => x * 2))(1);

twice(thrice);
// x => (f => x => f(f(f(x))))((f => x => f(f(f(x))))(x))
twice(thrice)(x => x * 2);


twice(twice(thrice)(x => x * 2))(1);