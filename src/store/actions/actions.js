export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const ADD = "ADD";
export const SUBTRACT = "SUBTRACT";
export const STORE_RESULT = "STORE_RESULT";
export const DELETE_RESULT = "DELETE_RESULT";

export const increment = (value) => {
    return {
        type: INCREMENT,
        value: value,
    };
};

export const decrement = (value) => {
    return {
        type: DECREMENT,
        value: value,
    };
};

export const add = (value) => {
    return {
        type: ADD,
        value: value
    };
};

export const subtract = (value) => {
    return {
        type: SUBTRACT,
        value: value,
    };
};

export const saveResult = (result) => {
    return {
        type: STORE_RESULT,
        result: result,
    };
};

export const storeResult = (result) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(result))
        }, 2000);
    }  
};

export const deleteResult = (id) => {
    return {
        type: DELETE_RESULT,
        resultId: id,
    };
};