using Microsoft.AspNetCore.Mvc;
using Steamnt.Api.Dtos.Games;
using Steamnt.Api.Interfaces;

namespace Steamnt.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GamesController : ControllerBase
{
    private readonly IGameService _gameService;

    public GamesController(IGameService gameService)
    {
        _gameService = gameService;
    }

    [HttpGet]
    public async Task<IActionResult> GetGames()
    {
        var games = await _gameService.GetGames();

        return Ok(games);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGameById(int id)
    {
        var game = await _gameService.GetGameById(id);

        if (game == null)
            return NotFound("Juego no encontrado");

        return Ok(game);
    }

    [HttpPost]
    public async Task<IActionResult> CreateGame(CreateGameDTO game)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var createdGame = await _gameService.CreateGame(game);

        return CreatedAtAction(
            nameof(GetGameById),
            new { id = createdGame.Id },
            createdGame
        );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditGame(int id, UpdateGameDto game)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updatedGame = await _gameService.EditGame(id, game);

        if (updatedGame == null)
            return NotFound("Juego no encontrado");

        return Ok(updatedGame);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DisableGame(int id)
    {
        var deleted = await _gameService.DisableGame(id);

        if (!deleted)
            return NotFound("Juego no encontrado");

        return NoContent();
    }
}