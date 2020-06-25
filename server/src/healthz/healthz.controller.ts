import { Controller, Get, Response, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('healthz')
export class HealthzController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('/')
  healthCheck(@Response() res) {
    if (this.connection.readyState === 1) {
      res.status(HttpStatus.OK).json({ db: { status: 'up' } });
    } else {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ db: { status: 'down' } });
    }
  }
}
