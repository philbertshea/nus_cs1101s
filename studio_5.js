function display_all(x) {
    display("------------");
    draw_data(x);
    display(x);
    display_list(x);
}

const a = list(list(1, 2, list(3)), list(4, 5), pair(6, 7));
display_all(a);

const b = pair(1, list(2, 3, pair(4, null)));
display_all(b);

const c = pair(1, pair(2, list(3, list(4, 5))));
display_all(c);

// Q2

function reverse(lst) {
    return is_null(lst)
           ? null
           : pair(reverse(tail(lst)), head(lst));
}

const d = reverse(list(1, 2, 3, 4));
display_all(d);

// Q3

const lst2 = list(list(7), list(6, 5, 4), list(3, 2), 1);
const lst3 = list(7, list(6), list(5, list(4)), list(3, list(2, list(1))));
const lst4 = list(7, list(list(6, 5), list(4), 3, 2), list(list(1)));

const lst1 = list(7, list(6, 5, 4), 3, list(2, 1));
const e = head(tail(head(tail(tail(tail(lst1))))));

display_all(e);