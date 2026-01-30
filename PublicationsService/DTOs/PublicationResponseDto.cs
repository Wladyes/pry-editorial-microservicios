using PublicationsService.Models;
using PublicationsService.Enums;

namespace PublicationsService.DTOs
{
    public class PublicationResponseDto
    {
        public int Id { get; set; } //identificador de la publicacion
        public string Title { get; set; } = string.Empty; //titulo de la publicacion
         public int AuthorId { get; set; } //identificador del autor
        public string? Content { get; set; } // contenido de la publicacion
        public string Status { get; set; } = string.Empty; // estado editorial de la publicacion
        public DateTime CreatedAt { get; set; } //fecha de creacion de la publicacion
         public DateTime UpdatedAt { get; set; } //fecha de ultima actualizacion de la publicacion

        public static PublicationResponseDto FromEntity(Publication publication) //mapeo de la entidad Publication al DTO PublicationResponseDto
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
