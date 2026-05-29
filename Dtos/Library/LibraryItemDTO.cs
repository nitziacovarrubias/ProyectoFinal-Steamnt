using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.DTOs;

public class LibraryItemDTO
{
    public int LibraryItemId { get; set; }

    public int GameId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public string? ImageUrl { get; set; }

    public string Developer { get; set; } = string.Empty;

    public DateTime AddedAt { get; set; }
}