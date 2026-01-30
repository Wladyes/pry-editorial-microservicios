import Link from 'next/link';

// Componente de navegación con enlaces a las secciones principales
export default function Navigation() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex gap-6 items-center">
        <Link href="/" className="text-xl font-bold hover:text-gray-200">
          Sistema Editorial
        </Link>
        <Link href="/authors" className="hover:text-gray-200">
          Autores
        </Link>
        <Link href="/publications" className="hover:text-gray-200">
          Publicaciones
        </Link>
      </div>
    </nav>
  );
}
