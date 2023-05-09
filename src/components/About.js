import React, { useEffect } from 'react';
import { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';

export default function About() {
  const a = useContext(noteContext);
  useEffect(()=>{
    a.update();
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <h2>This is About us page {a.state.name} who is studying in {a.state.class}</h2>
    </div>
  )
}
