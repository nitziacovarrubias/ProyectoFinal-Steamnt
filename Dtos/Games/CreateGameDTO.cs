using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Steamnt.Api.Dtos.Games
{
    public class CreateGameDTO
    {
        [Required]
        [MaxLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        [MaxLength(500)]
        public string ImageUrl { get; set; } = string.Empty;

        [MaxLength(500)]
        public string DownloadUrl { get; set; } = string.Empty;

        public DateTime ReleaseDate { get; set; }

        public int DeveloperId { get; set; }
        public List<int> GenreIds { get; set; } = new();
    }
}
