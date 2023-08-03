import { Module, Provider } from '@nestjs/common';
import { UNIQUE_IDENTIFIER_ADAPTER_KEY } from './unique_identifier.protocol';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IUniqueIdentifierConfig } from '../../config/config_loader.interface';
import { configEnum } from '../../config/config.loader';
import { Uuid5Adapter } from './uuid5.adapter';

const UniqueIdentifierAdapter: Provider = {
  provide: UNIQUE_IDENTIFIER_ADAPTER_KEY,
  useFactory: (configService: ConfigService) => {
    const { namespace } = configService.get<IUniqueIdentifierConfig>(
      configEnum.UNIQUE_IDENTIFIER,
    );

    return new Uuid5Adapter(namespace);
  },
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule],
  providers: [UniqueIdentifierAdapter],
  exports: [UniqueIdentifierAdapter],
})
export class UniqueIdentifierModule {}
