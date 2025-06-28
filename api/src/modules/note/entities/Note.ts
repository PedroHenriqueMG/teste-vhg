import { randomUUID } from 'crypto';
import { Replace } from 'src/types/replace';

interface NoteSchema {
  user_id: string;
  title: string;
  description?: string;
  note: string;
}
export class Note {
  private props: NoteSchema;
  private _id: string;

  constructor(props: Replace<NoteSchema, {}>, id?: string) {
    this.props = {
      ...props,
      description: props.description || '',
    };
    this._id = id || randomUUID();
  }

  get id() {
    return this._id;
  }

  get user_id() {
    return this.props.user_id;
  }

  set user_id(user_id: string) {
    this.props.user_id = user_id;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get note() {
    return this.props.note;
  }

  set note(note: string) {
    this.props.note = note;
  }

  get description() {
    return this.props.description;
  }
}
