import React, { useState } from "react"; 
import NoteContext from "./NoteContext";

export default function NoteState(props) {
  const host="https://inotebook-backend-gray.vercel.app/"

   const [notes, setNotes] = useState([]);
const getNotes = async () => {
  const response = await fetch(`${host}api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      'auth-token': localStorage.getItem('authToken'),
      'Content-Type': 'application/json'
    }
  });
  const allNotes = await response.json(); 
  console.log(allNotes);
  setNotes(allNotes)
};

async function addNote(title1, description1, tag1) {
 const response = await fetch(`${host}api/notes/createNote`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'auth-token': localStorage.getItem('authToken')
  },
  body: JSON.stringify({
    title: title1,
    description: description1,
    tag: tag1
  })
});

const json = await response.json(); 
console.log("Server response:", json);

if (!response.ok) {
  throw new Error("Server error: " + (json?.error || response.status));
}

// Update UI
setNotes(notes.concat(json));
}
const deleteNote = async (id) => {
  const response = await fetch(`${host}api/notes/deleteNote/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('authToken')
    }
  });

  const text = await response.text();
  console.log(text)
  setNotes(notes.filter((note)=>{return note._id!==id}))
};

async function editNote(id, title, description, tag) {
  const response = await fetch(`${host}api/notes/updatenote/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('authToken')
    },
    body: JSON.stringify({ title, description, tag })
  });

  const updatedNote = await response.json();

  const newNotes = notes.map(note => {
    if (note._id === id) {
      return updatedNote; 
    }
    return note;
  });

  setNotes(newNotes);
}

  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,getNotes,editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
}