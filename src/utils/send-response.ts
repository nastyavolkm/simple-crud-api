import { ServerResponse } from "http";
import { ResponseStatusCodes } from "../enums/response-status-codes.js";

export function sendResponse<T>(res: ServerResponse, data: T, statusCode = ResponseStatusCodes.OK) {
    res.statusCode = statusCode;
    res.end(JSON.stringify(data));
}
