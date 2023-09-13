// Q1
function flatten_list(xs) {
    return accumulate(append, null, xs);
}

const LoL = list(list(1, 2), list(3, 4, 5, 6), null, list(7, 8, 9));
display_list(flatten_list(LoL));

// Q2
function tree_sum(tree) {
    return is_null(tree)
           ? 0
           : !is_pair(head(tree))
           ? head(tree) + tree_sum(tail(tree))
           : tree_sum(head(tree)) + tree_sum(tail(tree));
}

function tree_sum2(tree) {
    function op(xs, ys) {
        return !is_pair(xs)
               ? xs + ys
               : tree_sum2(xs) + ys;
    }
    return accumulate(op, 0, tree);
}

const my_tree = list(1, list(2, list(3, 4), 5), list(6, 7));
//tree_sum2(my_tree);

// Q3
function accumulate_tree(f, op, initial, tree) {
    const fun = (xs, ys) => !is_pair(xs) 
                            ? op(f(xs), ys) 
                            : op(accumulate(fun, initial, xs), ys);

    return accumulate(fun, initial, tree);
}

accumulate_tree(x=>x, (x,y) => x + y, 0, list(list(5, 6, list(7)), 2, list(3, 4)));