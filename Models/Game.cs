using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Steamnt.Api.Models;

// juego pubblicado desde Steamnt
public class Game
{
    public int Id { get; set; }

    // id del desarrollador que publicó el juego
    public int DeveloperId { get; set; }

    [Required]
    [MaxLength(150)]
    public string Title { get; set; } = string.Empty; // titulo del videojuego

    [Required]
    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty; // descripcion del videojuego

    [Column(TypeName = "decimal(10,2)")]
    public decimal Price { get; set; } // previo, en caso de ser gratis puede ser 0

    [MaxLength(500)]
    public string ImageUrl { get; set; } = string.Empty; // imagen que se mostrará en la card desde la tienda

    [MaxLength(500)]
    public string DownloadUrl { get; set; } = string.Empty; // link de descarga (simbolico)

    public DateTime ReleaseDate { get; set; } = DateTime.Now;

    public bool IsPublished { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public Developer? Developer { get; set; }

    // lista de genero/s asociados al videojuego
    public ICollection<GameGenre> GameGenres { get; set; } = new List<GameGenre>();

    // usuarios que tienen incluido este videojuego en su biblioteca
    public ICollection<LibraryItem> LibraryItems { get; set; } = new List<LibraryItem>();

    // numero de descargas (simbolico)
    public ICollection<Download> Downloads { get; set; } = new List<Download>();
}