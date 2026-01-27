using System.Text.Json;
using PublicationsService.DTOs;

namespace PublicationsService.Services
{
    public class AuthorsClient : IAuthorsClient
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<AuthorsClient> _logger;

        public AuthorsClient(HttpClient httpClient, ILogger<AuthorsClient> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<AuthorDto?> GetAuthorAsync(int authorId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"/authors/{authorId}");
                
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<AuthorDto>(content, new JsonSerializerOptions 
                    { 
                        PropertyNameCaseInsensitive = true 
                    });
                }
                
                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    _logger.LogWarning("Author {AuthorId} not found in Authors Service", authorId);
                    return null;
                }
                
                _logger.LogError("Error calling Authors Service: {StatusCode}", response.StatusCode);
                return null;
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "HTTP error calling Authors Service for author {AuthorId}", authorId);
                throw new Exception($"Authors Service unavailable: {ex.Message}");
            }
            catch (TaskCanceledException ex)
            {
                _logger.LogError(ex, "Timeout calling Authors Service for author {AuthorId}", authorId);
                throw new Exception("Authors Service timeout");
            }
        }
    }
}
