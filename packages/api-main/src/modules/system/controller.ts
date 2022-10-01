import { Controller, Get } from '@nestjs/common';

@Controller('system')
export class SystemController {
  @Get('debug')
  public debug(): unknown {
    return {
      env: process.env.NODE_ENV,
      uptime: process.uptime(),
    };
  }
}
