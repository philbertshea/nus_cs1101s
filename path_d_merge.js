/*
function d_merge(xs, ys) {
    const tot = length(xs) + length(ys);
    const result = is_null(xs) ? ys
             : is_null(ys) ? xs
             : head(xs) <= head(ys) ? xs : ys;
    let temp = result;
    
    for (let i=0; i<tot; i = i + 1) {
        if (is_null(xs) || is_null(ys)) {
            return is_null(xs) ? ys : xs;
        } else {
            if(head(xs) <= head(ys)) {
                set_tail(temp, xs);
                xs = tail(xs);
            } else {
                set_tail(temp, ys);
                ys = tail(ys);
            }
        }
    }
    
}
/*
function d_merge_2(xs, ys) {
    if (is_null(xs) || is_null(ys)) {
        return is_null(xs) ? ys : xs;
    } else if (head(xs) < head(ys)) {
        const wish = d_merge_2(tail(xs), ys);
        set_tail(xs, wish);
        return xs;
    } else {
        const wish = d_merge_2(xs, tail(ys));
        set_tail(ys, wish);
        return ys;
    }
}

d_merge_2(list(1, 5, 6), list(3, 4));
*/
