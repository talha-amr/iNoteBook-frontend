import React, { useState } from "react";
import NoteContext from "./NoteContext";
import LoadingBar from "react-top-loading-bar";

export default function NoteState(props) {
  const host = "https://inotebook-backend-gray.vercel.app/";

  const [notes, setNotes] = useState([]);
  const [progress, setProgress] = useState(0); // For LoadingBar

  const getNotes = async () => {
    try {
      setProgress(30);
      const response = await fetch(`${host}api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'auth-token': localStorage.getItem('authToken'),
          'Content-Type': 'application/json'
        }
      });
      setProgress(70);
      const allNotes = await response.json();
      setNotes(allNotes);
      setProgress(100);
    } catch (error) {
      console.error(error);
      setProgress(100);
    }
  };

  async function addNote(title1, description1, tag1) {
    try {
      setProgress(30);
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
      setProgress(70);
      const json = await response.json();

      if (!response.ok) {
        throw new Error("Server error: " + (json?.error || response.status));
      }

      setNotes(notes.concat(json));
      setProgress(100);
    } catch (error) {
      console.error(error);
      setProgress(100);
    }
  }

  const deleteNote = async (id) => {
    try {
      setProgress(30);
      const response = await fetch(`${host}api/notes/deleteNote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken')
        }
      });
      setProgress(70);
      await response.text();
      setNotes(notes.filter((note) => note._id !== id));
      setProgress(100);
    } catch (error) {
      console.error(error);
      setProgress(100);
    }
  };

  async function editNote(id, title, description, tag) {
    try {
      setProgress(30);
      const response = await fetch(`${host}api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken')
        },
        body: JSON.stringify({ title, description, tag })
      });
      setProgress(70);
      const updatedNote = await response.json();

      const newNotes = notes.map(note =>
        note._id === id ? updatedNote : note
      );

      setNotes(newNotes);
      setProgress(100);
    } catch (error) {
      console.error(error);
      setProgress(100);
    }
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        getNotes,
        editNote
      }}
    >
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {props.children}
    </NoteContext.Provider>
  );
}
