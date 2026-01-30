import Link from 'next/link';

//pagina principal del sistema editorial
export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Sistema Editorial
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/authors">
          <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Autores</h2>
            <p className="text-gray-700">
              Gestiona los autores del sistema
            </p>
          </div>
        </Link>

        <Link href="/publications">
          <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Publicaciones</h2>
            <p className="text-gray-700">
              Gestiona las publicaciones
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
