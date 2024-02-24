export class ApiResponse<T>{
    message: {title:string, body:string};
    metadata: {
        path: string;
        statusCode: number;
        status: string;
        message: string;
        timestamp: string;
        requestId: string;
        timeElapsed: string;
    };
    data: T
}

export enum ResponseMessage{
    SUCCESS='SUCCESS',
    ERROR='Error',
    WARNING='Warning',
    INFO='Info'
}

export enum ResponseStatus{
    OK='OK',
    ERROR='Error',
    WARNING='Warning',
    INFO='Info'
}