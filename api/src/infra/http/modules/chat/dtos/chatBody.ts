import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class ChatBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  input: string;
}
