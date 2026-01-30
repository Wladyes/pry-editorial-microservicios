namespace PublicationsService.DTOs
{
    public class AuthorDto //DTO para representar la informacion del autor
    {
        public int Id { get; set; }  //identificador del autor
        public string FirstName { get; set; } = string.Empty; //nombre del autor
        public string LastName { get; set; } = string.Empty; //apellido del autor
        public string Email { get; set; } = string.Empty;  //correo electronico del autor
        public string? Biography { get; set; }   //biografia del autor
        public string? Nationality { get; set; } //nacionalidad del autor
    }
}
