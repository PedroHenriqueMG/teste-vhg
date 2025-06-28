import { Note } from '../entities/Note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override = {}) => {
  return new Note(
    {
      title: 'teste',
      note: 'ta testado',
      description: 'teste',
      user_id: 'user1',
      ...override,
    },
    id,
  );
};
