function evaluate(expr) { 
    let C = list(expr);
    let S = null;
    while (! is_null(C)) {
        const command = head(C);
        C = tail(C);
        display(command, "HI");
        // expressions and statements
        if (is_literal(command)) {
            S = pair(literal_value(command), S);
        } else if (is_operator_combination(command)) {
            C = pair(first_operand(command),
                 pair(second_operand(command),
                  pair(make_binary_operator_instruction(
                   operator_symbol(command)),
                   C)));

        // machine instructions
        } else if (is_logical_composition(command)) {
            const sym = logical_symbol(command);
            if (sym === "&&") {
                C = pair(make_conditional_expression(
                        logical_composition_first_component(command), 
                        logical_composition_second_component(command),
                        make_literal(false)),
                    C);
            } else if (sym === "||") {
                C = pair(make_conditional_expression(
                        logical_composition_first_component(command), 
                        make_literal(true),
                        logical_composition_second_component(command)),
                   C);
            }
            
        } else if (is_conditional_expression(command)) {
            C = pair(conditional_predicate(command),
                    pair(make_branch(conditional_consequent(command), 
                                     conditional_alternate(command)),
                   C));
                   
        } else if (is_branch(command)) {
            if (head(S)) {
                C = pair(branch_consequent(command),
                        C);
            } else {
                C = pair(branch_alternate(command),
                        C);
            }
                   
        } else if (is_binary_operator_instruction(command)) {
            S = pair(apply_binary(operator_instruction_symbol(command),
                                  head(tail(S)), head(S)),
                 tail(tail(S)));
        } else {
           error(command, "unknown command:");
        }
    }
    return head(S); 
}

function apply_binary(operator, op1, op2) {
    return operator === "+"
           ? op1 + op2
           : operator === "-"
           ? op1 - op2 
           : operator === "*" 
           ? op1 * op2 
           : operator === "/" 
           ? op1 / op2
           : operator === "%" 
           ? math_sqrt(op1 * op1 + op2 * op2)
           : error(operator, "Unknown operator");
}

//
// syntax functions (SICP JS 4.1.2)
//

function is_tagged_list(component, the_tag) {
    return is_pair(component) && head(component) === the_tag;
}

// literals

function is_literal(component) {
    return is_tagged_list(component, "literal");
}
function literal_value(component) {    
    return head(tail(component));
}
function make_literal(val) {
    return list("literal", val);
}

// operator combinations

function is_operator_combination(component) {	    
    return is_tagged_list(component, "binary_operator_combination");
}
function operator_symbol(component) {
    return list_ref(component, 1);
}
function first_operand(component) {
    return list_ref(component, 2);
}
function second_operand(component) {
    return list_ref(component, 3);
}


// operators instructions

function is_binary_operator_instruction(component) {	    
    return is_tagged_list(component, "binop");
}
function is_unary_operator_instruction(component) {	    
    return is_tagged_list(component, "unop");
}
function operator_instruction_symbol(component) {
    return list_ref(component, 1);
}
function make_binary_operator_instruction(symbol) {
    return list("binop", symbol);
}
function make_unary_operator_instruction(symbol) {
    return list("unop", symbol);
}

// Logical Composition

function is_logical_composition(component) {
    return is_tagged_list(component, "logical_composition");
}
function logical_symbol(comp) {
    return list_ref(comp, 1);
}
function logical_composition_first_component(comp) {
    return list_ref(comp, 2);
}
function logical_composition_second_component(comp) {
    return list_ref(comp, 3);
}

// helper to make a conditional expression
function make_conditional_expression(pred, cons, alt) {
    return list("conditional_expression", pred, cons, alt);
}
function conditional_predicate(comp) {
    return list_ref(comp, 1);
}
function conditional_consequent(comp) {
    return list_ref(comp, 2);
}
function conditional_alternate(comp) {
    return list_ref(comp, 3);
}
function is_conditional_expression(component) {
    return is_tagged_list(component, "conditional_expression");
}

// Make Branch
function make_branch(cons, alt) {
    return list("branch", cons, alt);
}
function branch_consequent(comp) {
    return list_ref(comp, 1);
}
function branch_alternate(comp) {
    return list_ref(comp, 2);
}
function is_branch(component) {
    return is_tagged_list(component, "branch");
}

function parse_and_evaluate(input) {
    const parsed = display_list(parse(input));
    return evaluate(parsed);
}

parse_and_evaluate(`parse('false && 0();');`);



// Q3
// Use the full machine. Add parse into list of primitive functions
const primitive_functions = list(
       list("head",    head             ),
       list("tail",    tail             ),
       list("pair",    pair             ),
       list("list",    list             ),
       list("is_null", is_null          ),
       list("display", display          ),
       list("error",   error            ),
       list("math_pow",math_pow         ),
       list("parse", parse)
       );