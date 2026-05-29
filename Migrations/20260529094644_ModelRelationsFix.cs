using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Steamnt.Api.Migrations
{
    /// <inheritdoc />
    public partial class ModelRelationsFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_LibraryItems_UserId_GameId",
                table: "LibraryItems");

            migrationBuilder.DropIndex(
                name: "IX_GameGenres_GameId_GenreId",
                table: "GameGenres");

            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: "/images/home/top-pokemon.jpg");

            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "/images/home/top-minecraft.jpg");

            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageUrl",
                value: "/images/home/dora.jpg");

            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "/images/home/hermosillo.jpg");

            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "/images/home/top-gta-obregon.jpg");

            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 6,
                column: "ImageUrl",
                value: "/images/home/top-ith-huelga.jpg");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryItems_UserId",
                table: "LibraryItems",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_GameGenres_GameId",
                table: "GameGenres",
                column: "GameId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_LibraryItems_UserId",
                table: "LibraryItems");

            migrationBuilder.DropIndex(
                name: "IX_GameGenres_GameId",
                table: "GameGenres");

            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: "https://via.placeholder.com/400x250?text=Pokemon+Region+Sonora");

            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "https://via.placeholder.com/400x250?text=Minecraft");

            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageUrl",
                value: "https://via.placeholder.com/400x250?text=Captura+a+Dora");

            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "https://via.placeholder.com/400x250?text=Un+Paseo+por+Hermosillo");

            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "https://via.placeholder.com/400x250?text=GTA+Obregon");

            migrationBuilder.UpdateData(
                table: "Games",
                keyColumn: "Id",
                keyValue: 6,
                column: "ImageUrl",
                value: "https://via.placeholder.com/400x250?text=huelga+ITH");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LibraryItems_UserId_GameId",
                table: "LibraryItems",
                columns: new[] { "UserId", "GameId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GameGenres_GameId_GenreId",
                table: "GameGenres",
                columns: new[] { "GameId", "GenreId" },
                unique: true);
        }
    }
}
