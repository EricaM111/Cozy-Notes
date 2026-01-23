package com.example.ensolvers_.repository;

import com.example.ensolvers_.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByArchivedTrue();

    List<Note> findByArchivedFalse();
}

