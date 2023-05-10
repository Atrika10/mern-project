import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = 
        [
            {
              "_id": "64590b285162bec4a349052b6",
              "user": "64565979bc890ac012e954c2",
              "title": "my first note",
              "description": "note's description",
              "tag": "personal",
              "date": "2023-05-08T14:46:00.842Z",
              "__v": 0
            },
            {
              "_id": "645970b8e512bec4a349052ba",
              "user": "64565979bc890ac012e954c2",
              "title": "my first note",
              "description": "note's description",
              "tag": "personal",
              "date": "2023-05-08T14:47:42.210Z",
              "__v": 0
            },
            {
              "_id": "64590b8e512bec4a35429052ba",
              "user": "64565979bc890ac012e954c2",
              "title": "my sec note",
              "description": "note's description",
              "tag": "study happy",
              "date": "2023-05-08T14:47:42.210Z",
              "__v": 0
            },
            {
              "_id": "64590b88e512bec4a349052ba",
              "user": "64565979bc890ac012e954c2",
              "title": "my travel note",
              "description": "note's description",
              "tag": "travel happy",
              "date": "2023-05-08T14:47:42.210Z",
              "__v": 0
            },
            {
              "_id": "64590b82e512bec4a349052ba",
              "user": "64565979bc890ac012e954c2",
              "title": "hello travel note",
              "description": "note's description",
              "tag": "travel happy",
              "date": "2023-05-08T14:47:42.210Z",
              "__v": 0
            }
        ]
        const [notes, setNotes]= useState(notesInitial);

        // To Add A note
        const addNote =(title, description, tag)=>{
            // TODO : API call
            console.log("adding a new note")
            const note = {
                "_id": "64590b8h2e512bec4a349052ba",
                "user": "64565979bc890ac012e954c2",
                "title": title,
                "description": description,
                "tag": tag,
                "date": "2023-05-08T14:47:42.210Z",
                "__v": 0
              }
            setNotes(notes.concat(note));

        }

        // To delete a note
        const deleteNote = ()=>{

        }

        // To Edit a note
        const editNote = ()=>{

        }
    
    
    return(
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;