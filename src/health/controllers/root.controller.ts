import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class RootController {
  @Get()
  @HttpCode(204)
  index(): void {
    return;
  }
}
