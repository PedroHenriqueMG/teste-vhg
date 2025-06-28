import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class SignUpBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsEmailCustom()
  @ApiProperty()
  email: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  @ApiProperty()
  password: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  @ApiProperty()
  name: string;
}
