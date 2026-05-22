using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Steamnt.Api.Data;
using Steamnt.Api.Dtos.Auth;
using Steamnt.Api.Models;

namespace Steamnt.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
    public class AuthController: ControllerBase
    {
    private readonly AppDbContext contexto;

    public AuthController(AppDbContext contexto)
    {
        this.contexto = contexto;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var emailExists = await contexto.Users
        .AnyAsync(u => u.Email == dto.Email);

        if (emailExists)
        {
            return BadRequest("Ya esta este correo registrado");
        }

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = dto.Password,
            Role = "User"
        };

        await contexto.Users.AddAsync(user);

        await contexto.SaveChangesAsync();

        return Ok("Usuario Creado Correctamente!");

    }
}
