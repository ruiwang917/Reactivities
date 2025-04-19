using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTypo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "latitude",
                table: "Activities",
                newName: "Latitude");

            migrationBuilder.RenameColumn(
                name: "lontitude",
                table: "Activities",
                newName: "Longitude");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Latitude",
                table: "Activities",
                newName: "latitude");

            migrationBuilder.RenameColumn(
                name: "Longitude",
                table: "Activities",
                newName: "lontitude");
        }
    }
}
