'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { publicationsApi } from '@/lib/api/publications';
import PublicationCard from '@/components/PublicationCard';

//paguina de lista de publicaciones
export default function PublicationsPage() {
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await publicationsApi.getAll();
        console.log('Publications data received:', data);
        setPublications(data);
      } catch (err: any) {
        console.error('Error fetching publications:', err);
        setError(err.message || 'Error al cargar publicaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-600">Cargando publicaciones...</p>
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
          <p className="text-sm mt-2">
            Verifica que Publications Service esté corriendo en http://localhost:8080
          </p>
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
        <h1 className="text-3xl font-bold text-gray-900">Publicaciones</h1>
        <Link 
          href="/publications/new"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Crear Publicación
        </Link>
      </div>

      {publications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No hay publicaciones registradas.</p>
          <Link 
            href="/publications/new"
            className="text-blue-600 hover:underline"
          >
            Crear la primera publicación
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map(publication => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>
      )}
    </div>
  );
}
