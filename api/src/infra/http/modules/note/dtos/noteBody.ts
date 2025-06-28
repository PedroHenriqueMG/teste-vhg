import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';

export class NoteBody {
  @IsNotEmptyCustom()
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description: string;

  @IsNotEmptyCustom()
  @ApiProperty()
  note: string;
}

export class NoteUpdateBody {
  id: string;
  title: string;
  description?: string;
  note: string;
}
