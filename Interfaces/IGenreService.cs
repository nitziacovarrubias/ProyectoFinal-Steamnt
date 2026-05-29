using Steamnt.Api.Dtos.Developers;
using Steamnt.Api.Dtos.Genres;
using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.Interfaces
{
    public interface IGenreService
    {
        Task<List<GenreDTO>> GetGenres();
        Task<GenreDTO> GetGenreById(int id);
        Task<GenreDTO> CreateGenre(CreateGenreDTO genre);
        Task<GenreDTO> EditGenre(int id, UpdateGenreDTO genre);
        Task<bool> DisableGenre(int id);
    }
}
