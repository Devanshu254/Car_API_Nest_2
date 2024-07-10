import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt} from 'crypto';
// Crypto package is a part of node standard library, randombytes(we are going to use to generate our salt) scrypt: actual hashing password. This scrypt function is asynchronous in nature. Rather than giving us promise we will have to use call backs. So, we will do one more extra thing in order to remove this means in order to make sure that scrypt gives us promise so we do not have to use callbacks.
import { promisify } from 'util';
import { NotFoundError } from 'rxjs';
// Promisify is a function that will take a function that will make use of callbacks and it is going to give us back a version of that exact same function that makes use of promises.

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        const users = await this.usersService.find(email); 
        if(users.length) {
            throw new BadRequestException('email in use');
        }
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');
        const user = await this.usersService.create(email, result);
        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if(!user) {
            throw new NotFoundException('user not found');
        }
        const [salt, Storedhash] = user.password.split('.');
        const hash = (await scrypt(password, salt , 32)) as Buffer;
        if(Storedhash !== hash.toString('hex')) {
            throw new BadRequestException('bad password');
        }
        return user;
    }
}