using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Troopers.Capibank.Exceptions;

public class InvalidCredentialsException(string message) : Exception(message)
{
}

public class InvalidCredentialsExceptionHandler(ILogger<InvalidCredentialsExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if (exception is not InvalidCredentialsException)
        {
            return false;
        }

        logger.LogError("Invalid credentials: {}", exception.Message);

        var problemDetails = new ProblemDetails
        {
            Status = StatusCodes.Status401Unauthorized,
            Type = exception.GetType().Name,
            Title = exception.GetType().Name,
            Detail = exception.Message,
            Instance = $"{httpContext.Request.Method} {httpContext.Request.Path}"
        };

        httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;

        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken: cancellationToken);

        return true;
    }
}