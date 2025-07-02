import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class ActivityNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Atividade não encontrada',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
