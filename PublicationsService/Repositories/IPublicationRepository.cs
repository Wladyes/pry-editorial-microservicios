using PublicationsService.Models;
using PublicationsService.Enums;

namespace PublicationsService.Repositories
{
    public interface IPublicationRepository
    {
        Task<Publication> CreateAsync(Publication publication);
        Task<Publication?> GetByIdAsync(int id);
        Task<List<Publication>> GetAllAsync(int page = 1, int limit = 10);
        Task<Publication> UpdateAsync(Publication publication);
        Task DeleteAsync(int id);
        Task<List<Publication>> FindByStatusAsync(EditorialStatus status);
        Task<List<Publication>> FindByAuthorIdAsync(int authorId);
    }
}
