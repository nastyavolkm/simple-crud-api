import { validate } from 'uuid';
import { UserDto } from "../models/user-dto";

export const isIdValid = (id: string): boolean => {
    return validate(id);
}

export const isUserValid = (user: UserDto): boolean => {
    return typeof user.username === 'string' && user.username.length > 0
    && typeof user.age === 'number'
    && Array.isArray(user.hobbies) && user.hobbies.every((hobby) => typeof hobby === 'string');
}
