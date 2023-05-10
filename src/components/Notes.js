import React, { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';


export default function Notes() {
    const context = useContext(noteContext);
    console.log(context)
    const {notes, addNote} = context;
  return (
    <> 
    <Addnote/>
    <div className='row'>
      {notes.map((note)=>{
        return <Noteitem key={note._id} note = {note}/>;
      })}
    </div>
    </>
  )
}
