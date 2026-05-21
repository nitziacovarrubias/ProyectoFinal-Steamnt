namespace Steamnt.Api.Models;

// Tabla intermedia para relacionar
// juegos con su respectivo género
public class GameGenre
{
    public int Id { get; set; }

    public int GameId { get; set; } // juego relacionado

    // género relacionado
    public int GenreId { get; set; }

    public Game? Game { get; set; }

    public Genre? Genre { get; set; }
}