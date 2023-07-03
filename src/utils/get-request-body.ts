import { IncomingMessage } from "http";
import { UserDto } from "../models/user-dto.js";
import { ResponseStatusCodes } from "../enums/response-status-codes.js";
import { CustomError } from "../errors/custom-error.js";
import { ErrorMessages } from "../enums/error-messages.js";

export const getRequestBody = async (req: IncomingMessage): Promise<{}> => {
    return new Promise((resolve, reject) => {
        const buffer: Uint8Array[] = [];
        req.on('data', (chunk: Uint8Array) => {
            buffer.push(chunk);
        }).on('end', () => {
            const body = Buffer.concat(buffer).toString();
            try {
                const parsedBody = JSON.parse(body);
                return resolve(parsedBody ? parsedBody : {} as UserDto);
            } catch {
                reject(new CustomError(ErrorMessages.BAD_REQUEST, ResponseStatusCodes.BAD_REQUEST));
            }
        }).on('error', () => {
            reject(new CustomError(ErrorMessages.BAD_REQUEST, ResponseStatusCodes.BAD_REQUEST));
        })
    });
}
