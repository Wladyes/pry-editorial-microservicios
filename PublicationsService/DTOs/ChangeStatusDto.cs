using System.ComponentModel.DataAnnotations;
using PublicationsService.Enums;
 
//DTO para cambiar el estado editorial de una publicacion
namespace PublicationsService.DTOs
{
    public class ChangeStatusDto
    {
        [Required]
        public EditorialStatus Status { get; set; } 
    }
}
