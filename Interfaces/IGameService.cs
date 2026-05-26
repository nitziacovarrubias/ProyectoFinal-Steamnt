using Steamnt.Api.Dtos.Games;
using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.Interfaces
{
    public interface IGameService
    {
        Task<List<GameDTO>> GetGames();

        Task<GameDTO?> GetGameById(int id);

        Task<GameDTO> CreateGame(CreateGameDTO game);

        Task<GameDTO?> EditGame(int id, UpdateGameDto game);

        Task<bool> DisableGame(int id);

    }
}
