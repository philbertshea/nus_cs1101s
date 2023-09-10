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

display("-------------------------Q2----------------------");

function reverse(lst) {
    return is_null(lst)
           ? null
           : pair(reverse(tail(lst)), head(lst));
}

const d = reverse(list(1, 2, 3, 4));
display_all(d);

// Q3

display("-------------------------Q3----------------------");

function head_disp(x) {
    display_all(head(x));
    return head(x);
}

function tail_disp(x) {
    display_all(tail(x));
    return tail(x);
}


const lst1 = list(7, list(6, 5, 4), 3, list(2, 1));
const e = head_disp(tail_disp
                    (head_disp(tail_disp(tail_disp(tail_disp(lst1))))));
display(e);
display("-------------------------------------");

const lst2 = list(list(7), list(6, 5, 4), list(3, 2), 1);
const f = head_disp(tail_disp(tail_disp(tail_disp(lst2))));
display(f);
display("-------------------------------------");


const lst3 = list(7, list(6), list(5, list(4)), list(3, list(2, list(1))));
const g = head_disp(
            head_disp(tail_disp(
                head_disp(tail_disp(
                    head_disp(tail_disp(tail_disp(tail_disp(lst3)))))))));
display(g);
display("-------------------------------------");


const lst4 = list(7, list(list(6, 5), list(4), 3, 2), list(list(1)));
const h = head_disp(
            head_disp(
                head_disp(tail_disp(tail_disp(lst4)))));
display(h);