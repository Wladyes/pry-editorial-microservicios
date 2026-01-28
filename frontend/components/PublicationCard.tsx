import Link from 'next/link';
import StatusBadge from './StatusBadge';

interface PublicationCardProps {
  publication: {
    id: number;
    title: string;
    authorId: number;
    content?: string;
    status: 'DRAFT' | 'INREVIEW' | 'APPROVED' | 'PUBLISHED' | 'REJECTED';
    createdAt: string;
    updatedAt: string;
  };
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <Link href={`/publications/${publication.id}`}>
      <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 flex-1">
            {publication.title}
          </h3>
          <StatusBadge status={publication.status} />
        </div>
        
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-medium">ID Autor:</span> {publication.authorId}
        </p>
        
        {publication.content && (
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
            {publication.content}
          </p>
        )}
        
        <p className="text-gray-400 text-xs">
          Creado: {new Date(publication.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
      </div>
    </Link>
  );
}
