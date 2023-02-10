import { WelcomeMailService } from '../../../../../src/infra/mail/services/welcome_mail.service';
import { createUseClassMockProvider } from '../../../create_mock.helper';

export class Mock {
  async sendMail(): Promise<void> {
    await Promise.resolve();
  }
}

export const WelcomeMailServiceMock = createUseClassMockProvider(
  WelcomeMailService,
  Mock,
);
