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

const L = list(2, 3, 4, 5, 6, 7, 8, 9, 11);
display(d_filter(x => x % 2 === 0, L));
L;

