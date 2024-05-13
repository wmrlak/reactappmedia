import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";


function useThunk(thunk) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    /**
     * Observation 1:
     * dispatch returns a promise which doesn't behave as a normal promise
     * (i.e. if we chain it with then() the then() function is called regardless of a successful request or not)
     * normal promises call then() if the request is successful and catch() if there is an error. For that
     * reason we get the promise and call unwrap() which gives a new promise back that follows the conventional rules.
     *
     * Observation 2:
     * useCallback() function is used to give a reference to a function from previous renders. It has 2 main usages:
     * (A) Second argument is an empty array and useCallback() gives a reference to the original function (first argument) from the first render.
     * (B) Second argument has elements that have changed since last render, useCallback() gives a reference to the new
     * version of the wrapped method (first argument).
     *
     * useCallback() hook is used to reference a function and only re-reference a new
     * function if the dependencies in the second argument change in some way. We use it here to prevent endless cycles
     * when useEffect() hook is used.
     *
     * @type {(function(*): void)|*}
     */
    const runThunk = useCallback((arg) => {
        setIsLoading(true);
        dispatch(thunk(arg))
            .unwrap()                    //get a new promise that works as expected
            .then(() => {})              //called if the request is successful
            .catch(err => setError(err)) //called if the request fails
            .finally(() => setIsLoading(false)); //it is called after then() or catch() has been called
    }, [dispatch, thunk]);

    return [runThunk, isLoading, error];
}

export {useThunk};