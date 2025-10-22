import { X } from 'lucide-react';
import React, { useState, type Dispatch, type SetStateAction } from 'react';

type Props = { onAdd: (e: { title: string; date: string; venue: string; availableSeats: number }) => void, closeModal: Dispatch<SetStateAction<boolean>> };

export default function AddEventForm({ onAdd, closeModal }: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [seats, setSeats] = useState<number | ''>('');
  const [submitting, setSubmitting] = useState(false);

  const valid = title.trim() && date && venue.trim() && seats !== '' && Number(seats) >= 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return alert('Please fill all fields correctly');
    setSubmitting(true);
    try {
      await onAdd({ title: title.trim(), date, venue: venue.trim(), availableSeats: Number(seats) });
      setTitle(''); setDate(''); setVenue(''); setSeats('');
    } finally {
      setSubmitting(false);
      closeModal(false)
     }
  }

  return (
    <form onSubmit={submit} className="bg-white flex flex-col px-8 py-5 rounded-xl gap-8 min-w-[400px]" >
      <div className="flex items-center justify-between">
        <h3 className='text-xl font-bold'>Add Event</h3>
        <X className='size-10 p-2 rounded-full cursor-pointer hover:bg-gray-100' onClick={() => closeModal(false)} />
      </div>
      <div style={{ marginBottom: 8 }} className='input-box'>
        <label htmlFor="title">Title:</label>
        <input placeholder="Title" id='title' value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: 8 }} />
      </div>
      <div style={{ marginBottom: 8 }} className='input-box'>
        <label htmlFor="date">Date and Time:</label>
        <input type="datetime-local" id='date' value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: 8 }} />
      </div>
      <div style={{ marginBottom: 8 }} className='input-box'>
        <label htmlFor="venue">Venue:</label>
        <input placeholder="Venue" id='venue' value={venue} onChange={e => setVenue(e.target.value)} style={{ width: '100%', padding: 8 }} />
      </div>
      <div style={{ marginBottom: 8 }} className='input-box'>
        <label htmlFor="seats">Available Seats:</label>
        <input type="number" min={0} placeholder="Available seats" id='seats' value={seats} onChange={e => setSeats(e.target.value === '' ? '' : Number(e.target.value))} style={{ width: '100%', padding: 8 }} />
      </div>

      <button disabled={!valid || submitting} type="submit" className='w-full bg-blue-500 py-4 rounded-3xl font-semibold text-white text-2xl cursor-pointer ring-offset-2 ring-blue-400 hover:ring-4'>{submitting ? 'Adding...' : 'Add Event'}</button>

    </form>
  );
}
