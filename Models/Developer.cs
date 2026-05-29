using System.ComponentModel.DataAnnotations;

namespace Steamnt.Api.Models;

public class Developer
{
    public int Id { get; set; }

    // usuario al que pertenece este perfil de desarrollador
    public int UserId { get; set; }

    [Required]
    [MaxLength(100)]
    public string StudioName { get; set; } = string.Empty; // usuario al que pertenece el perfil de desarrollador

    [MaxLength(300)]
    public string Description { get; set; } = string.Empty; // nombre público

    [MaxLength(100)]
    public string Country { get; set; } = string.Empty; // país de procedencia

    [MaxLength(500)]
    public string LogoUrl { get; set; } = string.Empty;

    [MaxLength(500)]
    public string BannerUrl { get; set; } = string.Empty;

    public bool IsActive { get; set; } = true; // estado del perfil

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public User? User { get; set; }

    // lista de juegos publicados por el desarrollador
    public ICollection<Game> Games { get; set; } = new List<Game>();
}