function d_filter(pred, xs) {
    let temp = null;
    let result = null;
    
    // First item
    if (is_null(xs)) {
        return xs;
    } else {
        if (pred(head(xs))) {
            result = xs;
            temp = xs;
            xs = tail(xs);
        } else {
            temp = tail(xs);
            result = tail(xs);
            set_tail(xs, null);
            xs = temp;
        }
        
    } 
    
    while (!is_null(xs)) {
        if (!pred(head(xs))) {
            set_tail(temp, tail(xs));
            set_tail(xs, null);
            temp = tail(temp);
            xs = temp;
        } else {
            xs = tail(xs);
        }
    }
    return result;
}

function d_filter_2(pred, xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const wish = d_filter_2(pred, tail(xs));
        if(pred(head(xs))) {
            set_tail(xs, wish);
        } else {
            set_tail(xs, null);
            xs = wish;
        }
        return xs;
    }
}
const L = list(1, 2, 3, 4, 5, 6, 7, 8, 9, 11);
display(d_filter_2(x => x % 2 === 0, L));
L;

