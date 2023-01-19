import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardStrategyEnum } from '../protocols.interface';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthGuardStrategyEnum.LOCAL) {}
