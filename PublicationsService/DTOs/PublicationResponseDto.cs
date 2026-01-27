using PublicationsService.Models;
using PublicationsService.Enums;

namespace PublicationsService.DTOs
{
    public class PublicationResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int AuthorId { get; set; }
        public string? Content { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public static PublicationResponseDto FromEntity(Publication publication)
        {
            return new PublicationResponseDto
            {
                Id = publication.Id,
                Title = publication.Title,
                AuthorId = publication.AuthorId,
                Content = publication.Content,
                Status = publication.Status.ToString(),
                CreatedAt = publication.CreatedAt,
                UpdatedAt = publication.UpdatedAt
            };
        }
    }
}
