import {rcross, make_cross, heart, from_url, show, stackn, stack, stack_frac, beside, beside_frac, quarter_turn_left, quarter_turn_right} from "rune";

// Create a basiden function that uses an Iterative Process
function besiden(n, rune) {
    function bes_iter(result, count) {
        // Notice that besiden returns an expression beside_frac(1/n, rune, beside_frac(1/(n-1), rune...))
        // Placing the computation in an iter statement prioritises the evaluation of expression before next iteration of application
        // Therefore there are no deferred functions, giving an iterative process.
        return count > n 
                ? result 
                : bes_iter(beside_frac(1/count, rune, result), count+1);
    }
    return bes_iter(rune, 1);
}

function persian(rune, count) {
    // your answer here
    // top-bottom border contains count runes, placed side by side
    const top_bottom = besiden(count, rune);
    // left-right border contains count-2 runes, stacked top-down
    const left_right = stackn(count-2, rune);
    // Put beside the left_right borders to the make_cross graphic at the centre
    const less_top_bottom = helper(beside_frac, count, left_right, make_cross(rune));
    // Then stack the top_bottom borders with the centre graphic obtained from the previous line
    return helper(stack_frac, count, top_bottom, less_top_bottom);
}

// The helper function takes in function frac as parameter, as well as count, border and middle
// It is used to append the borders to the centre graphic in function persian
function helper(frac, count, border, middle) {
    return frac((count-1)/count, frac(1/(count-1), border, middle), border);
}

// Tests
show(persian(heart, 7));
show(persian(make_cross(rcross), 5));
const paw = from_url("https://i.imgur.com/GJg95B8.png");
show(persian(paw, 5));