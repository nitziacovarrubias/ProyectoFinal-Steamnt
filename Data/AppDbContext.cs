using Microsoft.EntityFrameworkCore;
using Steamnt.Api.Models;

namespace Steamnt.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    public DbSet<Developer> Developers { get; set; }

    public DbSet<Game> Games { get; set; }

    public DbSet<Genre> Genres { get; set; }

    public DbSet<GameGenre> GameGenres { get; set; }

    public DbSet<LibraryItem> LibraryItems { get; set; }

    public DbSet<Download> Downloads { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // un usuario solo puede tener un perfil de desarrollador
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasOne(u => u.DeveloperProfile)
            .WithOne(d => d.User)
            .HasForeignKey<Developer>(d => d.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Developer>()
            .HasIndex(d => d.UserId)
            .IsUnique();

        // Un desarrollador puede publicar varios juegos
        modelBuilder.Entity<Game>()
            .HasOne(g => g.Developer)
            .WithMany(d => d.Games)
            .HasForeignKey(g => g.DeveloperId)
            .OnDelete(DeleteBehavior.Restrict);

        // Relación muchos a muchos entre juegos y géneros
        modelBuilder.Entity<GameGenre>()
            .HasOne(gg => gg.Game)
            .WithMany(g => g.GameGenres)
            .HasForeignKey(gg => gg.GameId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<GameGenre>()
            .HasOne(gg => gg.Genre)
            .WithMany(g => g.GameGenres)
            .HasForeignKey(gg => gg.GenreId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<GameGenre>()
            .HasIndex(gg => new { gg.GameId, gg.GenreId })
            .IsUnique();

        // relación de biblioteca del usuario
        modelBuilder.Entity<LibraryItem>()
            .HasOne(li => li.User)
            .WithMany(u => u.LibraryItems)
            .HasForeignKey(li => li.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<LibraryItem>()
            .HasOne(li => li.Game)
            .WithMany(g => g.LibraryItems)
            .HasForeignKey(li => li.GameId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<LibraryItem>()
            .HasIndex(li => new { li.UserId, li.GameId })
            .IsUnique();

        // historial de descargas
        modelBuilder.Entity<Download>()
            .HasOne(d => d.User)
            .WithMany(u => u.Downloads)
            .HasForeignKey(d => d.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Download>()
            .HasOne(d => d.Game)
            .WithMany(g => g.Downloads)
            .HasForeignKey(d => d.GameId)
            .OnDelete(DeleteBehavior.Restrict);

        SeedData(modelBuilder);
    }

    // seedear con datos de prueba
    private void SeedData(ModelBuilder modelBuilder)
    {
        var seedDate = new DateTime(2026, 1, 1);

        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Name = "Usuario",
                Email = "usuario@steamnt.com",
                PasswordHash = "123456",
                Role = "User",
                CreatedAt = seedDate
            },
            new User
            {
                Id = 2,
                Name = "Desarrollador",
                Email = "developer@steamnt.com",
                PasswordHash = "123456",
                Role = "Developer",
                CreatedAt = seedDate
            }
        );

        modelBuilder.Entity<Developer>().HasData(
            new Developer
            {
                Id = 1,
                UserId = 2,
                StudioName = "Café Studios",
                Description = "Empresa dedicada al desarrollo de videojuegos solamente para Steamnt.",
                Country = "México",
                IsActive = true,
                CreatedAt = seedDate
            }
        );

        modelBuilder.Entity<Genre>().HasData(
            new Genre
            {
                Id = 1,
                Name = "Acción",
                Description = "Juegos con combate, movimiento rápido o desafíos intensos.",
                IsActive = true
            },
            new Genre
            {
                Id = 2,
                Name = "Aventura",
                Description = "Juegos enfocados en exploración e historia.",
                IsActive = true
            },
            new Genre
            {
                Id = 3,
                Name = "RPG",
                Description = "Juegos con progresión de personaje y toma de decisiones.",
                IsActive = true
            },
            new Genre
            {
                Id = 4,
                Name = "Terror",
                Description = "Juegos diseñados para causar tensión o miedo.",
                IsActive = true
            },
            new Genre
            {
                Id = 5,
                Name = "Indie",
                Description = "Juegos desarrollados por estudios pequeños o independientes.",
                IsActive = true
            }
        );

        modelBuilder.Entity<Game>().HasData(
            new Game
            {
                Id = 1,
                DeveloperId = 1,
                Title = "Pokémon",
                Description = "Pues Pokémon",
                Price = 10.00m,
                ImageUrl = "https://via.placeholder.com/400x250?text=Pokemon+Region+Sonora",
                DownloadUrl = "https://example.com/pokemon-region-sonora.zip",
                ReleaseDate = seedDate,
                IsPublished = true,
                CreatedAt = seedDate
            },
            new Game
            {
                Id = 2,
                DeveloperId = 1,
                Title = "Minecraft",
                Description = "Pues Minecraft",
                Price = 35.50m,
                ImageUrl = "https://via.placeholder.com/400x250?text=Minecraft",
                DownloadUrl = "https://example.com/minecraft.zip",
                ReleaseDate = seedDate,
                IsPublished = true,
                CreatedAt = seedDate
            },
            new Game
            {
                Id = 3,
                DeveloperId = 1,
                Title = "Captura a Dora la Exploradora",
                Description = "Juego de aventura donde debes capturar a Dora antes de que sea demasiado tarde y llegue a otro continente.",
                Price = 3.99m,
                ImageUrl = "https://via.placeholder.com/400x250?text=Captura+a+Dora",
                DownloadUrl = "https://example.com/captura-a-dora.zip",
                ReleaseDate = seedDate,
                IsPublished = true,
                CreatedAt = seedDate
            },
            new Game
            {
                Id = 4,
                DeveloperId = 1,
                Title = "Un Paseo por Hermosillo",
                Description = "Explora Hermosillo, visita Pueblitos, sobrevive al calor y a los baches.",
                Price = 24.99m,
                ImageUrl = "https://via.placeholder.com/400x250?text=Un+Paseo+por+Hermosillo",
                DownloadUrl = "https://example.com/paseo-hermosillo.zip",
                ReleaseDate = seedDate,
                IsPublished = true,
                CreatedAt = seedDate
            },
            new Game
            {
                Id = 5,
                DeveloperId = 1,
                Title = "GTA Obregón",
                Description = "Juego de mundo abierto donde recorres Obregón y tratas de no quedarte sin gasolina.",
                Price = 35.50m,
                ImageUrl = "https://via.placeholder.com/400x250?text=GTA+Obregon",
                DownloadUrl = "https://example.com/gta-obregon.zip",
                ReleaseDate = seedDate,
                IsPublished = true,
                CreatedAt = seedDate
            },
            new Game
            {
                Id = 6,
                DeveloperId = 1,
                Title = "ITH en Huelga",
                Description = "Intenta entrar al ITH mientras se presenta una huelga por el precio de los papaboneless",
                Price = 34.99m,
                ImageUrl = "https://via.placeholder.com/400x250?text=huelga+ITH",
                DownloadUrl = "https://example.com/huelga-ith.zip",
                ReleaseDate = seedDate,
                IsPublished = true,
                CreatedAt = seedDate
            }
        );

        modelBuilder.Entity<GameGenre>().HasData(
            new GameGenre
            {
                Id = 1,
                GameId = 1,
                GenreId = 3
            },
            new GameGenre
            {
                Id = 2,
                GameId = 1,
                GenreId = 2
            },
            new GameGenre
            {
                Id = 3,
                GameId = 2,
                GenreId = 2
            },
            new GameGenre
            {
                Id = 4,
                GameId = 2,
                GenreId = 5
            },
            new GameGenre
            {
                Id = 5,
                GameId = 3,
                GenreId = 1
            },
            new GameGenre
            {
                Id = 6,
                GameId = 3,
                GenreId = 2
            },
            new GameGenre
            {
                Id = 7,
                GameId = 4,
                GenreId = 2
            },
            new GameGenre
            {
                Id = 8,
                GameId = 4,
                GenreId = 5
            },
            new GameGenre
            {
                Id = 9,
                GameId = 5,
                GenreId = 1
            },
            new GameGenre
            {
                Id = 10,
                GameId = 5,
                GenreId = 2
            },
            new GameGenre
            {
                Id = 11,
                GameId = 6,
                GenreId = 4
            },
            new GameGenre
            {
                Id = 12,
                GameId = 6,
                GenreId = 2
            }
        );

        modelBuilder.Entity<LibraryItem>().HasData(
            new LibraryItem
            {
                Id = 1,
                UserId = 1,
                GameId = 1,
                AddedAt = seedDate
            }
        );

        modelBuilder.Entity<Download>().HasData(
            new Download
            {
                Id = 1,
                UserId = 1,
                GameId = 1,
                DownloadedAt = seedDate
            }
        );
    }
}