using System.ComponentModel.DataAnnotations;

namespace PublicationsService.DTOs
{
    public class CreatePublicationDto
    {
        [Required(ErrorMessage = "Title is required")]
        [MaxLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "AuthorId is required")]
        public int AuthorId { get; set; }

        public string? Content { get; set; }
    }
}
