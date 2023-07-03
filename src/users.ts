import { User } from "./models/user";
import { v4 as uuidv4 } from 'uuid';

export const users: User[] = [
    {
        id: uuidv4(),
        username: 'Nastya',
        age: 31,
        hobbies: ['reading'],
    },
];
