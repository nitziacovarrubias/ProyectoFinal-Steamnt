using Steamnt.Api.Data;
using Steamnt.Api.Dtos.Genres;
using Steamnt.Api.Interfaces;
using Microsoft.EntityFrameworkCore;
using Steamnt.Api.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.Services
{
    public class GenreService: IGenreService
    {
        private readonly AppDbContext _context;

        public GenreService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<GenreDTO>> GetGenres()
        {
            var genres = await _context.Genres.Where(x => x.IsActive).ToListAsync();

            return genres.DTOConverter();
        }

        public async Task<GenreDTO> GetGenreById(int id)
        {
            var genre = await _context.Genres.FirstOrDefaultAsync(x => x.Id == id && x.IsActive);

            if (genre == null)
                return null;

            return genre.DTOConverter();
        }

        public async Task<GenreDTO> CreateGenre(CreateGenreDTO genre)
        {
            var gnr = new Genre
            {
                Name = genre.Name,
                Description = genre.Description,
                IsActive = true
            };

            await _context.Genres.AddAsync(gnr);

            await _context.SaveChangesAsync();

            return gnr.DTOConverter();
        }

        public async Task<GenreDTO> EditGenre(int id, UpdateGenreDTO genre)
        {
            var genreEdit = await _context.Genres.FirstOrDefaultAsync(x => x.Id == id && x.IsActive);

            if (genreEdit == null)
                return null;

            genreEdit.Name = genre.Name;
            genreEdit.Description = genre.Description;

            await _context.SaveChangesAsync();

            return genreEdit.DTOConverter();
        }

        public async Task<bool> DisableGenre(int id)
        {
            var genre = await _context.Genres.FirstOrDefaultAsync(x => x.Id == id && x.IsActive);

            if (genre == null)
                return false;

            genre.IsActive = false;

            await _context.SaveChangesAsync();

            return true;

        }
    }
}
