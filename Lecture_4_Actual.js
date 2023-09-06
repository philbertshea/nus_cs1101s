/*
const pair = (x, y) => f => f(x, y);
const head = p => p((x, y) => x);
const tail = p => p((x, y) => y);

pair(1,2);
head(pair(1,2));
*/

// Iterative Process: Length of list. 

function length(xs) {
    draw_data("length_i", xs);
    return is_null(xs)
           ? 0
           : 1 + length(tail(xs));
}

length(pair(10, pair(20, pair(30, null))));

function length_i(xs) {
    draw_data("length_i", xs);
    function iter(ys, count) {
        draw_data("iter", ys, count);
        return is_null(ys) 
               ? count
               : iter(tail(ys), count + 1);
    }
    return iter(xs, 0);
}

length_i(pair(10, pair(20, pair(30, null))));

