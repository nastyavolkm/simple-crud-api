import { UserService } from "./user.service.js";
import { IncomingMessage, ServerResponse } from "http";
import { ResponseStatusCodes } from "./enums/response-status-codes.js";
import { UserDto } from "./models/user-dto.js";
import { getIdFromUrl } from "./utils/get-id-from-url.js";
import { getRequestBody } from "./utils/get-request-body.js";
import { sendResponse } from "./utils/send-response.js";

export class UserController {
    constructor(private userService: UserService) {
    }
    public async getUsers(_: IncomingMessage, res: ServerResponse) {
        const users = await this.userService.getUsers();
        sendResponse(res, users);
    }

    public async getUserById(req: IncomingMessage, res: ServerResponse) {
        const id = getIdFromUrl(req.url)!;
        const user = await this.userService.getUserById(id);
        sendResponse(res, user);
    }

    public async createUser(req: IncomingMessage, res: ServerResponse) {
        const body = await getRequestBody(req) as UserDto;
        const user = await this.userService.createUser(body);
        sendResponse(res, user, ResponseStatusCodes.CREATED);
    }

    public async updateUser(req: IncomingMessage, res: ServerResponse) {
        const id = getIdFromUrl(req.url)!;
        const body = await getRequestBody(req);
        const user = await this.userService.updateUser(id, body);
        sendResponse(res, user);
    }

    public async deleteUser(req: IncomingMessage, res: ServerResponse) {
        const id = getIdFromUrl(req.url)!;
        await this.userService.deleteUser(id);
        sendResponse(res, null, ResponseStatusCodes.NO_CONTENT);
    }
}
