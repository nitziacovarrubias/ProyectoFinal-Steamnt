namespace Steamnt.Api.Models;

// Representa un juego guardado en la biblioteca de un usuario
public class LibraryItem
{
    public int Id { get; set; }

    // usuario dueño del juego en la biblioteca
    public int UserId { get; set; }

    // id del numero de juego en la lista de la biblioteca
    public int GameId { get; set; }

    // fecha de agregación
    public DateTime AddedAt { get; set; } = DateTime.Now;

    public User? User { get; set; }

    public Game? Game { get; set; }
}