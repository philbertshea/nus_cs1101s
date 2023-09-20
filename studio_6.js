/*function my_map(f, xs) {
    return accumulate((x, ys) => pair(f(x), ys), null, xs);
}

display(my_map(x => x + 1, list(1, 2, 3)));

function my_filter(pred, xs) {
    return accumulate((x, ys) => pred(x) ? pair(x, ys) : ys, null, xs);
}

display(my_filter(x => x > 1, list(1, 2, 3)));

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
    // Performance and time saving method
    // For every round, remove the item inspected in the tail list
    // This removes all occurrences of the item in the remaining list
    // By doing this, we don't need to save and update a new list distinct.
    
    return is_null(lst)
           ? null
           : pair(head(lst), 
                  remove_duplicates_3(filter(x => x !== head(lst), tail(lst))));
}

//
function remove_duplicates_4(lst) {
    return accumulate((x, y) => pair(x, 
                                    remove_duplicates_4(
                                        filter(z => z !== x, ys))), 
                      null, 
                      lst);
}

display_list(remove_duplicates_4(list(1, 2, 3, 4, 3, 2, 1, 2, 3)));

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
        const combi_C = map(x => pair(head(coins), x), 
                            combi_B);

        return append(combi_A, combi_C);
    }
}

display_list(makeup_amount(22, list(1, 10, 5, 20, 1, 5, 1, 50)));
// Result: list(list(20, 1, 1), list(10, 5, 1, 5, 1), list(1, 20, 1),
//              list(1, 20, 1), list(1, 10, 5, 5, 1), 
//              list(1, 10, 5, 1, 5))


// In class
/*
function remove_dup(lst) {
    // Wishful thinking: think that xs has all the duplicates removed already.
    // Different approach
    // If member returns null, i.e. x does NOT occur in ys, pair x
    // If member does not return null, i.e. x occurs in ys, do NOT pair x
    // Therefore, this returns a list of the last occurrences
    
    // Accumulate runs from BACK to FRONT (RIGHT TO LEFT)
    return accumulate((x, ys) => is_null(member(x, ys))
                                 ? pair(x, ys)
                                 : ys, null, lst);
}*/

// subsets(list(1, 2, 3));
// Result: list(list(),
// list(1), list(2), list(3),
// list(1,2), list(1,3), list(2,3),
// list(1,2,3))
/*
function subsets(lst) {
    return accumulate((x, y) => append(
                                    map(lst => pair(x, lst), 
                                        y), 
                                    y), 
                      list(list()), 
                      lst);
}
display_list(subsets(list(1, 2, 3)));

function subsets_sol(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        // Case 1: Do not Append the head
        const subsets_rest = subsets(tail(xs));
        
        // Case 2: Append the head
        const has_x = map(s => pair(head(xs), s), subsets_rest);
        
        // Combine Cases 1 and 2
        return append(subsets_rest, has_x);
    }
}*/

// permutations(list(1, 2, 3));
// Result: list(list(1,2,3), list(1,3,2),
// list(2,1,3), list(2,3,1),
// list(3,1,2), list(3,2,1))
/*
function permutations(lst) {
    function get_prefix(x, ys) {
        return remove(x, member(x, reverse(ys)));
    }
    function new_list(item, x, xs) {
        return append(get_prefix(x, xs), 
                      pair(item, member(x, xs)));
    }
    function helper(item, list_of_perm) {
        // xs is list(list(2, 3), list(3, 2))
        return accumulate((xs, rem) => append(
                                        accumulate((x, ys) => append(list(new_list(item, x, xs)), 
                                                                     ys),
                                                   list(append(xs, list(item))), 
                                                   xs), 
                                       rem), 
                                       null, 
                                       list_of_perm);
    }
    return is_null(lst) 
           ? null 
           : is_null(tail(lst)) 
           ? list(list(head(lst))) 
           : helper(head(lst), permutations(tail(lst)));
}

display_list(permutations(list(1, 2, 3, 4)));
*/
function permutations_sol(s) {
    return is_null(s)
           ? list(null)
           : accumulate(
               append,
               null,
               map(x => map(p => pair(x, p),
                            permutations_sol(remove(x, s))), s));
}
permutations_sol(list(1));