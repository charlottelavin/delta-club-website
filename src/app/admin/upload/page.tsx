'use client';

import { useState, useRef } from 'react';

export default function AdminUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0];
    setFile(chosen ?? null);
    setStatus('idle');
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a CSV file.');
      setStatus('error');
      return;
    }
    setStatus('uploading');
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload-events', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      setMessage(`Uploaded ${data.uploaded} events successfully.`);
      setStatus('success');
      setFile(null);
      if (inputRef.current) inputRef.current.value = '';
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Upload failed');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Upload events CSV</h1>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          CSV file
        </label>
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv,application/csv"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 mb-4"
        />
        <button
          type="button"
          onClick={handleUpload}
          disabled={status === 'uploading'}
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'uploading' ? 'Uploading…' : 'Upload'}
        </button>
        {message && (
          <p
            className={`mt-4 text-sm ${
              status === 'error' ? 'text-red-600' : 'text-gray-700'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
