import { ResponseStatusCodes } from "../enums/response-status-codes.js";
import { ErrorMessages } from "../enums/error-messages.js";

export class CustomError extends Error {
    public status: ResponseStatusCodes = ResponseStatusCodes.OK;
    constructor(message: string | ErrorMessages, status = ResponseStatusCodes.OK) {
        super(message);
        this.status = status;
    }
}
