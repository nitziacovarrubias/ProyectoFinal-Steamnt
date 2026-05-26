using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.Dtos.Games
{
    public class GameDTO
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string ImageUrl { get; set; } = string.Empty;

        public string DownloadUrl { get; set; } = string.Empty;

        public DateTime ReleaseDate { get; set; }

        public bool IsPublished { get; set; }

        public int DeveloperId { get; set; }

        public string DeveloperName { get; set; } = string.Empty;

        public List<string> Genres { get; set; } = new();
    }
}

