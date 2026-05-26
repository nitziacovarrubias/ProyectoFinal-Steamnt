using Microsoft.EntityFrameworkCore;
using Steamnt.Api.Data;
using Steamnt.Api.Dtos.Games;
using Steamnt.Api.Interfaces;
using Steamnt.Api.Models;
using System;
using System.Collections.Generic;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Steamnt.Api.Services
{
    public class GameService : IGameService
    {
        private readonly AppDbContext _context;

        public GameService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<GameDTO>> GetDeveloperGames(int developerId)
        {
            var games = await _context.Games
        .Include(g => g.Developer)
        .Include(g => g.GameGenres)
            .ThenInclude(gg => gg.Genre)
        .Where(g => g.DeveloperId == developerId && g.IsPublished)
        .ToListAsync();

            return games.DTOConverter();
        }

        public async Task<List<GameDTO>> GetGames(string? search, int? genreId)
        {
            var gamesQuery = _context.Games
        .Include(g => g.Developer)
        .Include(g => g.GameGenres)
            .ThenInclude(gg => gg.Genre)
        .Where(g => g.IsPublished)
        .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                gamesQuery = gamesQuery.Where(g =>
                    g.Title.Contains(search));
            }

            if (genreId.HasValue)
            {
                gamesQuery = gamesQuery.Where(g =>
                    g.GameGenres.Any(gg => gg.GenreId == genreId.Value));
            }

            var games = await gamesQuery.ToListAsync();

            return games.DTOConverter();
        }

        public async Task<GameDTO?> GetGameById(int id)
        {
            var game = await _context.Games.FirstOrDefaultAsync(x => x.Id == id && x.IsPublished);

            if (game == null)
                return null;

            return game.DTOConverter();
        }

        public async Task<GameDTO> CreateGame(CreateGameDTO game)
        {
            var gm = new Game
            {
                Title = game.Title,
                Description = game.Description,
                Price = game.Price,
                ImageUrl = game.ImageUrl,
                DownloadUrl = game.DownloadUrl,
                ReleaseDate = game.ReleaseDate,
                DeveloperId = game.DeveloperId,
                IsPublished = true,
                GameGenres = game.GenreIds
            .Select(id => new GameGenre
            {
                GenreId = id
            })
            .ToList()
            };

            await _context.Games.AddAsync(gm);

            await _context.SaveChangesAsync();

            return gm.DTOConverter();
        }

        public async Task<GameDTO?> EditGame(int id, UpdateGameDto game)
        {
            var gameEdit = await _context.Games
        .Include(g => g.GameGenres)
        .FirstOrDefaultAsync(x => x.Id == id && x.IsPublished);

            if (gameEdit == null)
                return null;

            gameEdit.Title = game.Title;
            gameEdit.Description = game.Description;
            gameEdit.Price = game.Price;
            gameEdit.ImageUrl = game.ImageUrl;
            gameEdit.DownloadUrl = game.DownloadUrl;
            gameEdit.ReleaseDate = game.ReleaseDate;
            gameEdit.DeveloperId = game.DeveloperId;
            gameEdit.IsPublished = game.IsPublished;

            gameEdit.GameGenres.Clear();

            gameEdit.GameGenres = game.GenreIds
        .Select(id => new GameGenre
        {
            GenreId = id,
            GameId = gameEdit.Id
        })
        .ToList();

            await _context.SaveChangesAsync();

            return gameEdit.DTOConverter();
        }

        public async Task<bool> DisableGame(int id)
        {
            var game = await _context.Games.FirstOrDefaultAsync(x => x.Id == id && x.IsPublished);

            if (game == null)
                return false;

            game.IsPublished = false;

            await _context.SaveChangesAsync();

            return true;

        }
    }
}
