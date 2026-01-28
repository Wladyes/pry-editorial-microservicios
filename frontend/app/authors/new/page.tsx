'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authorsApi } from '@/lib/api/authors';

export default function NewAuthorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    biography: '',
    nationality: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authorsApi.create(form);
      router.push('/authors');
    } catch (err: any) {
      console.error('Error creando autor:', err);
      setError(err.response?.data?.message || 'Error al crear el autor');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Crear Nuevo Autor</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.firstName}
            onChange={e => setForm({...form, firstName: e.target.value})}
            placeholder="Ingrese el nombre"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Apellido <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.lastName}
            onChange={e => setForm({...form, lastName: e.target.value})}
            placeholder="Ingrese el apellido"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            placeholder="autor@ejemplo.com"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Biografía <span className="text-gray-500 text-sm">(opcional)</span>
          </label>
          <textarea
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.biography}
            onChange={e => setForm({...form, biography: e.target.value})}
            placeholder="Breve biografía del autor..."
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Nacionalidad <span className="text-gray-500 text-sm">(opcional)</span>
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.nationality}
            onChange={e => setForm({...form, nationality: e.target.value})}
            placeholder="ej: Colombiana, Ecuatoriana"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Creando...' : 'Crear Autor'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/authors')}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
