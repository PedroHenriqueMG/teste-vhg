import { MailService } from 'src/service/mail.service';
import { NoteNotFoundException } from '../exceptions/NoteNotFound';
import { makeNote } from '../factories/notesFactories';
import { NoteRepositoryInMemory } from '../repository/NoteRepositoryInMemory';
import { NoteUseCase } from './noteUseCase';
import { MailerService } from '@nestjs-modules/mailer';
import * as Mail from 'nodemailer/lib/mailer';

jest.mock('@nestjs-modules/mailer', () => {
  return {
    MailerService: jest.fn().mockImplementation(() => {
      return {
        sendMail: jest.fn(),
      };
    }),
  };
});

jest.mock('src/service/mail.service', () => {
  const originalModule = jest.requireActual('src/service/mail.service');
  return {
    ...originalModule,
    MailService: jest.fn().mockImplementation(() => {
      return {
        sendEmail: jest.fn(),
      };
    }),
  };
});

let notesUseCase: NoteUseCase;
let notesRepository: NoteRepositoryInMemory;
let mailService: MailService;
let mailerService: MailerService;

describe('Notes', () => {
  beforeEach(() => {
    notesRepository = new NoteRepositoryInMemory();
    const mockMailerOptions = {};
    const mockTransportFactory = {
      createTransport: jest.fn().mockReturnValue({} as Mail),
    };
    mailerService = new MailerService(mockMailerOptions, mockTransportFactory);
    mailService = new MailService(mailerService);
    notesUseCase = new NoteUseCase(notesRepository, mailService);
  });

  it('should create new note', async () => {
    expect(notesRepository.notes).toEqual([]);

    await notesUseCase.create({
      note: 'testando',
      title: 'teste',
      user_email: 'teste@gmail.com',
      user_id: 'userId',
    });

    await expect(notesRepository.notes).toHaveLength(1);
  });

  it('get all notes', async () => {
    const note1 = makeNote();
    const note2 = makeNote();

    notesRepository.notes.push(note1, note2);

    const notes = await notesUseCase.findAll(note1.user_id);

    expect(notes).toHaveLength(2);
  });

  it('get note by id', async () => {
    const note1 = makeNote({ id: 'id1' });
    const note2 = makeNote({ id: 'id2' });

    notesRepository.notes.push(note1, note2);

    const getnote = await notesUseCase.findOne(note2.id);

    expect(getnote).toEqual(note2);
  });

  it('should not found note', async () => {
    const note1 = makeNote({ id: 'id1' });
    notesRepository.notes.push(note1);

    expect(async () => await notesUseCase.findOne('id2')).rejects.toThrowError(
      NoteNotFoundException,
    );
  });

  it('update note', async () => {
    const note = makeNote({ id: 'id1' });

    notesRepository.notes.push(note);

    const noteUpdate = await notesUseCase.update({
      note: 'ta testado 2',
      title: 'teste2',
      description: 'testado 2',
      id: note.id,
      user_id: 'user1',
    });

    expect(noteUpdate).not.toBeUndefined();
    if (noteUpdate) {
      const newNote = notesRepository.notes.find((n) => n.id === note.id);

      expect(newNote).not.toBeUndefined();
      if (newNote) {
        expect(noteUpdate).toEqual(newNote);
      }
    }
  });

  it('delete note', async () => {
    const note = makeNote({ id: 'id1' });

    notesRepository.notes.push(note);

    const deletedNote = await notesUseCase.delete(note.id);

    expect(deletedNote).toBeNull();
  });
});
