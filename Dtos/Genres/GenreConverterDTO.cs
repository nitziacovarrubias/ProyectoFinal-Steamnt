using Steamnt.Api.Dtos.Developers;
using Steamnt.Api.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.Dtos.Genres
{
    public static class GenreConverterDTO
    {
        public static GenreDTO DTOConverter(this Genre genre)
        {
            return new GenreDTO
            {
                Id = genre.Id,
                Name = genre.Name,
                Description = genre.Description
            };
        }

        public static List<GenreDTO> DTOConverter(this List<Genre> genres)
        {
            List<GenreDTO> list = new List<GenreDTO>();
            foreach (var genre in genres)
            {
                list.Add(genre.DTOConverter());
            }
            return list;
        }
    }
}
