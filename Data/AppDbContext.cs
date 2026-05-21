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
    }
}