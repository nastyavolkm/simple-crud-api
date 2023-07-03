import { User } from "./models/user.js";
import { v4 as uuidv4 } from 'uuid';
import { isIdValid, isUserValid } from "./utils/validation.js";
import { UserDto } from "./models/user-dto.js";
import { ResponseStatusCodes } from "./enums/response-status-codes.js";
import { CustomError } from "./errors/custom-error.js";
import { getIdErrorMessage } from "./utils/get-id-error-message.js";
import { getInvalidIdErrorMessage } from "./utils/get-invalid-id-error-message.js";
import { ErrorMessages } from "./enums/error-messages.js";

export class UserService {
    users: User[] = [];
    constructor(users: User[]) {
        this.users = users;
    }
    public async getUsers(): Promise<User[]> {
        return this.users;
    }

    public async getUserById(id: string): Promise<User> {
        if (isIdValid(id)) {
            const user = this.users.find(user => user.id === id);
            if (user) {
                return user;
            }
            throw new CustomError(getIdErrorMessage(id), ResponseStatusCodes.NOT_FOUND);
        }
        throw new CustomError(getInvalidIdErrorMessage(id), ResponseStatusCodes.BAD_REQUEST);
    }

    public async createUser(partialUser: UserDto): Promise<User> {
        if (isUserValid(partialUser)) {
            const id = uuidv4();
            const user = {
                ...partialUser,
                id,
            };
            this.users.push(user);
            return user;
        }
        throw new CustomError(ErrorMessages.BAD_REQUEST, ResponseStatusCodes.BAD_REQUEST);
    }
    public async updateUser(itemId: string, item: Partial<User>): Promise<User> {
        const index = this.users.findIndex(({id}) => id === itemId);
        if (index > -1) {
            this.users[index] = {
                ...this.users[index],
                ...item,
            };
            return this.users[index];
        }
        throw new CustomError(getIdErrorMessage(itemId), ResponseStatusCodes.NOT_FOUND);
    }

    public async deleteUser(id: string): Promise<boolean> {
        const index = this.users.findIndex(user => user.id === id);
        if (index > -1) {
            this.users.splice(index, 1);
            return true;
        }
        throw new CustomError(getIdErrorMessage(id), ResponseStatusCodes.NOT_FOUND);
    }
}
