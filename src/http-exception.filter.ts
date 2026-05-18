import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { LoggerService } from './logger/logger.service';
import { PrismaClientValidationError } from './generate/prisma/internal/prismaNamespace';

type MyResponeObject = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new LoggerService(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObject: MyResponeObject = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myResponseObject.statusCode = exception.getStatus();
      myResponseObject.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myResponseObject.statusCode = 422;
      myResponseObject.response = exception.message.replaceAll(/\n/g, ' ');
    } else {
      myResponseObject.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObject.response = 'Internal server error';
    }

    response.status(myResponseObject.statusCode).json(myResponseObject);
    this.logger.error(myResponseObject.response, HttpExceptionFilter.name);
    super.catch(exception, host);
  }
}
