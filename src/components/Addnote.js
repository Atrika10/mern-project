import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/noteContext";

export default function Addnote(props) {
  const {showAlert} =props;
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    showAlert("Notes Added Succesfully", "success");
    setNote({title:"", description: "", tag : ""});
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-4">
        <h2>Add a note</h2>
        <form className="my-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title </label>
            <input type="text" className="form-control" id="title" name="title"
              aria-describedby="emailHelp" minLength={5} required value={note.title}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              minLength={5} required value={note.description}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag" minLength={3} required value={note.tag}
              onChange={onchange}
            />
          </div>

          <button
            type="submit"
            disabled = {note.title.length<5 || note.description.length<5}
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
