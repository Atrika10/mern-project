import React, { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';

export default function Noteitem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;
  return (
    <div className="col-md-3">
      {/* {note.title + " "}
      {note.tag + " "}
      {note.description}; */}
      <div className="card border-success mb-3" style={{"maxwidth": "20rem"}}>
        <div className="d-flex align-items-center"> 
            <div className="card-header bg-transparent border-success">{note.title}</div>
            <div className="icons"> 
            <ion-icon name="create" onClick= {()=>{updateNote(note)}}></ion-icon>
            <ion-icon name="trash" onClick={()=>{deleteNote(note._id)}}></ion-icon>
            </div>
        </div>
        <div className="card-body text-success">
            <h5 className="card-title"></h5>
            <p className="card-text">{note.description} </p>
        </div>
        <div className="card-footer bg-transparent border-success">{note.tag}</div>
        </div>
    </div>
  )
}
