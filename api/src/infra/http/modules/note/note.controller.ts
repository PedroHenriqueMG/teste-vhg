import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { NoteUseCase } from 'src/modules/note/useCase/noteUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { NoteBody } from './dtos/noteBody';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
  constructor(private noteUseCase: NoteUseCase) {}

  @Post()
  async createNote(
    @Body() body: NoteBody,
    @Request() req: AuthenticatedRequestModel,
  ) {
    const { note, title, description } = body;

    return this.noteUseCase.create({
      user_id: req.user.id,
      user_email: req.user.email,
      note,
      title,
      description,
    });
  }

  @Get()
  async getAll(@Request() req: AuthenticatedRequestModel) {
    const user_id = req.user.id;

    return this.noteUseCase.findAll(user_id);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.noteUseCase.findOne(id);
  }

  @Put(':id')
  async update(
    @Body() body: NoteBody,
    @Param('id') id: string,
    @Request() req: AuthenticatedRequestModel,
  ) {
    const { note, title, description } = body;
    const user_id = req.user.id;

    return this.noteUseCase.update({
      user_id,
      id,
      note,
      title,
      description,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.noteUseCase.delete(id);
  }
}
