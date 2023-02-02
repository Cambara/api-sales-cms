import { Inject } from '@nestjs/common';
import { MailAdapter, MAIL_ADAPTER_KEY, TemplateService } from '../protocols';

export abstract class AbstractMailService<I> {
  constructor(
    @Inject(MAIL_ADAPTER_KEY)
    protected readonly mailAdapter: MailAdapter,
    protected readonly templateService: TemplateService,
  ) {}
  abstract sendMail(dto: I): Promise<void>;
}
