import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt} from 'crypto';
// Crypto package is a part of node standard library, randombytes(we are going to use to generate our salt) scrypt: actual hashing password. This scrypt function is asynchronous in nature. Rather than giving us promise we will have to use call backs. So, we will do one more extra thing in order to remove this means in order to make sure that scrypt gives us promise so we do not have to use callbacks.
import { promisify } from 'util';
// Promisify is a function that will take a function that will make use of callbacks and it is going to give us back a version of that exact same function that makes use of promises.

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        // See the email is in use.
        const users = await this.usersService.find(email); 
        if(users.length) {
            throw new BadRequestException('email in use');
        }
        // Hash the password.
        // Generate a salt.
        const salt = randomBytes(8).toString('hex');
        // The `randomBytes(8).toString('hex')` function generates a cryptographically strong pseudorandom string of 8 bytes (64 bits) and converts it to a hexadecimal representation. Each byte is displayed using two characters in hexadecimal format. So, the resulting string will be 16 characters long, representing the 8 random bytes¹². For example, it might produce something like `ee48d32e6c724c4d`. 😊


        // Hash the salt and password together.
        const hash = (await scrypt(password, salt, 32)) as Buffer; // 32: will give us back 32 characters or 32 bytes. Buffer will get returned by calling scrypt function.

        // Join the hash result and the salt together.
        const result = salt + '.' + hash.toString('hex');

        // Create a new user and save it.
        
        // return the user.
    }

    signin() {

    }
}