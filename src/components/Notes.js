import React, { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';
import Noteitem from './Noteitem';


export default function Notes() {
    const context = useContext(noteContext);
    console.log(context)
    const {notes, setNotes } = context;
  return (
    <div className='row'>
      {notes.map((note)=>{
        return <Noteitem note = {note}/>;
      })}
    </div>
  )
}
