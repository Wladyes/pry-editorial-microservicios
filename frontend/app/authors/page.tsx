'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { authorsApi, Author } from '@/lib/api/authors';
import AuthorCard from '@/components/AuthorCard';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await authorsApi.getAll();
        console.log('Authors data received:', data); // Debug
        setAuthors(data);
      } catch (err: any) {
        console.error('Error fetching authors:', err);
        setError(err.message || 'Error al cargar autores');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-600">Cargando autores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm underline"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Autores</h1>
        <Link 
          href="/authors/new"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Crear Autor
        </Link>
      </div>

      {authors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No hay autores registrados.</p>
          <Link 
            href="/authors/new"
            className="text-blue-600 hover:underline"
          >
            Crear el primer autor →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map(author => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      )}
    </div>
  );
}
