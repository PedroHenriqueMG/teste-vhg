import { ApiProperty } from '@nestjs/swagger';
import { ActivityIntensity } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';

export class ActivityBody {
  @IsNotEmptyCustom()
  @ApiProperty()
  name: string;

  @ApiProperty({ enum: ActivityIntensity })
  intensity: ActivityIntensity;

  @IsNotEmptyCustom()
  @ApiProperty()
  duration: string;
}

export class ActivityUpdateBody {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty({ enum: ActivityIntensity })
  @IsOptional()
  intensity?: ActivityIntensity;

  @IsOptional()
  @ApiProperty()
  duration?: string;
}
