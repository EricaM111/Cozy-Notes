package com.example.ensolvers_.dto;

public class NoteResponse {

    private Long id;
    private String title;
    private String content;
    private boolean archived;

    public NoteResponse(Long id, String title, String content, boolean archived) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.archived = archived;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public boolean isArchived() {
        return archived;
    }
}
