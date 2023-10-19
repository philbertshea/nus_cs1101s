// Q1

function make_big_int_from_number(num) {
    function helper(num) {
        if (num === 0) {
            return null;
        } else {
            const wish = helper(math_floor(num/10));
            const val = num % 10;
            return pair(val, wish);
        }
    }
    return num === 0 ? list(0) : helper(num);
}
make_big_int_from_number(0);

function big_int_to_string(bint) {
    return accumulate((x, ys) => ys + stringify(x), "", bint);
}
big_int_to_string(list(0, 0, 3, 2, 1));

function big_int_add(bintX, bintY) {
    function big_int_to_num(bint) {
        let times10 = length(bint);
        function helper(x, ys) {
            times10 = times10 - 1;
            return x * math_pow(10, times10) + ys;
        }
        return accumulate(helper, 0, bint);
    }
    
    function make_big_int_from_number(num) {
        function helper(num) {
            if (num === 0) {
                return null;
            } else {
                const wish = helper(math_floor(num/10));
                const val = num % 10;
                return pair(val, wish);
            }   
        }   
        return num === 0 ? list(0) : helper(num);
    }
    
    const xval = big_int_to_num(bintX);
    const yval = big_int_to_num(bintY);
    const sum = xval + yval;
    return make_big_int_from_number(sum);
}

big_int_add(list(7, 8, 9), list(5, 6));

function big_int_mult_by_digit(bint, digit) {
    function big_int_to_num(bint) {
        let times10 = length(bint);
        function helper(x, ys) {
            times10 = times10 - 1;
            return x * math_pow(10, times10) + ys;
        }
        return accumulate(helper, 0, bint);
    }
    
    function make_big_int_from_number(num) {
        function helper(num) {
            if (num === 0) {
                return null;
            } else {
                const wish = helper(math_floor(num/10));
                const val = num % 10;
                return pair(val, wish);
            }   
        }   
        return num === 0 ? list(0) : helper(num);
    }
    
    const val = big_int_to_num(bint);
    const prod = val * digit;
    return make_big_int_from_number(prod);
}
big_int_mult_by_digit(list(7, 4, 3), 5);

function big_int_mult_by_10_pow_n(bint, n) {
    function big_int_to_num(bint) {
        let times10 = length(bint);
        function helper(x, ys) {
            times10 = times10 - 1;
            return x * math_pow(10, times10) + ys;
        }
        return accumulate(helper, 0, bint);
    }
    
    function make_big_int_from_number(num) {
        function helper(num) {
            if (num === 0) {
                return null;
            } else {
                const wish = helper(math_floor(num/10));
                const val = num % 10;
                return pair(val, wish);
            }   
        }   
        return num === 0 ? list(0) : helper(num);
    }
    
    const val = big_int_to_num(bint);
    const prod = val * math_pow(10, n);
    return make_big_int_from_number(prod);
}
big_int_mult_by_10_pow_n(list(7, 4, 3), 3);

function big_int_mult(bintX, bintY) {
    let times10 = length(bintY);
    function big_int_to_num(bint) {
        let times10 = length(bint);
        function helper(x, ys) {
            times10 = times10 - 1;
            return x * math_pow(10, times10) + ys;
        }
        return accumulate(helper, 0, bint);
    }
    const xval = big_int_to_num(bintX);
    function helper(x, ys) {
        times10 = times10 - 1;
        const item = xval * x * math_pow(10, times10);
        return item + ys;
    }
    const result = accumulate(helper, 0, bintY);
    return make_big_int_from_number(result);
}

big_int_mult(list(7, 8, 9), list(5, 6));

//===============================================================
// DO NOT REMOVE OR MODIFY THE FOLLOWING FUNCTIONS.
// You may call them in your functions.
//===============================================================
function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}
//---------------------------------------------------------------
function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
}
//---------------------------------------------------------------
function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        swap(A, i, len - 1 - i);
    }
}
//---------------------------------------------------------------
function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}
//---------------------------------------------------------------
function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}
//---------------------------------------------------------------
// Sorts the array of numbers in ascending order.
function sort_ascending(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
}
//---------------------------------------------------------------
function digits_to_string(digits) {
    const len = array_length(digits);
    let str = "";
    for (let i = 0; i < len; i = i + 1) {
        str = str + stringify(digits[i]);
    }
    return str;
}
// const D = [8, 3, 9, 2, 8, 1];
// digits_to_string(D);  // returns "839281"
//===============================================================
// DO NOT REMOVE OR MODIFY THE ABOVE FUNCTIONS.
//===============================================================

function build_largest_int(digits) {
    let B = copy_array(digits);
    sort_ascending(B);
    reverse_array(B);
    return digits_to_string(B);
}

build_largest_int([4, 1, 9, 4, 1]);


function build_2nd_largest_int(digits) {
    let B = copy_array(digits);
    sort_ascending(B);
    for (let i=0; i<array_length(B) - 1; i = i + 1) {
        if (B[i] < B[i+1]) {
            swap(B, i, i+1);
            break;
        }
    }
    reverse_array(B);
    return digits_to_string(B);
}

build_2nd_largest_int([5, 2, 6, 8, 2, 0, 9]);


function build_nth_largest_int(digits, n) {
    // digits = 1 2 4 3
    const mem = [];
    const temp = [];
    let B = copy_array(digits);
    function helper(x) {
        for (let i=0; i<x; i = i + 1) {
            temp[i] = 0;
            if (x > 0) {
                helper(x - 1);
            }
        }
    }
}


function count_lower_neighbours(emap, r, c) {
    const rows = array_length(emap);
    const columns = array_length(emap[0]);
    if (r<=0 || r>=rows-1 || c<=0 || c>=columns-1) {
        return 0;
    } else {
        let count = 0;
        const val = emap[r][c];
        for (let i=0; i<3; i = i + 1) {
            for (let j=0; j<3; j = j + 1) {
                if (emap[r - 1 + i][c - 1 + j] < val) {
                    count = count + 1;
                }
            }
        }
        return count;
    }
}

function count_peaks(emap) {
    const rows = array_length(emap);
    const columns = array_length(emap[0]);
    let count = 0;
    for (let i=0; i<rows; i = i + 1) {
        for (let j=0; j<columns; j = j + 1) {
            if (count_lower_neighbours(emap, i, j) === 8) {
                count = count + 1;
            }
        }
    }
    return count;
}

function count_islands(emap) {
    const rows = array_length(emap);
    const columns = array_length(emap[0]);
    let count = 0;
    let temp = [];
    let temp_count = 0;
    let search_cases = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    
    function search(i, j) {
        temp[temp_count] = pair(i, j);
        temp_count = temp_count + 1;
        for (let s=0; s<array_length(search_cases); s = s + 1) {
            let x = head(search_cases[s]);
            let x = tail(search_cases[s]);
            if(i + x >= 0 && i + x <= rows && j + y >= 0 && j + y <= columns) {
                if (emap[i + x][j + y] !== 0 && not_in_array()) {
                    search(i + x, j + y);
                    break;
                }
            } 
        }
        
    }
    
    for (let i=0; i<rows; i = i + 1) {
        for (let j=0; j<columns; j = j + 1) {
            if (emap[i][j] !== 0) {
                search
            }
        }
    }
    return count;
}