declare module 'react-native-prettify-logger' {
    function logger(...args: any[]): void;

    // function startLoggingRequests(): void;

    // function stopLoggingRequests(): void;

    function logRequestsWithFilter(filterFunc: (url: string, options: RequestInit) => boolean): void;

    function logLocalStorage(): void;

    // function fetchWithLogging(input: RequestInfo, init?: RequestInit): Promise<Response>;

    const axiosInstance: any;

    export = {
        logger,
        // startLoggingRequests,
        // stopLoggingRequests,
        logRequestsWithFilter,
        logLocalStorage,
        // fetchWithLogging,
        axiosInstance
    }
}
