import React, { useContext, useState } from 'react';
import noteContext from '../Context/notes/noteContext';

export default function Addnote() {
    const context = useContext(noteContext);
    const {addNote} = context;

    const[note, setNote] = useState({title: "", description : "", tag : "default"})
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
    }
    const onchange = (e)=>{
        setNote({...note,[e.target.name] : e.target.value})

    }
  return (
    <div>
        <div className="container my-4"> 
      <h2>Add a note</h2>
          <form className='my-4'>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label" >Description</label>
        <input type="text" className="form-control" id="description" name='description' onChange={onchange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label" >Tag</label>
        <input type="text" className="form-control" id="tag" name='tag' onChange={onchange}/>
      </div>
     
      <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
          </form>
      <h2> Your note</h2>
      </div>
      
    </div>
  )
}
