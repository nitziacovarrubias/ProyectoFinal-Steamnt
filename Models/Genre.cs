using System.ComponentModel.DataAnnotations;

namespace Steamnt.Api.Models;

// representa una categoría de videojuegos
public class Genre
{
    public int Id { get; set; }

    [Required]
    [MaxLength(80)]
    public string Name { get; set; } = string.Empty; // nombre del género

    [MaxLength(300)]
    public string Description { get; set; } = string.Empty; // descripción breve

    public bool IsActive { get; set; } = true; // indica si el género se encuentra activo

    // lista de juegos relacionados a este género
    public ICollection<GameGenre> GameGenres { get; set; } = new List<GameGenre>();
}