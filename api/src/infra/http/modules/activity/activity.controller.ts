import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ActivityUseCase } from 'src/modules/activity/useCase/ActivityUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { ActivityBody, ActivityUpdateBody } from './dtos/activityBody';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
  constructor(private activityUseCase: ActivityUseCase) {}

  @Post()
  async createNote(
    @Body() body: ActivityBody,
    @Request() req: AuthenticatedRequestModel,
  ) {
    const { name, intensity, duration } = body;

    return this.activityUseCase.create({
      user_id: req.user.id,
      name,
      intensity,
      duration,
    });
  }

  @Get()
  async getAll(@Request() req: AuthenticatedRequestModel) {
    const user_id = req.user.id;

    return this.activityUseCase.findAll(user_id);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.activityUseCase.findOne(id);
  }

  @Patch(':id')
  async update(
    @Body() body: ActivityUpdateBody,
    @Param('id') id: string,
    @Request() req: AuthenticatedRequestModel,
  ) {
    const { duration, intensity, name } = body;
    const user_id = req.user.id;

    return this.activityUseCase.update({
      user_id,
      id,
      duration,
      intensity,
      name,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.activityUseCase.delete(id);
  }
}
