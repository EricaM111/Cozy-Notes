package com.example.ensolvers_.service;

import com.example.ensolvers_.model.Note;
import com.example.ensolvers_.repository.NoteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note createNote(String title, String content) {
        Note note = new Note();
        note.setTitle(title);
        note.setContent(content);
        note.setArchived(false);
        return noteRepository.save(note);
    }

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public List<Note> getActiveNotes() {
        return noteRepository.findByArchivedFalse();
    }

    public List<Note> getArchivedNotes() {
        return noteRepository.findByArchivedTrue();
    }

    // 🔹 MÉTODO CENTRAL (clave)
    public Note getNoteById(Long id) {
        return noteRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Note not found with id " + id
                        )
                );
    }

    public Note updateNote(Long id, String title, String content) {
        Note note = getNoteById(id);
        note.setTitle(title);
        note.setContent(content);
        return noteRepository.save(note);
    }

    public void deleteNote(Long id) {
        Note note = getNoteById(id);
        noteRepository.delete(note);
    }

    public Note archiveNote(Long id) {
        Note note = getNoteById(id);
        note.setArchived(true);
        return noteRepository.save(note);
    }

    public Note unarchiveNote(Long id) {
        Note note = getNoteById(id);
        note.setArchived(false);
        return noteRepository.save(note);
    }
}
