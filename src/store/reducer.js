const initialState = {
    counter: 0,
    results: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ("INCREMENT"):
            return {
                ...state,
                counter: state.counter + action.value
            }
            
        case ("DECREMENT"):
            return {
                ...state,
                counter: state.counter - action.value
            }
        
        case ("ADD"):
            return {
                ...state,
                counter: state.counter + action.value
            }
        
        case ("SUBTRACT"):
            return {
                ...state,
                counter: state.counter - action.value
            }

        case ("STORE_RESULT"):
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: state.counter})
            }

        case ("DELETE_RESULT"):
            const updatedArray = state.results.filter(result => result.id !== action.ResultId);

            return { 
                ...state,
                results: updatedArray,
            }

        default:
            console.log("Reducer Action type not handled: " + action.type)
            return state;
    }    
}

export default reducer;