using System.ComponentModel.DataAnnotations;

// DTO para crear una nueva publicacion
namespace PublicationsService.DTOs
{
    public class CreatePublicationDto
    {
        [Required(ErrorMessage = "Title is required")] //El titulo es obligatorio
        [MaxLength(255)]
        public string Title { get; set; } = string.Empty; //El titulo de la publicacion

        [Required(ErrorMessage = "AuthorId is required")]  //El Id del autor es obligatorio
        public int AuthorId { get; set; } //

        public string? Content { get; set; } //El contenido de la publicacion
    }
}
