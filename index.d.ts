declare module 'react-native-prettify-logger' {
    function logger(...args: any[]): Promise<void>;

    function logLocalStorage(): void;

    const fetchWithLogging: {
        get: (url: string) => Promise<any>;
        post: (url: string, data: any) => Promise<any>;
        put: (url: string, data: any) => Promise<any>;
        delete: (url: string) => Promise<any>;
    };

    const axiosInstance: {
        get: (url: string) => Promise<any>;
        post: (url: string, data: any) => Promise<any>;
        put: (url: string, data: any) => Promise<any>;
        delete: (url: string) => Promise<any>;
    };

    export {
        logger,
        logLocalStorage,
        fetchWithLogging,
        axiosInstance
    };
}

