import React, { useContext, useEffect, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const {showAlert} = props;
  const context = useContext(noteContext);
  console.log(context.notes);
  const { notes, getAllNote, editNote } = context;
  let navigate = useNavigate()

  useEffect(() => {
    const authtoken = localStorage.getItem('token');
    if(authtoken ){

      getAllNote();
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id : "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const updateNote = (currentNote) => {
    console.log("clicked");
    ref.current.click();
    // to populate value on each field
    setNote({id : currentNote._id,etitle: currentNote.title, edescription : currentNote.description, etag : currentNote.tag});
   
  };
 
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Notes updated Successfully", "success");
    console.log("updating the note", note)
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnote showAlert={showAlert}/>
      <button ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog cardBoxStyle">
          <div className="modal-content cardBoxStyle">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form className="my-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title </label>
            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}
              minLength={5} required aria-describedby="emailHelp"
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
              id="edescription"
              name="edescription" value={note.edescription}
              minLength={5} required
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
              id="etag"
              name="etag"  value={note.etag} minLength={3} required
              onChange={onchange}
            />
          </div>

       
            </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  disabled = {note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
              Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
      <h2> Your Notes</h2>
        <div className="mx-2"> 
        {notes.length === 0 && "No notes available"}
        </div>
        {notes.length !== 0 && notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert}/>
          );
        })}
      </div>
    </>
  );
}
