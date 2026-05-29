using Microsoft.AspNetCore.Mvc;
using Steamnt.Api.Dtos.Library;
using Steamnt.Api.Services;

namespace Steamnt.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LibraryController : ControllerBase
{
    private readonly ILibraryService _libraryService;

    public LibraryController(ILibraryService libraryService)
    {
        _libraryService = libraryService;
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddGame(AddToLibraryDto dto)
    {
        var result = await _libraryService.AddGameToLibrary(dto);

        if (!result.Success)
        {
            return BadRequest(new
            {
                message = result.Message
            });
        }

        return Ok(new
        {
            message = result.Message
        });
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserLibrary(int userId)
    {
        var library = await _libraryService.GetLibraryItemsPerUser(userId);

        if (library == null)
        {
            return NotFound(new
            {
                message = "Usuario no encontrado"
            });
        }

        return Ok(library);
    }
}