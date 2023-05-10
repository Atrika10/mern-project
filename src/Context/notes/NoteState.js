import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial = 
        [
            {
              "_id": "64590b28512bec4a349052b6",
              "user": "64565979bc890ac012e954c2",
              "title": "my first note",
              "description": "note's description",
              "tag": "personal",
              "date": "2023-05-08T14:46:00.842Z",
              "__v": 0
            },
            {
              "_id": "64590b8e512bec4a349052ba",
              "user": "64565979bc890ac012e954c2",
              "title": "my first note",
              "description": "note's description",
              "tag": "personal",
              "date": "2023-05-08T14:47:42.210Z",
              "__v": 0
            },
            {
              "_id": "64590b8e512bec4a349052ba",
              "user": "64565979bc890ac012e954c2",
              "title": "my sec note",
              "description": "note's description",
              "tag": "study happy",
              "date": "2023-05-08T14:47:42.210Z",
              "__v": 0
            },
            {
              "_id": "64590b8e512bec4a349052ba",
              "user": "64565979bc890ac012e954c2",
              "title": "my travel note",
              "description": "note's description",
              "tag": "travel happy",
              "date": "2023-05-08T14:47:42.210Z",
              "__v": 0
            },
            {
              "_id": "64590b8e512bec4a349052ba",
              "user": "64565979bc890ac012e954c2",
              "title": "hello travel note",
              "description": "note's description",
              "tag": "travel happy",
              "date": "2023-05-08T14:47:42.210Z",
              "__v": 0
            }
        ]
        const [notes, setNotes]= useState(notesInitial);
    
    
    return(
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;