'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { authorsApi, Author, UpdateAuthorDto } from '@/lib/api/authors';

export default function EditAuthorPage() {
  const params = useParams();
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<UpdateAuthorDto>({
    firstName: '',
    lastName: '',
    email: '',
    biography: '',
    nationality: '',
  });

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const data = await authorsApi.getById(Number(params.id));
        setAuthor(data);
        
        setForm({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          biography: data.biography || '',
          nationality: data.nationality || '',
        });
      } catch (err: any) {
        console.error('Error fetching author:', err);
        setError('Error al cargar el autor');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author) return;

    setSaving(true);
    setError('');

    try {
      await authorsApi.update(author.id, form);
      alert('Autor actualizado exitosamente');
      router.push(`/authors/${author.id}`);
    } catch (err: any) {
      console.error('Error updating author:', err);
      setError(err.response?.data?.message || 'Error al actualizar el autor');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-gray-600">Cargando autor...</p>
      </div>
    );
  }

  if (error && !author) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => router.push('/authors')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Volver a autores
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <button
        onClick={() => router.push(`/authors/${author?.id}`)}
        className="text-blue-600 hover:underline mb-4"
      >
        Volver al detalle
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Editar Autor
      </h1>

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
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/authors/${author?.id}`)}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
