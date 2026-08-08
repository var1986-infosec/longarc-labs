type NoteItem = {
  text: string;
  index: number;
};

type NotesListProps = {
  notes: NoteItem[];
  onDelete: (index: number) => void;
  editingIndex: number | null;
  editText: string;
  onStartEditing: (index: number) => void;
  onEditTextChange: (text: string) => void;
  onSaveEdit: () => void;
};

function NotesList({
  notes,
  onDelete,
  editingIndex,
  editText,
  onStartEditing,
  onEditTextChange,
  onSaveEdit,
}: NotesListProps) {
  return (
    <ul style={{ marginTop: 20 }}>
      {notes.map((note) => (
        <li
          key={note.index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            border: "1px solid #ddd",
            marginBottom: "8px",
            borderRadius: "6px",
          }}
        >
          {editingIndex === note.index ? (
            <>
              <input
                value={editText}
                onChange={(e) => onEditTextChange(e.target.value)}
                style={{
                  flex: 1,
                  padding: "8px",
                  marginRight: "10px",
                }}
              />

              <button onClick={onSaveEdit}>
                Save
              </button>
            </>
          ) : (
            <>
              <span>{note.text}</span>

              <div>
                <button
                  onClick={() => onStartEditing(note.index)}
                  style={{ marginRight: "5px" }}
                >
                  ✏️
                </button>

                <button onClick={() => onDelete(note.index)}>
                  ❌
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default NotesList;