// Q1

function display_all(x) {
    display("------------");
    draw_data(x);
    display(x);
    display_list(x);
}

const a = pair(1, 2);
display_all(a);

const b = pair(1, pair(3, pair(5, null)));
display_all(b);

const c = pair(pair(pair(3, 2), pair(1, 0)), null);
display_all(c);

const d = pair(0, list(1, 2));
display_all(d);

const f = list(pair(1, 2), list(4, 5), 3);
display_all(f);

display("------------------------Q2----------------------");
// Q2
const g = list(1, 2, 3);
display_all(g);

const h = pair(1, pair(2, 3));
display_all(h);

const i = list(list(1, 2), list(3, 4), list(5, 6));
display_all(i);

display("-------------------------Q3----------------------");
// Q3
// Get the value 4 with only head and tail
function head_disp(x) {
    display_all(head(x));
    return head(x);
}

function tail_disp(x) {
    display_all(tail(x));
    return tail(x);
}

const lst1 = list(7, 6, 5, 4, 3, 2, 1);
const j = head_disp(tail_disp(tail_disp(tail_disp(lst1))));
display_all(j);
display("-------------------------------------");

const lst2 = list(list(7), list(6, 5, 4), list(3, 2), 1);
const k = head_disp(tail_disp(tail_disp(head_disp(tail_disp(lst2)))));
display_all(k);
display("-------------------------------------");

const lst3 = list(7, list(list(list(6, 5, list(list(4)), 3), 2)), 1);
const l = head_disp(head_disp(head_disp(tail_disp(tail_disp(head_disp(head_disp(head_disp(tail_disp(lst3)))))))));
display_all(l);
display("-------------------------------------");


