
// Getting the elements of html
const num = document.querySelectorAll(".nums");
const elem = document.querySelectorAll(".output");
const dt = document.querySelector(".dot");

const input = elem[0];

let output = "";

let arith_opr = 1;
let dot = 1;

// Function to know whether the character is an operator or not
const is_op = (op) => {
    if (op == '+' || op == '-' || op == '/' || op == '*' || op == '%') {
        return true;
    }
    return false;
}

// Function to know which operator has bigger value
const opr = (op) => {
    if (op == '*' || op == '/') return 2;
    else if (op == '+' || op == '-') return 1;
}

// Function to do normal arihtmetic
const func = (opr_st, num_st) => {
    let op = opr_st.pop();
    if (op == '+') {
        let sec = num_st.pop();
        let ft = num_st.pop();
        let res = parseFloat(ft) + parseFloat(sec);
        num_st.push(res);
    }
    else if (op == '-') {
        let sec = num_st.pop();
        let ft = num_st.pop();
        let res = ft - sec;
        num_st.push(res);
    }
    else if (op == '*') {
        let sec = num_st.pop();
        let ft = num_st.pop();
        let res = ft * sec;
        num_st.push(res);
    }
    else if (op == '/') {
        let sec = num_st.pop();
        let ft = num_st.pop();
        let res = ft / sec;
        num_st.push(res);
    }
}

// Function to calculate the value
const eval = (obj) => {
    if (is_op(obj[obj.length - 1])) obj.slice(0, -1);
    let opr_st = [];
    let num_st = [];
    let n = "";
    for (let i = 0; i < obj.length; i++) {
        if (is_op(obj[i])) {
            num_st.push(n.replace(/\s+/g, ''));
            n = "";
            if (opr_st.length == 0) {
                opr_st.push(obj[i]);
            }
            else {
                if (opr(obj[i]) > opr(opr_st[opr_st.length - 1])) {
                    opr_st.push(obj[i]);
                }
                else if (opr(obj[i]) == opr(opr_st[opr_st.length - 1])) {
                    func(opr_st, num_st);
                    opr_st.push(obj[i]);
                }
                else {
                    while (opr_st.length != 0) {
                        func(opr_st, num_st);
                        console.log(num_st);
                    }
                    opr_st.push(obj[i]);
                }
            }
        }
        else {
            n += obj[i];
        }
    }
    num_st.push(n.replace(/\s+/g, ''));
    while (opr_st.length != 0) {
        func(opr_st, num_st);
    }
    return num_st[0].toString();
}

// Adding the eventlistener when user clicks on number buttons
for (let i = 0; i < num.length; i++) {
    num[i].addEventListener('click', () => {
        if (output.length < 23) {
            if (input.textContent == '0') {
                if (num[i].textContent != 0) {
                    dot = 0;
                    arith_opr = 0;
                    output = (output + num[i].textContent).replace(/\s/g, '');
                    input.textContent = output;
                    dot = 0;
                }
            }
            else if (input.textContent.length > 0) {
                if (num[i].textContent == 0) {
                    if (!is_op(input.textContent[input.textContent.length - 1])) {
                        output = output + num[i].textContent;
                        input.textContent = output;
                    }
                }
                else {
                    output = (output + num[i].textContent).replace(/\s/g, '');
                    input.textContent = output;
                    if (arith_opr > 0) arith_opr = 0;
                }
            }
        }
    })
};

// Adding the eventlistener when user clicks on delete button
dt.addEventListener('click', () => {
    if (dot == 0) {
        dot++;
        output = output + '.';
        input.textContent = output;
    }
})

// Getting the elements of html
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const multiply = document.querySelector(".multiply");
const divide = document.querySelector(".divide");
const clr = document.querySelector(".clear");
const clr_all = document.querySelector(".clear-all");
const del = document.querySelector(".delete");
const equal = document.querySelector(".equal-to");

// Adding the eventlistener when user clicks on plus button
plus.addEventListener('click', () => {
    if (arith_opr == 0) {
        dot = 0;
        output = (output + '+').replace(/\s/g, '');
        arith_opr++;
        input.textContent = output;
    }
})

// Adding the eventlistener when user clicks on minus button
minus.addEventListener('click', () => {
    if (arith_opr == 0 || input.textContent === '0') {
        dot = 0;
        output = (output + '-').replace(/\s/g, '');
        arith_opr++;
        input.textContent = output;
    }
})

// Adding the eventlistener when user clicks on multiply button
multiply.addEventListener('click', () => {
    if (arith_opr == 0) {
        dot = 0;
        output = (output + '-').replace(/\s/g, '');
        arith_opr++;
        input.textContent = output
    }
})

// Adding the eventlistener when user clicks on divide button
divide.addEventListener('click', () => {
    if (arith_opr == 0) {
        dot = 0;
        output = (output + '-').replace(/\s/g, '');
        arith_opr++;
        input.textContent = output;
    }
})

// Adding the eventlistener when user clicks on clear button
clr.addEventListener('click', () => {
    output = "";
    input.classList.add("anim-dl");
    input.textContent = 0;
    setTimeout(() => {
        input.classList.remove("anim-dl");
    }, 200);
})

// Adding the eventlistener when user clicks on clear all button
clr_all.addEventListener('click', () => {
    output = "";
    input.classList.add("anim-dl");
    input.textContent = 0;
    setTimeout(() => {
        input.classList.remove("anim-dl");
    }, 200);
})

// Adding the eventlistener when user clicks on delete button
del.addEventListener('click', () => {
    if (output.length > 1) {
        output = output.slice(0, -1);
        input.textContent = output;
    }
    else if (output.length == 1 && output[0] != 0) {
        output = output.slice(0, -1);
        input.textContent = 0;
    }
})

// Adding the eventlistener when user clicks on equal button
equal.addEventListener('click', () => {
    input.classList.add('anim-sh');
    if (input.textContent != '0' && output.length < 1) {
        input.textContent = output;
    }
    else if (output.length > 1) {
        output = eval(output);
        output = truncateDecimal(output);
        input.textContent = output;
    }
    setTimeout(() => {
        input.classList.remove("anim-sh");
    }, 200);
})


//Function to keep only three numbers after the decimal point
function truncateDecimal(str) {
    // Regular expression to match a decimal with more than four digits after the decimal point
    const regex = /(\.\d{0,3})\d*$/;

    // Replace matches with the last four digits after the decimal point
    return str.replace(regex, '$1');
}