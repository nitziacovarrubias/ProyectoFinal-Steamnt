using Steamnt.Api.Dtos.Genres;
using Steamnt.Api.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.Dtos.Games
{
    public static class GameConverterDTO
    {
        public static GameDTO DTOConverter(this Game game)
        {
            return new GameDTO
            {
                Id = game.Id,
                Title = game.Title,
                Description = game.Description,
                Price = game.Price,
                ImageUrl = game.ImageUrl,
                DownloadUrl = game.DownloadUrl,
                ReleaseDate = game.ReleaseDate,
                IsPublished = game.IsPublished,
                DeveloperId = game.DeveloperId,
                DeveloperName = game.Developer?.StudioName ?? string.Empty,
                Genres = game.GameGenres
             .Select(gg => gg.Genre != null
                 ? gg.Genre.Name
                 : string.Empty)
             .Where(name => !string.IsNullOrEmpty(name))
             .ToList()
            };
        }

        public static List<GameDTO> DTOConverter(this List<Game> games)
        {
            List<GameDTO> list = new List<GameDTO>();
            foreach (var game in games)
            {
                list.Add(game.DTOConverter());
            }
            return list;
        }
    }
}

