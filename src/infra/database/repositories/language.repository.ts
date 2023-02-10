import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageModel } from '../../../domain/models/language.model';
import { LanguageEntity } from '../entities/language.entity';
import { convertDbToModal } from '../mappers/language.mapper';

export interface ILanguageRepository {
  findOneByCode(code: string): Promise<LanguageModel | null>;
}

@Injectable()
export class LanguageRepository implements ILanguageRepository {
  private cacheList: Promise<LanguageEntity[]>;
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languageEntity: Repository<LanguageEntity>,
  ) {
    this.init();
  }

  async findOneByCode(code): Promise<LanguageModel | null> {
    const languageList = await this.cacheList;
    const language = languageList.find((language) => language.code === code);

    return language ? convertDbToModal(language) : null;
  }

  private init(): void {
    this.cacheList = this.languageEntity.find({
      where: {
        isActivated: true,
      },
    });
  }
}
