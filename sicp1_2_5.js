function is_even(x) {
    return x % 2 === 0;
}

function double(x) {
    return x + x;
}

function halve(x) {
    return x / 2;
}


function times(a, b) {
    return times_iter(0, a, b);
}

function times_iter(sum, a, b) {
    return b===0 ? sum : 
    is_even(b) ? times_iter(sum, double(a), halve(b)) 
    : times_iter(sum+a, a, b-1) ;
}
times(300,400);