import {
  Controller,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/post')
  @ApiBearerAuth('JWT')
  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  postMailMessage(@Request() req) {
    return this.mailService.postMail(+req.user['sub'], req.user['email']);
  }

  @Post('/check')
  @ApiBearerAuth('JWT')
  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  checkCode(@Query('code') code: string, @Request() req) {
    return this.mailService.checkCode(code, +req.user['sub']);
  }
}
