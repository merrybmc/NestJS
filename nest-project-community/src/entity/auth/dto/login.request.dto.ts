import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/entity/cat/cat.schema';

export class LoginRequestDto extends PickType(Cat, ['email', 'password']) {}
