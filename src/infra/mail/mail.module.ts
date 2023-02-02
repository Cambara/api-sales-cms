import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MAIL_ADAPTER_KEY,
  NodemailerAdapter,
} from '@sales-cms-project/lib-email';
import { configEnum } from '../../config/config.loader';
import { IMailConfig } from '../../config/config_loader.interface';

const MailAdapter: Provider = {
  provide: MAIL_ADAPTER_KEY,
  useFactory: async (configService: ConfigService) => {
    const mailConfig = configService.get<IMailConfig>(configEnum.MAIL);
    const mailAdapter = new NodemailerAdapter(mailConfig);

    const isValid = await mailAdapter.verify();
    if (!isValid) {
      throw Error('Error to connect with the Mail Adapter');
    }

    return mailAdapter;
  },
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule],
  providers: [MailAdapter],
  exports: [],
})
export class MailModule {}
