package com.example.ensolvers_.controller;

import com.example.ensolvers_.dto.NoteRequest;
import com.example.ensolvers_.dto.NoteResponse;
import com.example.ensolvers_.model.Note;
import com.example.ensolvers_.service.NoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public NoteResponse createNote(@RequestBody NoteRequest request) {
        Note note = noteService.createNote(
                request.getTitle(),
                request.getContent()
        );

        return new NoteResponse(
                note.getId(),
                note.getTitle(),
                note.getContent(),
                note.isArchived()
        );
    }

    @GetMapping
    public List<NoteResponse> getAllNotes() {
        return noteService.getAllNotes()
                .stream()
                .map(note -> new NoteResponse(
                        note.getId(),
                        note.getTitle(),
                        note.getContent(),
                        note.isArchived()
                ))
                .collect(Collectors.toList());
    }


    @GetMapping("/{id}")
    public NoteResponse getNoteById(@PathVariable Long id) {
        Note note = noteService.getNoteById(id);

        return new NoteResponse(
                note.getId(),
                note.getTitle(),
                note.getContent(),
                note.isArchived()
        );
    }

    @GetMapping("/active")
    public List<NoteResponse> getActiveNotes() {
        return noteService.getActiveNotes()
                .stream()
                .map(note -> new NoteResponse(
                        note.getId(),
                        note.getTitle(),
                        note.getContent(),
                        note.isArchived()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/archived")
    public List<NoteResponse> getArchivedNotes() {
        return noteService.getArchivedNotes()
                .stream()
                .map(note -> new NoteResponse(
                        note.getId(),
                        note.getTitle(),
                        note.getContent(),
                        note.isArchived()
                ))
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public NoteResponse updateNote(@PathVariable Long id, @RequestBody NoteRequest request) {
        Note note = noteService.updateNote(
                id,
                request.getTitle(),
                request.getContent()
        );

        return new NoteResponse(
                note.getId(),
                note.getTitle(),
                note.getContent(),
                note.isArchived()
        );
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
    }

    @PutMapping("/{id}/archive")
    public NoteResponse archiveNote(@PathVariable Long id) {
        Note note = noteService.archiveNote(id);

        return new NoteResponse(
                note.getId(),
                note.getTitle(),
                note.getContent(),
                note.isArchived()
        );
    }

    @PutMapping("/{id}/unarchive")
    public NoteResponse unarchiveNote(@PathVariable Long id) {
        Note note = noteService.unarchiveNote(id);

        return new NoteResponse(
                note.getId(),
                note.getTitle(),
                note.getContent(),
                note.isArchived()
        );
    }

}
