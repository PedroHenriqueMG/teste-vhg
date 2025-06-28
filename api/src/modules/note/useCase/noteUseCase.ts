import { Injectable } from '@nestjs/common';
import { MailService } from 'src/service/mail.service';
import { Note } from '../entities/Note';
import { NoteNotFoundException } from '../exceptions/NoteNotFound';
import { NoteRepository } from '../repository/noteRepository';

interface NoteProps {
  user_id: string;
  user_email: string;
  title: string;
  description?: string;
  note: string;
}

interface NoteUpdateProps {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  note: string;
}

@Injectable()
export class NoteUseCase {
  constructor(
    private noteRepository: NoteRepository,
    private mailService: MailService,
  ) {}

  async create({ note, title, description, user_id, user_email }: NoteProps) {
    const notes = new Note({
      description,
      note,
      title,
      user_id,
    });
    const createNote = await this.noteRepository.upsert(notes);

    await this.mailService.sendEmail(user_email);

    return createNote;
  }

  async findAll(user_id: string) {
    const allNotes = await this.noteRepository.findAll(user_id);

    return allNotes;
  }

  async findOne(id: string) {
    const note = await this.noteRepository.findById(id);

    if (!note) throw new NoteNotFoundException();

    return note;
  }

  async update({
    id,
    note,
    title,
    description,
    user_id,
  }: NoteUpdateProps): Promise<Note | undefined> {
    const existNote = await this.noteRepository.findById(id);

    if (!existNote) throw new NoteNotFoundException();

    const updateNote = await this.noteRepository.upsert({
      user_id,
      id,
      note,
      title,
      description,
    });

    return updateNote;
  }

  async delete(id: string) {
    const existNote = await this.noteRepository.findById(id);

    if (!existNote) throw new NoteNotFoundException();

    return this.noteRepository.delete(id);
  }
}
