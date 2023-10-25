// TASK 1
/*
function max_flies_to_eat(tile_flies) {
    const rows = array_length(tile_flies);
    const cols = array_length(tile_flies[0]);
    let max = 0;
    function helper(i, j, count) {
        if (j>=0 && j<=cols-1) {
            const new_count = count + tile_flies[i][j];
            if (i === rows - 1) {
                max = new_count > max ? new_count : max;
            } else {
                helper(i+1, j, new_count);
                helper(i+1, j-1, new_count);
                helper(i+1, j+1, new_count);
            }
        }
    }
    for (let j=0; j<cols; j=j+1) {
        helper(0, j, 0);
    }
    return max;
}

function max_flies_to_eat_wish(tile_flies) {
    const rows = array_length(tile_flies);
    const cols = array_length(tile_flies[0]);
    let max = 0;
    function helper(i, j) {
        if (j<0 || j>cols-1) {
            return 0;
        } else if (i === rows - 1) {
            return tile_flies[i][j];
        } else {
            const left = helper(i+1, j);
            const mid = helper(i+1, j-1);
            const right = helper(i+1, j+1);
            const goto = math_max(left, mid, right);
            return tile_flies[i][j] + goto;
        }
    }
    for (let j=0; j<cols; j=j+1) {
        const result = helper(0, j);
        max = result > max ? result : max;
    }
    return max;
}

// TEST:
const tile_flies = [[3, 1, 7, 4, 2],
                     [2, 1, 3, 1, 1],
                     [1, 2, 2, 1, 8],
                     [2, 2, 1, 5, 3],
                     [2, 1, 4, 4, 4],
                     [5, 7, 2, 5, 1]];
//
 max_flies_to_eat_2(tile_flies); // Expected result: 32
 */
 
 /*
 let xx = 0;
let yy = 0;
function funC(n) {
if (n <= 1) {
return n;
} else {
xx = funC(n - 1);
yy = funC(n - 2);
return xx + yy;
}
}
funC(4);
*/

/*
function memo_fun(fun) {
let already_run = false;
let result = undefined;
function mfun() {
if (!already_run) {
result = fun();
already_run = true;
return result;
} else {
return result;
}
}
return mfun;
}

const onesB = pair(1, memo_fun(() => ms("A", onesB)));
function ms(m, s) {
display(m);
return s;
}
stream_ref(onesB, 3);
/*
function m_integers_from(n) {
return pair(n, 
memo_fun(() => ms("M: " + stringify(n), 
m_integers_from(n + 1))));
}

const m_int = m_integers_from(1);
m_int()
*/


