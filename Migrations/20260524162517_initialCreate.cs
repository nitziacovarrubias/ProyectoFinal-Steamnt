using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Steamnt.Api.Migrations
{
    /// <inheritdoc />
    public partial class initialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Genres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genres", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Developers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    StudioName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Country = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Developers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Developers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeveloperId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    DownloadUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ReleaseDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsPublished = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Games_Developers_DeveloperId",
                        column: x => x.DeveloperId,
                        principalTable: "Developers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Downloads",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    GameId = table.Column<int>(type: "int", nullable: false),
                    DownloadedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Downloads", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Downloads_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Downloads_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GameGenres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GameId = table.Column<int>(type: "int", nullable: false),
                    GenreId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameGenres", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GameGenres_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GameGenres_Genres_GenreId",
                        column: x => x.GenreId,
                        principalTable: "Genres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LibraryItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    GameId = table.Column<int>(type: "int", nullable: false),
                    AddedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LibraryItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LibraryItems_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LibraryItems_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Genres",
                columns: new[] { "Id", "Description", "IsActive", "Name" },
                values: new object[,]
                {
                    { 1, "Juegos con combate, movimiento rápido o desafíos intensos.", true, "Acción" },
                    { 2, "Juegos enfocados en exploración e historia.", true, "Aventura" },
                    { 3, "Juegos con progresión de personaje y toma de decisiones.", true, "RPG" },
                    { 4, "Juegos diseñados para causar tensión o miedo.", true, "Terror" },
                    { 5, "Juegos desarrollados por estudios pequeños o independientes.", true, "Indie" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "Name", "PasswordHash", "Role" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "usuario@steamnt.com", "Usuario", "123456", "User" },
                    { 2, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "developer@steamnt.com", "Desarrollador", "123456", "Developer" }
                });

            migrationBuilder.InsertData(
                table: "Developers",
                columns: new[] { "Id", "Country", "CreatedAt", "Description", "IsActive", "StudioName", "UserId" },
                values: new object[] { 1, "México", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Empresa dedicada al desarrollo de videojuegos solamente para Steamnt.", true, "Café Studios", 2 });

            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "Id", "CreatedAt", "Description", "DeveloperId", "DownloadUrl", "ImageUrl", "IsPublished", "Price", "ReleaseDate", "Title" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Pues Pokémon", 1, "https://example.com/pokemon-region-sonora.zip", "https://via.placeholder.com/400x250?text=Pokemon+Region+Sonora", true, 10.00m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Pokémon" },
                    { 2, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Pues Minecraft", 1, "https://example.com/minecraft.zip", "https://via.placeholder.com/400x250?text=Minecraft", true, 35.50m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Minecraft" },
                    { 3, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Juego de aventura donde debes capturar a Dora antes de que sea demasiado tarde y llegue a otro continente.", 1, "https://example.com/captura-a-dora.zip", "https://via.placeholder.com/400x250?text=Captura+a+Dora", true, 3.99m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Captura a Dora la Exploradora" },
                    { 4, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Explora Hermosillo, visita Pueblitos, sobrevive al calor y a los baches.", 1, "https://example.com/paseo-hermosillo.zip", "https://via.placeholder.com/400x250?text=Un+Paseo+por+Hermosillo", true, 24.99m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Un Paseo por Hermosillo" },
                    { 5, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Juego de mundo abierto donde recorres Obregón y tratas de no quedarte sin gasolina.", 1, "https://example.com/gta-obregon.zip", "https://via.placeholder.com/400x250?text=GTA+Obregon", true, 35.50m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "GTA Obregón" },
                    { 6, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Intenta entrar al ITH mientras se presenta una huelga por el precio de los papaboneless", 1, "https://example.com/huelga-ith.zip", "https://via.placeholder.com/400x250?text=huelga+ITH", true, 34.99m, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "ITH en Huelga" }
                });

            migrationBuilder.InsertData(
                table: "Downloads",
                columns: new[] { "Id", "DownloadedAt", "GameId", "UserId" },
                values: new object[] { 1, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1 });

            migrationBuilder.InsertData(
                table: "GameGenres",
                columns: new[] { "Id", "GameId", "GenreId" },
                values: new object[,]
                {
                    { 1, 1, 3 },
                    { 2, 1, 2 },
                    { 3, 2, 2 },
                    { 4, 2, 5 },
                    { 5, 3, 1 },
                    { 6, 3, 2 },
                    { 7, 4, 2 },
                    { 8, 4, 5 },
                    { 9, 5, 1 },
                    { 10, 5, 2 },
                    { 11, 6, 4 },
                    { 12, 6, 2 }
                });

            migrationBuilder.InsertData(
                table: "LibraryItems",
                columns: new[] { "Id", "AddedAt", "GameId", "UserId" },
                values: new object[] { 1, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Developers_UserId",
                table: "Developers",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Downloads_GameId",
                table: "Downloads",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_Downloads_UserId",
                table: "Downloads",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_GameGenres_GameId_GenreId",
                table: "GameGenres",
                columns: new[] { "GameId", "GenreId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GameGenres_GenreId",
                table: "GameGenres",
                column: "GenreId");

            migrationBuilder.CreateIndex(
                name: "IX_Games_DeveloperId",
                table: "Games",
                column: "DeveloperId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryItems_GameId",
                table: "LibraryItems",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryItems_UserId_GameId",
                table: "LibraryItems",
                columns: new[] { "UserId", "GameId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Downloads");

            migrationBuilder.DropTable(
                name: "GameGenres");

            migrationBuilder.DropTable(
                name: "LibraryItems");

            migrationBuilder.DropTable(
                name: "Genres");

            migrationBuilder.DropTable(
                name: "Games");

            migrationBuilder.DropTable(
                name: "Developers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
