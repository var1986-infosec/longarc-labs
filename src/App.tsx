import { useEffect, useState } from "react";
import NotesList from "./components/NotesList";

function App() {
  const [notes, setNotes] = useState<string[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    if (input.trim() === "") return;

    setNotes((prev) => [...prev, input]);
    setInput("");
  }

  function deleteNote(index: number) {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  }

function startEditing(index: number) {
  setEditingIndex(index);
  setEditText(notes[index]);
}

function saveEdit() {
  if (editingIndex === null) return;

  setNotes((prev) =>
    prev.map((note, index) =>
      index === editingIndex ? editText : note
    )
  );

  setEditingIndex(null);
  setEditText("");
}

  const filteredNotes = notes
    .map((note, index) => ({
      text: note,
      index,
    }))
    .filter((note) =>
      note.text.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>📝 LongArc Notes</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a note..."
        style={{
          width: "70%",
          padding: 10,
        }}
      />

      <button
        onClick={addNote}
        style={{
          marginLeft: 10,
          padding: 10,
        }}
      >
        Add
      </button>

      <input
        type="text"
        placeholder="🔍 Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />

      <NotesList
  notes={filteredNotes}
  onDelete={deleteNote}
  editingIndex={editingIndex}
  editText={editText}
  onStartEditing={startEditing}
  onEditTextChange={setEditText}
  onSaveEdit={saveEdit}
/>
    </div>
  );
}

export default App;