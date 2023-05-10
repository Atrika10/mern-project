import React from 'react'

export default function Noteitem(props) {
    const {note} = props;
  return (
    <div className="col-md-3">
      {/* {note.title + " "}
      {note.tag + " "}
      {note.description}; */}
      <div className="card border-success mb-3" style={{"maxwidth": "18rem"}}>
        <div className="d-flex align-items-center"> 
            <div className="card-header bg-transparent border-success">{note.title}</div>
            <div className="icons"> 
            <ion-icon name="create"></ion-icon>
            <ion-icon name="trash"></ion-icon>
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
