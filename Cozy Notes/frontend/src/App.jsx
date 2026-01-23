import { useEffect, useState } from "react";
import logo from "./assets/Logo.png";

function App() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("all");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const MAX_CONTENT_LENGTH = 500;

    useEffect(() => {
        fetch("http://localhost:8080/api/notes")
            .then((res) => res.json())
            .then((data) => {
                setNotes(data);
                setLoading(false);
            });
    }, []);

    const createNote = () => {
        fetch("http://localhost:8080/api/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        })
            .then((res) => res.json())
            .then((newNote) => {
                setNotes([...notes, newNote]);
                setTitle("");
                setContent("");
            });
    };

    const deleteNote = (id) => {
        fetch(`http://localhost:8080/api/notes/${id}`, {
            method: "DELETE",
        }).then(() => {
            setNotes(notes.filter((note) => note.id !== id));
        });
    };

    const archiveNote = (id) => {
        fetch(`http://localhost:8080/api/notes/${id}/archive`, {
            method: "PUT",
        }).then(() => {
            setNotes(
                notes.map((note) =>
                    note.id === id ? { ...note, archived: true } : note
                )
            );
        });
    };

    const unarchiveNote = (id) => {
        fetch(`http://localhost:8080/api/notes/${id}/unarchive`, {
            method: "PUT",
        }).then(() => {
            setNotes(
                notes.map((note) =>
                    note.id === id ? { ...note, archived: false } : note
                )
            );
        });
    };

    const isDisabled =
        title.trim() === "" ||
        content.trim() === "" ||
        content.length > MAX_CONTENT_LENGTH;

    const visibleNotes =
        view === "all"
            ? notes.filter((n) => !n.archived)
            : notes.filter((n) => n.archived);

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                background:
                    "linear-gradient(180deg, #FADADD 0%, #E6D9FF 50%, #DFF1FF 100%)",
                fontFamily: "system-ui, sans-serif",
                padding: "2rem 3rem",
                boxSizing: "border-box",
                color: "#000",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "2rem",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: "38px",
                            height: "38px",
                            objectFit: "contain",
                        }}
                    />

                    <h1
                        style={{
                            fontWeight: "800",
                            fontSize: "2rem",
                            color: "#000",
                            margin: 0,
                        }}
                    >
                        Cozy Notes
                    </h1>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                        onClick={() => setView("all")}
                        style={{
                            padding: "0.4rem 1rem",
                            borderRadius: "10px",
                            border: "1px solid #000",
                            backgroundColor:
                                view === "all" ? "#000" : "#fff",
                            color: view === "all" ? "#fff" : "#000",
                            fontWeight: "700",
                            cursor: "pointer",
                        }}
                    >
                        Mis notas
                    </button>

                    <button
                        onClick={() => setView("archived")}
                        style={{
                            padding: "0.4rem 1rem",
                            borderRadius: "10px",
                            border: "1px solid #000",
                            backgroundColor:
                                view === "archived" ? "#000" : "#fff",
                            color: view === "archived" ? "#fff" : "#000",
                            fontWeight: "700",
                            cursor: "pointer",
                        }}
                    >
                        Archivadas
                    </button>
                </div>
            </div>

            {loading && <p style={{ color: "#000" }}>Cargando...</p>}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "1.5rem",
                }}
            >
                <div
                    style={{
                        background: "rgba(255,255,255,0.9)",
                        padding: "1.2rem",
                        borderRadius: "18px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "220px",
                        color: "#000",
                    }}
                >
                    <input
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            marginBottom: "0.5rem",
                            padding: "0.6rem",
                            fontWeight: "600",
                            borderRadius: "8px",
                            border: "2px solid #990069",
                            backgroundColor: "#fff",
                            color: "#000000",
                        }}
                    />

                    <textarea
                        placeholder="Contenido"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{
                            padding: "0.6rem",
                            resize: "none",
                            borderRadius: "8px",
                            border: "2px solid #990069",
                            backgroundColor: "#fff",
                            flexGrow: 1,
                            color: "#000000",
                        }}
                    />

                    <div
                        style={{
                            fontSize: "0.75rem",
                            textAlign: "right",
                            marginTop: "0.2rem",
                            fontWeight: "600",
                            color:
                                content.length > MAX_CONTENT_LENGTH
                                    ? "#C1121F"
                                    : "#333",
                        }}
                    >
                        {content.length} / {MAX_CONTENT_LENGTH}
                    </div>

                    <button
                        onClick={createNote}
                        disabled={isDisabled}
                        style={{
                            marginTop: "0.6rem",
                            padding: "0.6rem",
                            borderRadius: "20px",
                            border: "none",
                            backgroundColor: isDisabled
                                ? "#9AD0A3"
                                : "#2ECC71",
                            color: "#fff",
                            fontWeight: "700",
                            cursor: isDisabled
                                ? "not-allowed"
                                : "pointer",
                        }}
                    >
                        Crear nota
                    </button>
                </div>

                {visibleNotes.map((note) => (
                    <div
                        key={note.id}
                        style={{
                            background:
                                "linear-gradient(180deg, #FFFFFF 0%, #FFF1F6 100%)",
                            padding: "1.2rem",
                            borderRadius: "18px",
                            boxShadow:
                                "0 8px 20px rgba(0,0,0,0.08)",
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "220px",
                            color: "#000",
                        }}
                    >
                        <strong style={{ fontSize: "1.1rem", color: "#000" }}>
                            {note.title}
                        </strong>

                        <p style={{ marginTop: "0.5rem", flexGrow: 1, color: "#000" }}>
                            {note.content}
                        </p>

                        <div
                            style={{
                                display: "flex",
                                gap: "0.5rem",
                                marginTop: "1rem",
                            }}
                        >
                            {!note.archived ? (
                                <button
                                    onClick={() => archiveNote(note.id)}
                                    style={{
                                        backgroundColor: "#F4A261",
                                        color: "#fff",
                                        fontWeight: "700",
                                        border: "none",
                                        borderRadius: "20px",
                                        padding: "0.4rem 1rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    Archivar
                                </button>
                            ) : (
                                <button
                                    onClick={() => unarchiveNote(note.id)}
                                    style={{
                                        backgroundColor: "#6C63FF",
                                        color: "#fff",
                                        fontWeight: "700",
                                        border: "none",
                                        borderRadius: "20px",
                                        padding: "0.4rem 1rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    Desarchivar
                                </button>
                            )}

                            <button
                                onClick={() => deleteNote(note.id)}
                                style={{
                                    backgroundColor: "#E63946",
                                    color: "#fff",
                                    fontWeight: "700",
                                    border: "none",
                                    borderRadius: "20px",
                                    padding: "0.4rem 1rem",
                                    cursor: "pointer",
                                }}
                            >
                                Eliminar Nota
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;














