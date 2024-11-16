import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { UserService } from 'src/user/user.service';
@Injectable()
export class MailService implements OnModuleInit {
  private mailTransport: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  > = null;
  constructor(private userService: UserService) {}

  async postMail(userId: number, userEmail: string) {
    try {
      const emailCode = this.generateEmailToken();

      this.userService.update(userId, { emailCode });

      const htmlText = await this.readHtml('src/mail/resources/mail.html');

      const html = htmlText.replace('{CODE}', emailCode);

      this.mailTransport.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: userEmail,
        subject: 'Notes Verification',
        html,
      });

      return;
    } catch (error) {
      console.log(error);
    }
  }

  async readHtml(path: string): Promise<string> {
    const htmlText = await fs.readFile(path);

    return htmlText.toString();
  }

  async onModuleInit() {
    this.mailTransport = nodemailer.createTransport({
      service: 'smtp.yandex.ru',
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  generateEmailToken() {
    const codeLength = 4;

    const characters = '0123456789';

    let result = '';

    const charactersLength = characters.length;
    let counter = 0;
    while (counter < codeLength) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
  }
}
