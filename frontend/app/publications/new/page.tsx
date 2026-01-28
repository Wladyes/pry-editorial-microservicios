'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { publicationsApi } from '@/lib/api/publications';
import { authorsApi } from '@/lib/api/authors';

export default function NewPublicationPage() {
  const router = useRouter();
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [error, setError] = useState('');
  
  const [form, setForm] = useState({
    title: '',
    authorId: 0,
    content: '',
  });

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoadingAuthors(true);
        const data = await authorsApi.getAll();
        setAuthors(data);
      } catch (err: any) {
        console.error('Error loading authors:', err);
        setError('Error al cargar autores');
      } finally {
        setLoadingAuthors(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.authorId === 0) {
      setError('Por favor seleccione un autor');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await publicationsApi.create(form);
      alert('Publicación creada exitosamente');
      router.push('/publications');
    } catch (err: any) {
      console.error('Error creating publication:', err);
      const errorMsg = err.message || 
                       err.response?.data?.message || 
                       err.response?.data?.Message ||
                       'Error al crear la publicación';
      setError(errorMsg);
      setLoading(false);
    }
  };

  if (loadingAuthors) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-gray-600">Cargando autores...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <button
        onClick={() => router.push('/publications')}
        className="text-blue-600 hover:underline mb-4"
      >
        Volver a publicaciones
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Crear Nueva Publicación</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {authors.length === 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Sin autores disponibles</p>
          <p>Debe crear al menos un autor antes de crear una publicación.</p>
          <button
            onClick={() => router.push('/authors/new')}
            className="mt-2 text-blue-600 hover:underline"
          >
            Crear autor ahora
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
            placeholder="Ingrese el título de la publicación"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Autor <span className="text-red-500">*</span>
          </label>
          <select
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.authorId}
            onChange={e => setForm({...form, authorId: Number(e.target.value)})}
          >
            <option value={0}>Seleccione un autor</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.firstName} {author.lastName} ({author.email})
              </option>
            ))}
          </select>
          <p className="text-gray-500 text-sm mt-1">
            El sistema validará que el autor existe antes de crear la publicación
          </p>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Contenido <span className="text-gray-500 text-sm">(opcional)</span>
          </label>
          <textarea
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.content}
            onChange={e => setForm({...form, content: e.target.value})}
            placeholder="Contenido de la publicación..."
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Nota:</span> La publicación se creará con estado 
            <span className="font-semibold"> DRAFT</span> por defecto.
          </p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading || authors.length === 0}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Creando...' : 'Crear Publicación'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/publications')}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
