import * as actionTypes from "./actionTypes"

export const increment = (value) => {
    return {
        type: actionTypes.INCREMENT,
        value: value,
    };
};

export const decrement = (value) => {
    return {
        type: actionTypes.DECREMENT,
        value: value,
    };
};

export const add = (value) => {
    return {
        type: actionTypes.ADD,
        value: value
    };
};

export const subtract = (value) => {
    return {
        type: actionTypes.SUBTRACT,
        value: value,
    };
};