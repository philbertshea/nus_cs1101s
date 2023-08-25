// Quest 2: Colorful Carpets
// Given
function stackn(n, rune) {
    return n === 1
           ? rune
           : stack_frac(1 / n, rune,
                        stackn(n - 1, rune));
}

// Q1
function besiden(n, rune) {
    function iter(result, count) {
        return count>n 
               ? result
               : iter(
                   beside_frac(1/count, rune, result), 
                   count+1);
    }
    return iter(rune, 1);
}

// Test
show(besiden(7, heart));

// Q2
// paste your besiden function from the
// previous question here

function besiden(n, rune) {
    function iter(result, count) {
        return count>n 
               ? result
               : iter(
                   beside_frac(1/count, rune, result), 
                   count+1);
    }
    return iter(rune, 1);
}

function carpet(n, m, rune) {
    // your solution goes here
    return stackn(n, besiden(m, rune));
}

// Test
show(carpet(7, 5, heart));

// Q3

/*
Enter your answers here
(answer each question in one or two complete sentences):

(a)
The carpet will be a 10x10 carpet where each heart has the SAME colour.
This colour is chosen randomly, but will be applied to ALL the hearts on the carpet.
When the program is run repeatedly, the colours of the hearts will change.
However, in any single run, all the hearts will have the SAME random colour.

(b)
Source uses Applicative Order Reduction, "Evaluate First then Apply".
This means that the argument random_color(heart) is evaluated BEFORE the function carpet is applied.
A random-coloured heart is returned by random_color(heart) and then passed into carpet.
Therefore, all the hearts in the carpet have the SAME colour.

Repeatedly running the program may generate a carpet of hearts of a DIFFERENT random colour (compared to a Previous run).
This is because random_color(heart) is re-evaluated in each run, and the colour chosen may change.
However, all the hearts MUST share the SAME random colour in a single run.

When show(carpet(10, 10, random_color(heart))) is executed,
1. Functions show, heart, as well as arguments 10,10 are evaluated. (NOT yet applied)
2. The argument "random_color(heart)" will then be evaluated, returning heart with a random colour.
3. The function carpet is then applied onto the arguments 10, 10 and random-coloured heart
carpet(10, 10, random_color(heart)) generates a 10x10 carpet of hearts 
with the SAME random colour.
4. The function show is then applied onto the carpet.
show(carpet(10, 10, random_color(heart))) then shows this carpet.


(c)
The carpet of hearts will have RANDOM colours.
Assuming Source uses Normal Order Reduction "Apply first, Evaluate last"
Functions are applied BEFORE arguments are evaluated. This means that random_color(heart) will
Only be evaluated AFTER stack_frac and beside_frac is applied.
This gives a long chain of deferred operations, and every instance of rune is replaced by random_color(heart)
When all other functions are applied, we can expect an occurrence of 'random_color(rune)' that will correspond to every (original) rune
Therefore, there should be n*m instances of function applications of random_color onto rune.
This results in a carpet of random-coloured runes, where the colour of every rune is random.

Repeating the execution of the program results in possible changes in colours of the hearts. 
There is no rule that fixes the colours of the hearts, though there may still be hearts with matching colours
, purely by probability.

show(carpet(10, 10, random_color(heart)))
show(stackn(10, besiden(10, random_color(heart))))
show(stack_frac(1/10, besiden(10, random_color(heart)), stackn(9, besiden(10, random_color(heart)))))
...

*/

// Q4

import {heart, random_color, beside_frac, stack_frac, stackn, show} from "rune";
// you may need helper functions

/*
// Previous alternative. Also works, but the stacker implementation is Recursive.
// Note that the stackn and besiden implementation are similar. So we can always use the same implementation.
function helper(n, rune) {
    function iter(result, count) {
        return count>n 
               ? result
               : iter(
                   beside_frac(
                       1/count, 
                       random_color(rune), 
                       result), 
                   count+1);
    }
    function stacker(count) {
        return count===1
               ? iter(random_color(rune), 2)
               : stack_frac(1/count, iter(random_color(rune), 2), stacker(count-1));
    }
    
    return stacker(n);
}
*/
function randomly_colored_carpet(n, m, rune) {
    // your solution goes here
    function iter(result, count, frac, func, max) {
        return count>max
               ? result
               : iter(
                   frac(1/count, 
                       func(rune), 
                       result), 
                   count+1,
                   frac,
                   func,
                   max);
    }
    function rand(rune) {
        return iter(random_color(rune), 
                    1, 
                    beside_frac, 
                    random_color, 
                    m);
    }
    return iter(rune, 1, stack_frac, rand, n);
}

// Test
show(randomly_colored_carpet(10, 10, heart));
// should produce a carpet as shown in the title picture of this quest.