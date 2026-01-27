using Microsoft.AspNetCore.Mvc;
using PublicationsService.DTOs;
using PublicationsService.Services;
using PublicationsService.Enums;

namespace PublicationsService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PublicationsController : ControllerBase
    {
        private readonly IPublicationService _service;
        private readonly ILogger<PublicationsController> _logger;

        public PublicationsController(IPublicationService service, ILogger<PublicationsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(typeof(PublicationResponseDto), 201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreatePublication([FromBody] CreatePublicationDto dto)
        {
            try
            {
                var publication = await _service.CreatePublicationAsync(dto.Title, dto.AuthorId, dto.Content);
                var response = PublicationResponseDto.FromEntity(publication);
                return CreatedAtAction(nameof(GetPublication), new { id = publication.Id }, response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating publication");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(PublicationResponseDto), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetPublication(int id)
        {
            var publication = await _service.GetPublicationByIdAsync(id);
            if (publication == null)
            {
                return NotFound(new { message = $"Publication {id} not found" });
            }

            return Ok(PublicationResponseDto.FromEntity(publication));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<PublicationResponseDto>), 200)]
        public async Task<IActionResult> GetPublications([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            var publications = await _service.GetAllPublicationsAsync(page, limit);
            var response = publications.Select(PublicationResponseDto.FromEntity).ToList();
            return Ok(response);
        }

        [HttpPatch("{id}/status")]
        [ProducesResponseType(typeof(PublicationResponseDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> ChangeStatus(int id, [FromBody] ChangeStatusDto dto)
        {
            try
            {
                var publication = await _service.ChangeStatusAsync(id, dto.Status);
                return Ok(PublicationResponseDto.FromEntity(publication));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error changing status for publication {Id}", id);
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
