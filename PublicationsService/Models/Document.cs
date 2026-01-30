using System.ComponentModel.DataAnnotations;
 //Modelo base abstracto para documentos
namespace PublicationsService.Models
{
    public abstract class Document
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public int AuthorId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public abstract string GetDescription();

        public string GetAuthorInfo()
        {
            return $"Author ID: {AuthorId}";
        }
    }
}
