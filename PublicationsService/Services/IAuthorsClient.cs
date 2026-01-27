using PublicationsService.DTOs;

namespace PublicationsService.Services
{
    public interface IAuthorsClient
    {
        Task<AuthorDto?> GetAuthorAsync(int authorId);
    }
}
