import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// AuthGuard - strategy 자동으로 생성
export class JwtAuthGuard extends AuthGuard('jwt') {}
