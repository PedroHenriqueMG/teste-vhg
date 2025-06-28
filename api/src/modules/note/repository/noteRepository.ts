import { Note } from '../entities/Note';

export abstract class NoteRepository {
  abstract upsert(note): Promise<Note | undefined>;
  abstract findById(id: string): Promise<Note | null>;
  abstract findAll(user_id: string): Promise<Note[]>;
  abstract delete(id: string): Promise<null>;
}
