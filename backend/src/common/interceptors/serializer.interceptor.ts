import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EntityCollectionSerializer<T> implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        if (Array.isArray(value.data)) {
          value.data = this.mapAndSerialize(value.data);
        } else if (Array.isArray(value)) {
          value = this.mapAndSerialize(value);
        }

        return value;
      }),
    );
  }

  mapAndSerialize(data) {
    return data.map((entity) => classToPlain(entity));
  }
}
