import {useReducer, useCallback} from "react";

const initialState = {
    isLoading: false, 
    error: null,
    data: null,
    extra: null,
    identifier: null,
};

const httpReducer = (httpState, action) => {
    switch (action.type) {
      case ("SEND"):
        return {isLoading: true, error: null, data: null, extra: null, identifier: action.identifier};
  
      case ("RESPONSE"):
        return {...httpState, isLoading: false, data: action.responseData, extra: action.extra};
  
      case ("ERROR"):
        return {isLoading: false, error: action.errorMessage};
  
      case ("CLEAR"):
        return initialState;
  
      default:
        throw new Error("httpReducer action not handled");
    }
  };

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback(() => dispatchHttp({type: "CLEAR"}), []);

    const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
        dispatchHttp({type: "SEND", identifier: reqIdentifier});

        fetch(
        url, 
        {
          method: method,
          body: body,
          headers: {
              "Content-Type": "application/json"
          }
        })
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            dispatchHttp({type: "RESPONSE", responseData: responseData, extra: reqExtra});
        })
        .catch(error => {
          dispatchHttp({type: "ERROR", errorMessage: error.message});
        });
    }, []);

    return {
        isLoading: httpState.isLoading,
        error: httpState.error,
        data: httpState.data,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIdentifier: httpState.identifier,
        clear: clear,
    };
};

export default useHttp;