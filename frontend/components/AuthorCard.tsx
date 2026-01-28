import Link from 'next/link';

interface AuthorCardProps {
  author: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    biography?: string;
    nationality?: string;
  };
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link href={`/authors/${author.id}`}>
      <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {author.firstName} {author.lastName}
        </h3>
        <p className="text-gray-600 text-sm mb-2">{author.email}</p>
        {author.nationality && (
          <p className="text-gray-500 text-sm">
            <span className="font-medium">Nationality:</span> {author.nationality}
          </p>
        )}
        {author.biography && (
          <p className="text-gray-700 text-sm mt-3 line-clamp-2">
            {author.biography}
          </p>
        )}
      </div>
    </Link>
  );
}
