import {useEffect} from "react";

/**
 * Need to useCallback(...) to avoid fn runs on every rerender
 */
export const useDebug = (fn: (debug: boolean) => void) => {
    useEffect(() => {
        fn(process.env.NODE_ENV === "development");
    }, [fn])
}