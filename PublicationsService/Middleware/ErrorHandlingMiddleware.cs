using System.Net;
using System.Text.Json;
using PublicationsService.DTOs;

namespace PublicationsService.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = HttpStatusCode.InternalServerError;
            var message = "An error occurred processing your request";

            if (exception.Message.Contains("does not exist") || exception.Message.Contains("not found"))
            {
                statusCode = HttpStatusCode.BadRequest;
                message = exception.Message;
            }
            else if (exception.Message.Contains("unavailable") || exception.Message.Contains("timeout"))
            {
                statusCode = HttpStatusCode.ServiceUnavailable;
                message = "External service unavailable";
            }

            var response = new ErrorResponseDto
            {
                StatusCode = (int)statusCode,
                Message = message,
                Details = exception.Message
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            return context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
