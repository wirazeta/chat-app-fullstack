import { HttpStatus, Inject, Injectable, HttpCode } from "@nestjs/common";
import { ApiResponse, ResponseMessage, ResponseStatus } from "./response.dto";
import { Request } from 'express';

@Injectable()
export class ResponseService {
    generateApiResponse<T>(
        statusCode: number,
        message: string,
        path: string,
        requestId: string,
        timeElapsed: string,
        data: T,
    ): ApiResponse<T> {
        const status = statusCode >= 200 && statusCode < 400 ? 'OK' : 'Error';

        return {
            message: {
                title: status,
                body: message
            },
            metadata: {
                path,
                statusCode,
                status,
                message: `${path} [${statusCode}] ${status}`,
                timestamp: new Date().toISOString(),
                requestId,
                timeElapsed,
            },
            data
        }
    }

    // Function to return Success Response
    ReturnHttpSuccess(req: Request, data: any): ApiResponse<any> {
        const status = "OK";
        const path = req.path;
        const statusCode = HttpStatus.OK;
        const requestId = req.headers['x-request-id'] || '';

        return {
            message: {
                title: status,
                body: ResponseMessage.SUCCESS,
            },
            metadata: {
                path,
                statusCode,
                status,
                message: `${path} [${statusCode}] ${status}`,
                timestamp: new Date().toISOString(),
                requestId: "requestId",
                timeElapsed: '0.0',
            },
            data,
        };
    }

    // Function to return Http Error
    ReturnHttpError(req: Request, errorCode: number){
        const status = ResponseStatus.ERROR;
        const path = req.path;
        const statusCode = errorCode;
        const requestId = req.headers['x-request-id'] || '';

        return {
            message: {
                title: status,
                body: ResponseMessage.ERROR
            },
            metadata:{
                path,
                statusCode,
                status,
                message: `${path} [${statusCode}] ${status}`,
                timestamp: new Date().toISOString(),
                requestId: "requestId",
                timeElapsed: "0.0"
            }
        };
    }
}