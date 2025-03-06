import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdDelete, MdEdit, MdPushPin } from 'react-icons/md';

const NoteForm = ({ onSubmit, onClose, editData }) => {
  const [formData, setFormData] = useState(editData || {
    title: '',
    content: '',
    color: '#ffffff',
    isPinned: false
  });

  const colors = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
    '#d7aefb', '#fdcfe8', '#e6c9a8'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            placeholder="Title"
          />
          
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full h-40 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 resize-none"
            placeholder="Take a note..."
          />

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-6 h-6 rounded-full border ${
                    formData.color === color ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isPinned: !formData.isPinned })}
              className={`p-2 rounded-full ${
                formData.isPinned 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <MdPushPin />
            </button>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-teal-600"
            >
              {editData ? 'Update' : 'Add'} Note
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

const NoteCard = ({ note, onEdit, onDelete, onPin }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-xl shadow-lg overflow-hidden"
      style={{ backgroundColor: note.color }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{note.title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onPin(note.id)}
              className={`p-2 rounded-full ${
                note.isPinned 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <MdPushPin />
            </button>
            <button
              onClick={() => onEdit(note)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <MdEdit />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <MdDelete />
            </button>
          </div>
        </div>
        <p className="mt-2 whitespace-pre-wrap">{note.content}</p>
      </div>
    </motion.div>
  );
};

const Notes = () => {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const handleSubmit = (formData) => {
    if (editingNote) {
      setNotes(notes.map(n => 
        n.id === editingNote.id ? { ...formData, id: n.id } : n
      ));
      setEditingNote(null);
    } else {
      setNotes([...notes, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handlePin = (id) => {
    setNotes(notes.map(n => 
      n.id === id ? { ...n, isPinned: !n.isPinned } : n
    ));
  };

  const pinnedNotes = notes.filter(n => n.isPinned);
  const unpinnedNotes = notes.filter(n => !n.isPinned);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Notes</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
        >
          <MdAdd className="text-xl" />
          <span>Add Note</span>
        </button>
      </div>

      {showForm && (
        <NoteForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingNote(null);
          }}
          editData={editingNote}
        />
      )}

      {pinnedNotes.length > 0 && (
        <>
          <h2 className="text-lg font-semibold dark:text-white">Pinned</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pinnedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPin={handlePin}
              />
            ))}
          </div>
        </>
      )}

      {unpinnedNotes.length > 0 && (
        <>
          <h2 className="text-lg font-semibold dark:text-white">Others</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unpinnedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPin={handlePin}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Notes;