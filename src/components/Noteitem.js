import React, { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';

export default function Noteitem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote, showAlert} = props;
  return (
    <div className="col-md-3">
      {/* {note.title + " "}
      {note.tag + " "}
      {note.description}; */}
      <div className="card cardBoxStyle border-primary mb-3" >
        <div className="d-flex align-items-center"> 
            <div className=" fontColor fontBold card-header bg-transparent border-primary">{note.title}</div>
            <div className="fontColor icons"> 
            <ion-icon name="create" onClick= {()=>{updateNote(note)}}></ion-icon>
            <ion-icon  name="trash" onClick={()=>{deleteNote(note._id);showAlert("Notes deleted succesfully", "success");}}></ion-icon>
            
            </div> 
        </div>
        <div className="card-body text-success">
            <h5 className="card-title"></h5>
             {/* eslint-disable-next-line */}
            <p className=" fontColor card-text">{note.description} </p>
        </div>
        <div className="fontColor card-footer bg-transparent border-primary">{note.tag}</div>
        </div>
    </div>
  )
}
