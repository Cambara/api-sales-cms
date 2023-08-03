import { InjectRepository } from '@nestjs/typeorm';
import {
  TemporaryTokenModel,
  TemporaryTokenTypeEnum,
} from '../../../domain/models/temporary_token.model';
import { TemporaryTokenEntity } from '../entities/temporary_token.entity';
import { MoreThan, Repository } from 'typeorm';
import { convertDbToModel } from '../mappers/temporary_token.mapper';
import { TimeUnitEnum, addTime } from '../../../shared/helpers/date.helper';
import { Injectable } from '@nestjs/common';

interface ICreateDto {
  token: string;
  type: TemporaryTokenTypeEnum;
  data: unknown;
  expiredAt?: Date;
}

export interface ITemporaryTokenRepository {
  findByToken(token: string): Promise<TemporaryTokenModel | null>;
  create(dto: ICreateDto): Promise<TemporaryTokenModel>;
}

@Injectable()
export class TemporaryTokenRepository implements ITemporaryTokenRepository {
  constructor(
    @InjectRepository(TemporaryTokenEntity)
    private readonly temporaryTokenEntity: Repository<TemporaryTokenEntity>,
  ) {}

  async findByToken(token: string): Promise<TemporaryTokenModel | null> {
    const entity = await this.temporaryTokenEntity.findOne({
      where: {
        token,
        expiredAt: MoreThan(new Date()),
        usedAt: null,
      },
    });

    return entity ? convertDbToModel(entity) : null;
  }

  async create({
    token,
    type,
    data,
    expiredAt,
  }: ICreateDto): Promise<TemporaryTokenModel> {
    const entity = await this.temporaryTokenEntity.create({
      token,
      type,
      data,
      expiredAt: expiredAt || addTime(new Date(), 30, TimeUnitEnum.MINUTE),
    });
    return convertDbToModel(entity);
  }
}
