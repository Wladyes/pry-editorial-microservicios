using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PublicationsService.Enums;

namespace PublicationsService.Models
{
    [Table("publications")]
    public class Publication : Document
    {
        [Column(TypeName = "TEXT")]
        public string? Content { get; set; }

        [Required]
        public EditorialStatus Status { get; set; } = EditorialStatus.DRAFT;

        public override string GetDescription()
        {
            return $"Publication: {Title} (Status: {Status})";
        }

        public void ChangeStatus(EditorialStatus newStatus)
        {
            Status = newStatus;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
