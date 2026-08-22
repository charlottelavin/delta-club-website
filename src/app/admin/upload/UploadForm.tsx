'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function UploadForm() {
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    committee: '',
    hours: '',
    description: '',
    address: '',
    age: 'All Ages',
    url: '',
    imageUrl: '',
    featured: false,
  });

  const committees = [
    'Animals',
    'Children and Education',
    'Elderly',
    'Disabilities',
    'Environment and Climate Change',
    'Poverty and Food Insecurity',
    'Health and Wellness',
    'Homelessness',
  ];

  const initialForm = {
    name: '',
    committee: '',
    hours: '',
    description: '',
    address: '',
    age: 'All Ages',
    url: '',
    imageUrl: '',
    featured: false,
  };

  const updateField = (field: keyof typeof initialForm, value: string | boolean) => {
    setForm(current => ({ ...current, [field]: value }));
    setStatus('idle');
    setMessage('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('saving');
    setMessage('');

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/api/admin/events', { method: 'POST', body: formData });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'The event could not be saved.');

      setForm(initialForm);
      setStatus('success');
      setMessage('Event added successfully.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'The event could not be saved.');
    }
  };

  const inputClass = 'mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600';
  const labelClass = 'block text-sm font-semibold text-gray-800';

    return (
      <main className="min-h-screen bg-blue-100 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-800">Delta Club</Link>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Add a volunteer event</h1>
              <p className="mt-2 text-sm text-gray-700">Enter the details below. Required fields are marked with an asterisk.</p>
            </div>
            <Link href="/events" className="shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-800">View database</Link>
          </div>

          <form onSubmit={handleSubmit} className="rounded-xl bg-white p-5 shadow-xl sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className={labelClass}>Event name *</label>
                <input id="name" name="name" required value={form.name} onChange={event => updateField('name', event.target.value)} className={inputClass} />
              </div>

              <div>
                <label htmlFor="committee" className={labelClass}>Committee *</label>
                <select id="committee" name="committee" required value={form.committee} onChange={event => updateField('committee', event.target.value)} className={inputClass}>
                  <option value="">Choose a committee</option>
                  {committees.map(committee => <option key={committee} value={committee}>{committee}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="hours" className={labelClass}>Volunteer hours</label>
                <input id="hours" name="hours" value={form.hours} onChange={event => updateField('hours', event.target.value)} placeholder="Examples: 1:30, 2, 5.5, Hours Vary" className={inputClass} />
              </div>

              <div>
                <label htmlFor="address" className={labelClass}>Location *</label>
                <input id="address" name="address" required value={form.address} onChange={event => updateField('address', event.target.value)} placeholder="Organization or address" className={inputClass} />
              </div>

              <div>
                <label htmlFor="age" className={labelClass}>Age requirement *</label>
                <input id="age" name="age" required value={form.age} onChange={event => updateField('age', event.target.value)} placeholder="All Ages or 14+" className={inputClass} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className={labelClass}>Description *</label>
                <textarea id="description" name="description" required rows={5} value={form.description} onChange={event => updateField('description', event.target.value)} className={inputClass} />
              </div>

              <div>
                <label htmlFor="url" className={labelClass}>Sign-up link</label>
                <input id="url" name="url" type="url" value={form.url} onChange={event => updateField('url', event.target.value)} placeholder="https://..." className={inputClass} />
              </div>

              <div>
                <label htmlFor="imageUrl" className={labelClass}>Image link</label>
                <input id="imageUrl" name="imageUrl" type="url" value={form.imageUrl} onChange={event => updateField('imageUrl', event.target.value)} placeholder="https://..." className={inputClass} />
              </div>
            </div>

            <label className="mt-5 flex items-center gap-3 text-sm font-semibold text-gray-800">
              <input name="featured" type="checkbox" checked={form.featured} onChange={event => updateField('featured', event.target.checked)} className="h-4 w-4 shrink-0 accent-blue-600" />
              Show this event in the featured section
            </label>

            <button type="submit" disabled={status === 'saving'} className="mt-7 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
              {status === 'saving' ? 'Saving event...' : 'Add event'}
            </button>

            {message && <p role="status" className={`mt-4 text-sm ${status === 'error' ? 'text-red-600' : 'text-gray-700'}`}>{message}</p>}
          </form>

          <p className="mt-4 text-xs text-gray-600">CSV upload remains available through the existing upload API for bulk imports.</p>
        </div>
      </main>
    );
}
