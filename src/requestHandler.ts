import { UserService } from "./user.service.js";
import { IncomingMessage, ServerResponse } from "http";
import { HttpMethods } from "./enums/http.methods.js";
import { API_USER, API_USERS } from "./constants/urls.js";
import { users } from "./users.js";
import { UserController } from "./user-controller.js";
import { getError } from "./utils/getError.js";
import { sendResponse } from "./utils/send-response.js";
import { ErrorMessages } from "./enums/error-messages.js";
import { ResponseStatusCodes } from "./enums/response-status-codes.js";
import { CustomError } from "./errors/custom-error.js";

export const requestHandler = (serverPort: number) => {
    const userService = new UserService(users);
    const userController = new UserController(userService);
    return async (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'application/json');

        try {
            const { url, method } = req;
            console.log(`Request Method: ${method} is executing on port ${serverPort}`);
            if (url !== API_USERS && !url!.startsWith(API_USER)) {
                sendResponse(res, ErrorMessages.INVALID_ENDPOINT, ResponseStatusCodes.NOT_FOUND);
            } else {
                switch (method) {
                    case HttpMethods.GET:
                        if (url === API_USERS) {
                            await userController.getUsers(req, res);
                        } else {
                            await userController.getUserById(req, res);
                        }
                        break;
                    case HttpMethods.POST:
                        await userController.createUser(req, res);
                        break;
                    case HttpMethods.PUT:
                        await userController.updateUser(req, res);
                        break;
                    case HttpMethods.DELETE:
                        await userController.deleteUser(req, res);
                        break;
                    default:
                        sendResponse(res, ErrorMessages.INTERNAL_ERROR, ResponseStatusCodes.INTERNAL);
                }
            }
        } catch (err) {
            const error = getError(err);
            if (error instanceof CustomError) {
                sendResponse(res, error.message, error.status);
            } else {
                sendResponse(res, ErrorMessages.INTERNAL_ERROR, ResponseStatusCodes.INTERNAL);
            }
        }
    };
};
