'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { authorsApi, Author } from '@/lib/api/authors';

//paguina de detalle del autor
export default function AuthorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
   
  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const data = await authorsApi.getById(Number(params.id));
        setAuthor(data);
      } catch (err: any) {
        console.error('Error fetching author:', err);
        setError('Error al cargar el autor');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [params.id]);

  const handleDelete = async () => {
    if (!author) return;
    
    const confirmDelete = window.confirm(
      `¿Está seguro de eliminar a ${author.firstName} ${author.lastName}?\n\nEsta acción no se puede deshacer.`
    );
    
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await authorsApi.delete(author.id);
      alert('Autor eliminado exitosamente');
      router.push('/authors');
    } catch (err: any) {
      console.error('Error deleting author:', err);
      alert(`Error al eliminar: ${err.response?.data?.message || err.message}`);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-gray-600">Cargando autor...</p>
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Autor no encontrado'}
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
    <div className="container mx-auto p-8 max-w-3xl">
      <button
        onClick={() => router.push('/authors')}
        className="text-blue-600 hover:underline mb-4"
      >
        Volver a autores
      </button>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {author.firstName} {author.lastName}
          </h1>
          
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/authors/${author.id}/edit`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:bg-gray-400"
            >
              {deleting ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-gray-600 font-medium">Correo electrónico:</span>
            <p className="text-gray-800">{author.email}</p>
          </div>

          {author.nationality && (
            <div>
              <span className="text-gray-600 font-medium">Nacionalidad:</span>
              <p className="text-gray-800">{author.nationality}</p>
            </div>
          )}

          {author.birthDate && (
            <div>
              <span className="text-gray-600 font-medium">Fecha de nacimiento:</span>
              <p className="text-gray-800">
                {new Date(author.birthDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}

          {author.biography && (
            <div>
              <span className="text-gray-600 font-medium">Biografía:</span>
              <p className="text-gray-800 mt-2 leading-relaxed">{author.biography}</p>
            </div>
          )}

          {author.createdAt && (
            <div className="pt-4 border-t">
              <span className="text-gray-500 text-sm">
                Registrado: {new Date(author.createdAt).toLocaleDateString('es-ES')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
