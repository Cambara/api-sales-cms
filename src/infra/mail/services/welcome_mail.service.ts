import { Inject, Injectable } from '@nestjs/common';
import {
  MailAdapter,
  MAIL_ADAPTER_KEY,
  IWelcomeMailParameters,
  IWelcomeMailSubjectParameters,
  TemplateService,
  TemplateEnum,
} from '../protocols';

interface IHandleDto {
  username: string;
  language: string;
  email: string;
}

@Injectable()
export class WelcomeMailService {
  constructor(
    @Inject(MAIL_ADAPTER_KEY)
    private readonly mailAdapter: MailAdapter,
    private readonly templateService: TemplateService,
  ) {}

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
