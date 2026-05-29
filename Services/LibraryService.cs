using System;
using System.Collections.Generic;
using System.Text;
using Steamnt.Api.Data;
using Steamnt.Api.Dtos.Library;
using Steamnt.Api.Interfaces;
using Microsoft.EntityFrameworkCore;
using Steamnt.Api.Models;
using Steamnt.Api.DTOs;

namespace Steamnt.Api.Services
{
    public class LibraryService: ILibraryService
    {
        private readonly AppDbContext _context;

        public LibraryService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<(bool Success, string Message)> AddGameToLibrary(AddToLibraryDto dto)
        {
            var userExists = await _context.Users
                .AnyAsync(u => u.Id == dto.UserId);

            if (!userExists)
            {
                return (false, "Usuario no encontrado");
            }

            var gameExists = await _context.Games
                .AnyAsync(g => g.Id == dto.GameId);

            if (!gameExists)
            {
                return (false, "Juego no encontrado");
            }

            var alreadyOwned = await _context.LibraryItems
                .AnyAsync(li =>
                    li.UserId == dto.UserId &&
                    li.GameId == dto.GameId);

            if (alreadyOwned)
            {
                return (false, "El usuario ya tiene este juego");
            }

            var libraryItem = new LibraryItem
            {
                UserId = dto.UserId,
                GameId = dto.GameId
            };

            await _context.LibraryItems.AddAsync(libraryItem);

            var download = new Download
            {
                UserId = dto.UserId,
                GameId = dto.GameId
            };

            await _context.Downloads.AddAsync(download);

            await _context.SaveChangesAsync();

            return (true, "Juego agregado correctamente");
        }

        public async Task<List<LibraryItemDTO>?> GetLibraryItemsPerUser(int userId)
        {
            var userExists = await _context.Users
                .AnyAsync(u => u.Id == userId);

            if (!userExists)
            {
                return null;
            }

            return await _context.LibraryItems
        .Include(li => li.Game)
        .ThenInclude(g => g.Developer)
        .Where(li => li.UserId == userId)
        .OrderByDescending(li => li.AddedAt)
        .Select(li => new LibraryItemDTO
        {
            LibraryItemId = li.Id,

            GameId = li.GameId,

            Title = li.Game!.Title,

            Description = li.Game.Description,

            Price = li.Game.Price,

            ImageUrl = li.Game.ImageUrl,

            Developer = li.Game.Developer!.StudioName,

            AddedAt = li.AddedAt
        })
        .ToListAsync();
        }
    }
}
