using System.ComponentModel.DataAnnotations;
using PublicationsService.Enums;

namespace PublicationsService.DTOs
{
    public class ChangeStatusDto
    {
        [Required]
        public EditorialStatus Status { get; set; }
    }
}
