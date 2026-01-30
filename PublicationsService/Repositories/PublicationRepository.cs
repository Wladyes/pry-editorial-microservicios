using Microsoft.EntityFrameworkCore;
using PublicationsService.Data;
using PublicationsService.Models;
using PublicationsService.Enums;

//Repositorio para manejar las operaciones CRUD de las publicaciones
namespace PublicationsService.Repositories
{
    public class PublicationRepository : IPublicationRepository
    {
        private readonly ApplicationDbContext _context;

        public PublicationRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        //Crear una nueva publicacion
        public async Task<Publication> CreateAsync(Publication publication)
        {
            _context.Publications.Add(publication);
            await _context.SaveChangesAsync();
            return publication;
        }
        //Obtener una publicacion por su ID
        public async Task<Publication?> GetByIdAsync(int id)
        {
            return await _context.Publications.FindAsync(id);
        }
        //Obtener todas las publicaciones con paginacion
        public async Task<List<Publication>> GetAllAsync(int page = 1, int limit = 10)
        {
            return await _context.Publications
                .OrderByDescending(p => p.CreatedAt)
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();
        }
        //Actualizar una publicacion existente
        public async Task<Publication> UpdateAsync(Publication publication)
        {
            publication.UpdatedAt = DateTime.UtcNow;
            _context.Publications.Update(publication);
            await _context.SaveChangesAsync();
            return publication;
        }
        //Eliminar una publicacion por su ID
        public async Task DeleteAsync(int id)
        {
            var publication = await GetByIdAsync(id);
            if (publication != null)
            {
                _context.Publications.Remove(publication);
                await _context.SaveChangesAsync();
            }
        }
        //Buscar publicaciones por estado editorial
        public async Task<List<Publication>> FindByStatusAsync(EditorialStatus status)
        {
            return await _context.Publications
                .Where(p => p.Status == status)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }
        //Buscar publicaciones por ID de autor
        public async Task<List<Publication>> FindByAuthorIdAsync(int authorId)
        {
            return await _context.Publications
                .Where(p => p.AuthorId == authorId)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }
    }
}
