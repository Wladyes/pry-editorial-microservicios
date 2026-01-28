'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { publicationsApi } from '@/lib/api/publications';
import StatusBadge from '@/components/StatusBadge';

const EDITORIAL_STATES = ['DRAFT', 'INREVIEW', 'APPROVED', 'PUBLISHED', 'REJECTED'] as const;

export default function PublicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [publication, setPublication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Requisito: consultar detalle con datos del autor
        const data = await publicationsApi.getByIdWithAuthor(Number(params.id));
        setPublication(data);
        setSelectedStatus(data.status);
      } catch (err: any) {
        console.error('Error loading publication:', err);
        setError('Error al cargar la publicación');
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [params.id]);

  // Requisito: cambiar estado editorial (PATCH)
  const handleChangeStatus = async () => {
    if (!publication || selectedStatus === publication.status) {
      return;
    }

    setUpdating(true);
    setError('');

    try {
      const updated = await publicationsApi.changeStatus(
        publication.id,
        { status: selectedStatus as any }
      );
      
      setPublication({
        ...publication,
        status: updated.status,
        updatedAt: updated.updatedAt
      });
      
      alert('Estado actualizado exitosamente');
    } catch (err: any) {
      console.error('Error changing status:', err);
      const errorMsg = err.response?.data?.message || 
                       err.response?.data?.Message ||
                       'Error al cambiar el estado';
      setError(errorMsg);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-gray-600">Cargando publicación...</p>
      </div>
    );
  }

  if (error && !publication) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => router.push('/publications')}
          className="mt-4 text-blue-600 hover:underline"
        >
          Volver a publicaciones
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <button
        onClick={() => router.push('/publications')}
        className="text-blue-600 hover:underline mb-4"
      >
        Volver a publicaciones
      </button>

      <div className="bg-white shadow-lg rounded-lg p-8">
        {/* Header con título y estado */}
        <div className="flex justify-between items-start mb-6 pb-4 border-b">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {publication.title}
            </h1>
            <p className="text-gray-500 text-sm">
              ID de Publicación: {publication.id}
            </p>
          </div>
          <StatusBadge status={publication.status} />
        </div>

        {/* Requisito: mostrar datos del autor */}
        {publication.author && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Información del Autor</h3>
            <div className="space-y-1">
              <p className="text-lg font-medium">
                {publication.author.firstName} {publication.author.lastName}
              </p>
              <p className="text-gray-600">
                Correo: {publication.author.email}
              </p>
              {publication.author.nationality && (
                <p className="text-gray-600">
                  Nacionalidad: {publication.author.nationality}
                </p>
              )}
              {publication.author.biography && (
                <p className="text-gray-700 mt-2 text-sm">
                  {publication.author.biography}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Contenido de la publicación */}
        {publication.content && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Contenido</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-gray-800 whitespace-pre-wrap">
              {publication.content}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">Metadatos</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Creado:</span>
              <p className="font-medium">
                {new Date(publication.createdAt).toLocaleString('es-ES')}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Actualizado:</span>
              <p className="font-medium">
                {new Date(publication.updatedAt).toLocaleString('es-ES')}
              </p>
            </div>
          </div>
        </div>

        {/* Requisito: cambiar estado editorial */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-700 mb-3">Cambiar Estado Editorial</h3>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-3 items-center mb-4">
            <select
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
            >
              {EDITORIAL_STATES.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleChangeStatus}
              disabled={updating || selectedStatus === publication.status}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {updating ? 'Actualizando...' : 'Actualizar Estado'}
            </button>
          </div>

          <p className="text-gray-500 text-sm">
            Estado actual: <strong>{publication.status}</strong>
            {selectedStatus !== publication.status && (
              <span className="text-blue-600"> → Cambiar a: <strong>{selectedStatus}</strong></span>
            )}
          </p>

          {/* Flujo editorial */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 font-medium mb-2">Flujo Editorial:</p>
            <p className="text-xs text-gray-600">
              DRAFT → INREVIEW → APPROVED → PUBLISHED
              <br />
              └→ REJECTED (en cualquier etapa)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
