import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{

  const host = "http://localhost:5000"
    const notesInitial =[];
        const [notes, setNotes]= useState(notesInitial);

        // To Add A note
        const getAllNote = async ()=>{
            // TODO : API call
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1NjU5NzliYzg5MGFjMDEyZTk1NGMyIn0sImlhdCI6MTY4MzUyNzE4Nn0.XpfYJIFtcfeulWfc6T3NUckSce6Bb-UabasBGt5lf70"
              }
            });
            const json = await response.json();
            console.log(json);
            
           setNotes(json);

        }
        // To Add A note
        const addNote = async (title, description, tag)=>{
            // TODO : API call
            const response = await fetch(`${host}/api/notes/addnote`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1NjU5NzliYzg5MGFjMDEyZTk1NGMyIn0sImlhdCI6MTY4MzUyNzE4Nn0.XpfYJIFtcfeulWfc6T3NUckSce6Bb-UabasBGt5lf70"
              },
              body: JSON.stringify({title, description,tag}),
            });
            const note = await response.json();
            setNotes(notes.concat(note));
           

        }

        // To delete a note
        const deleteNote = async ( id)=>{
            // TODO : API call
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1NjU5NzliYzg5MGFjMDEyZTk1NGMyIn0sImlhdCI6MTY4MzUyNzE4Nn0.XpfYJIFtcfeulWfc6T3NUckSce6Bb-UabasBGt5lf70"
              },
            });
            const json = await response.json();
            console.log(json);
            console.log("deleteing note with id"+ id);
            const newNote = notes.filter((note)=>{return note._id !== id});
            setNotes(newNote);

        }

        // To Edit a note
        const editNote = async (id, title, description, tag)=>{
            // API call

            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1NjU5NzliYzg5MGFjMDEyZTk1NGMyIn0sImlhdCI6MTY4MzUyNzE4Nn0.XpfYJIFtcfeulWfc6T3NUckSce6Bb-UabasBGt5lf70"
              },
              body: JSON.stringify({title, description,tag}),
            });
            //const json =  response.json(); 
          

            let newNotes = JSON.parse(JSON.stringify(notes));
            // logic to edit in client
            for (let i = 0; i < newNotes.length; i++) {
                const element = notes[i];
                if(element._id === id){
                  newNotes[i].title = title;
                  newNotes[i].description = description;
                  newNotes[i].tag = tag;
                    break;
                }
            }
            setNotes(newNotes);
        }
    
    
    return(
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getAllNote}}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;