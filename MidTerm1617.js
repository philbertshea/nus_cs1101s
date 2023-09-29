function find_min(xs) {
    if(is_null(tail(xs))) {
        return xs;
    } else {
        const wish= find_min(tail(xs));
        return head(xs) < head(wish)
               ? pair(head(xs), wish)
               : append(wish, list(head(xs)));
    }
}

find_min(list(5, 3, 2, 4, 1));

function find_min_2(xs) {
  function helper(ys, smallest_so_far, acc) {
    return is_null(ys) 
            ? pair(smallest_so_far, acc) 
            : smallest_so_far > head(ys) 
            ? helper(tail(ys), head(ys), pair(smallest_so_far, acc)) 
            : helper(tail(ys), smallest_so_far, pair(head(ys), acc));
  }
  return helper(tail(xs), head(xs), null);
}
find_min_2(list(5, 3, 2, 4, 1));

function take_drop(xs,n) {
    function helper(take, xs, count){
        return count === n
               ? pair(take, xs)
               : helper(pair(head(xs), take),tail(xs), count+1);
    }
    return helper(null, xs, 0);
}

function take_drop_2(xs, n) {
  function helper(ys, k, acc) {
    return k === 0 
           ? pair(acc, ys) 
           : helper(tail(ys), k - 1, pair(head(ys), acc));
  }
  return helper(xs, n, null);
}

take_drop_2(list(1, 2, 3, 4, 5), 3);

function solvable(xs, n) {
    const l = length(xs);
    function helper(pos, count){
        if (pos === l-1) {
            return true;
        }
        else if (count===n || pos < 0 || pos>l-1) {
            return false;
        } else {
            const cur = list_ref(xs, pos);
            return helper(cur+pos, count + 1) 
                   ||
                   helper(pos - cur, count + 1);
        }
    }
    return helper(0, 0);
}

solvable(list(3, 5, 8, 4, 2, 7, 1, 6), 3);

function solvable_2 (xs , k) {
const n = length ( xs );
// check if Rucer Puzzle with focus on f-th number
// is solvable within i steps
function solvable_2(xs, k) {
  const n = length(xs);
  
  function solvable_with_focus(i, f) {
    if (i < 0 || f < 1 || f > n) {
      return false;
    } else if (f === n) {
      return true;
    } else {
      const number_in_focus = list_ref(xs, f - 1);
      return solvable_with_focus(i - 1, f - number_in_focus) 
             || 
             solvable_with_focus(i - 1, f + number_in_focus);
    }
  }
  return solvable_with_focus(k, 1);
}
solvable_2(list(3, 5, 8, 4, 2, 7, 1, 6), 3);