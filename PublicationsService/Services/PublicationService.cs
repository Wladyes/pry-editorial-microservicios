using PublicationsService.Models;
using PublicationsService.Repositories;
using PublicationsService.Enums;

namespace PublicationsService.Services
{
    public class PublicationService : IPublicationService
    {
        private readonly IPublicationRepository _repository;
        private readonly IAuthorsClient _authorsClient;
        private readonly ILogger<PublicationService> _logger;

        public PublicationService(
            IPublicationRepository repository,
            IAuthorsClient authorsClient,
            ILogger<PublicationService> logger)
        {
            _repository = repository;
            _authorsClient = authorsClient;
            _logger = logger;
        }

        public async Task<Publication> CreatePublicationAsync(string title, int authorId, string? content)
        {
            // VALIDAR AUTOR EXISTE (REQUISITO 10% nota)
            var author = await _authorsClient.GetAuthorAsync(authorId);
            if (author == null)
            {
                throw new Exception($"Author with ID {authorId} does not exist");
            }

            var publication = new Publication
            {
                Title = title,
                AuthorId = authorId,
                Content = content,
                Status = EditorialStatus.DRAFT
            };

            return await _repository.CreateAsync(publication);
        }

        public async Task<Publication?> GetPublicationByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<List<Publication>> GetAllPublicationsAsync(int page = 1, int limit = 10)
        {
            return await _repository.GetAllAsync(page, limit);
        }

        public async Task<Publication> ChangeStatusAsync(int id, EditorialStatus newStatus)
        {
            var publication = await _repository.GetByIdAsync(id);
            if (publication == null)
            {
                throw new Exception($"Publication with ID {id} not found");
            }

            publication.ChangeStatus(newStatus);
            return await _repository.UpdateAsync(publication);
        }
    }
}
