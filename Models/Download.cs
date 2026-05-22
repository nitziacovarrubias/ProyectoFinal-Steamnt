namespace Steamnt.Api.Models;

// Guarda el historial de descargas de videojuegos (simbolico por ahora)
public class Download
{
    public int Id { get; set; }

    public int UserId { get; set; } // id del usuario que descargó el juego

    public int GameId { get; set; } // id del juego descargado

    public DateTime DownloadedAt { get; set; } = DateTime.Now; // fecha de descarga

    public User? User { get; set; }

    public Game? Game { get; set; }
}