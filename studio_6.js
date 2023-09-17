function remove_duplicates(lst) {
    function helper(xs, distinct) {
        return is_null(xs) 
               ? null
               : display(is_null(member(head(xs), distinct)))
               ? pair(head(xs), helper(tail(xs), pair(head(xs), distinct)))
               : helper(tail(xs), distinct);
    }
    return helper(lst, null);
}

function remove_duplicates_2(lst) {
    // Use filter instead of member
    function item_in_list(item, lst) {
        return !is_null(display(filter(x => item === x, lst)));
    }
    function helper(xs, distinct) {
        return is_null(xs) 
               ? null
               : display(item_in_list(head(xs), distinct))
               ? helper(tail(xs), distinct)
               : pair(head(xs), helper(tail(xs), pair(head(xs), distinct)));
    }
    return helper(lst, null);
}

function remove_duplicates_3(lst) {
    // Use filter instead of member
    function item_in_list(item, lst) {
        return !is_null(display(filter(x => item === x, lst)));
    }
    function helper(x, y, seen) {
        if(item_in_list(x, seen)) {
            
        }
    }
    return accumulate(helper, null, lst)
}

display(remove_duplicates_2(list(1, 2, 3, 4, 3, 2, 1, 2, 3)));


function makeup_amount(x, coins) {
    if (x === 0) {
        return list(null); // Base case: possible
    } else if (x < 0 || is_null(coins)) {
        return null; // Not possible
    } else {
        // Combinations that do not use the head coin.
        const combi_A = makeup_amount(x, tail(coins));

        // Combinations that do not use the head coin 
        // for the remaining amount.
        const combi_B = makeup_amount(x - head(coins), tail(coins));

        // Combinations that use the head coin.
        const combi_C = map(x => append(list(head(coins)), x), 
                            combi_B);

        return append(combi_A, combi_C);
    }
}

display_list(makeup_amount(22, list(1, 10, 5, 20, 1, 5, 1, 50)));
// Result: list(list(20, 1, 1), list(10, 5, 1, 5, 1), list(1, 20, 1),
//              list(1, 20, 1), list(1, 10, 5, 5, 1), 
//              list(1, 10, 5, 1, 5))





