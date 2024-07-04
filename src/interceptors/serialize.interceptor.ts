// It is going to take an object and serialize it eventually into json.
import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// Implements is not same as extends: we use extends when we are subclassing an existing class, but we make use of implements anytime when we want to create a new class that satisfies all the requirements either in abstract class or in interface.
// By adding implements: typescript is going to check all the methods which are there within this interface NestInterceptor.

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run something before a request is handled by the request handler.
        console.log('I am running before the handler', context);

        // Code that deals with outgoing request.
        return handler.handle().pipe(
            map((data: any) => {
                // Run something before the response is sent out.
                console.log('I am running before response is sent out', data);
            }),
        );
    }
}