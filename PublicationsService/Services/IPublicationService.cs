using PublicationsService.Models;
using PublicationsService.Enums;

namespace PublicationsService.Services
{
    public interface IPublicationService
    {
        Task<Publication> CreatePublicationAsync(string title, int authorId, string? content);
        Task<Publication?> GetPublicationByIdAsync(int id);
        Task<List<Publication>> GetAllPublicationsAsync(int page = 1, int limit = 10);
        Task<Publication> ChangeStatusAsync(int id, EditorialStatus newStatus);
    }
}
