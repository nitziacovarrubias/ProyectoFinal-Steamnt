using System.ComponentModel.DataAnnotations;

namespace Steamnt.Api.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty; // nombre del usuario

    [Required]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty; // correo para iniciar sesion

    [Required]
    public string PasswordHash { get; set; } = string.Empty; // contrasena

    [Required]
    [MaxLength(20)]
    public string Role { get; set; } = "User"; // rol del usuario: user o developer si sube juegos

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    [MaxLength(500)]
    public string AvatarUrl { get; set; } = string.Empty;

    // perfil de desarrollador en caso de que el usuario decida convertirse en desarrollador
    public Developer? DeveloperProfile { get; set; }

    public ICollection<LibraryItem> LibraryItems { get; set; } = new List<LibraryItem>(); // coleccion de juegos que agrega a su biblioteca

    public ICollection<Download> Downloads { get; set; } = new List<Download>(); // historial de descargas del usuario
}