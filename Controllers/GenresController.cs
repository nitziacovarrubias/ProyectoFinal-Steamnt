using Microsoft.AspNetCore.Mvc;
using Steamnt.Api.Dtos.Developers;
using Steamnt.Api.Dtos.Genres;
using Steamnt.Api.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {
        private readonly IGenreService _genreService;

        public GenresController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GenreDTO>>> GetGenres()
        {
            var genres = await _genreService.GetGenres();

            return Ok(genres);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GenreDTO>> GetGenreById(int id)
        {
            var genre = await _genreService.GetGenreById(id);

            if (genre == null)
                return NotFound();

            return Ok(genre);
        }

        [HttpPost]
        public async Task<ActionResult<GenreDTO>> CreateGenre([FromBody] CreateGenreDTO genre)
        {
            var createdGenre = await _genreService.CreateGenre(genre);

            return CreatedAtAction(
                nameof(GetGenreById),
                new { id = createdGenre.Id },
                createdGenre
            );
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GenreDTO>> EditGenre(
            int id,
            [FromBody] UpdateGenreDTO genre)
        {
            var updatedDeveloper =
                await _genreService.EditGenre(id, genre);

            if (updatedDeveloper == null)
                return NotFound();

            return Ok(updatedDeveloper);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DisableGenre(int id)
        {
            var result = await _genreService.DisableGenre(id);

            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
