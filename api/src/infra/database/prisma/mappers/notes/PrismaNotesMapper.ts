import { Note } from 'src/modules/note/entities/Note';

export class PrismaNotesMapper {
  static toCreate({ description, id, note, title, user_id }: Note) {
    return {
      description,
      note,
      title,
      user_id,
      id,
    };
  }
}
