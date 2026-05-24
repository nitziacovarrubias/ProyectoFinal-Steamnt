using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Steamnt.Api.Dtos.Genres
{
    public class GenreDTO
    {

        public int Id { get; set; }

        [Required]
        [MaxLength(80)]
        public string Name { get; set; } = string.Empty; // nombre del género

        [MaxLength(300)]
        public string Description { get; set; } = string.Empty; // descripción breve
    }
}
