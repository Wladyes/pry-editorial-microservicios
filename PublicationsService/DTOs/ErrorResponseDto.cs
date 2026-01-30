namespace PublicationsService.DTOs
{
    public class ErrorResponseDto
    {
        public int StatusCode { get; set; } //estado HTTP de la respuesta
        public string Message { get; set; } = string.Empty;  // mensaje de error
        public string? Details { get; set; } //detalles adicionales del error
        public DateTime Timestamp { get; set; } = DateTime.UtcNow; //marca de tiempo de la respuesta
    }
}
