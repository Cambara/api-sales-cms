import { Injectable } from '@nestjs/common';
import {
  IWelcomeMailParameters,
  IWelcomeMailSubjectParameters,
  TemplateEnum,
} from '../protocols';
import { AbstractMailService } from './abstract_mail.service';

interface IHandleDto {
  username: string;
  language: string;
  email: string;
}

@Injectable()
export class WelcomeMailService extends AbstractMailService<IHandleDto> {
  async sendMail({ username, language, email }: IHandleDto): Promise<void> {
    const [subject, { html, text }] = await Promise.all([
      this.templateService.getSubject<IWelcomeMailSubjectParameters>({
        language,
        template: TemplateEnum.WELCOME,
        parameters: { username },
      }),
      this.templateService.getTemplate<IWelcomeMailParameters>({
        language,
        template: TemplateEnum.WELCOME,
        parameters: { username },
      }),
    ]);

    await this.mailAdapter.send({
      html,
      subject,
      text,
      to: email,
    });
  }
}
