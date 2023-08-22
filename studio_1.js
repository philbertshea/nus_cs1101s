// Assume that the input is always correct
function biggie_size(combo) {
    return combo+4;
}

function unbiggie_size(combo) {
    return combo-4;
}

// We prefer using the "strictly-larger-than" size
// Hence, return combo>4 instead of combo>=5
function is_biggie_size(combo) {
    return combo>4;
}


function combo_price(combo) {
    return is_biggie_size(combo) 
    ? 1.17 * unbiggie_size(combo) + 0.50 
    : 1.17 * combo;
}

combo_price(3); 
// is_biggie_size(3) returns False.
// Alternate expression is evaluated: 1.17 * 3
combo_price(6); 
// is_biggie_size(6) returns True. 
// Consequent expression is evaluated: 1.17 * unbiggie_size(6) + 0.50
// unbiggie_size(6) is evaluated to return 6-4 = 2
// Finally, 1.17 * unbiggie_size(6) + 0.50 = 1.17 * 2 + 0.50 = 2.84


function empty_order() {
    return 0;
}

function add_to_order(a, b) {
    return a*10 + b;
}

function last_combo(x) {
    return x%10;
}
last_combo(321);

function other_combos(x) {
    return x/10 - last_combo(x)/10;
}

// Best method to avoid evaluations: Use math_floor or math_trunc
function other_combos_better(x) {
    // return math_floor(x/10);
    return math_trunc(x/10);
}

x > 1 ? 0 : x < 2 ? 1 : 2;
// Evaluate predicate (x>1) FIRST. If true, evaluate 0. If false, evaluate (x<2 ? 1 : 2)


other_combos(321);
//modulo(11,3);