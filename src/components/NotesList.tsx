type NoteItem = {
  text: string;
  index: number;
};

type NotesListProps = {
  notes: NoteItem[];
  onDelete: (index: number) => void;
};

function NotesList({ notes, onDelete }: NotesListProps) {
  return (
    <ul style={{ marginTop: 20 }}>
      {notes.map((note) => (
        <li
          key={note.index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            border: "1px solid #ddd",
            marginBottom: "8px",
            borderRadius: "6px",
          }}
        >
          {note.text}

          <button onClick={() => onDelete(note.index)}>
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NotesList;