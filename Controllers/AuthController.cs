using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Steamnt.Api.Data;
using Steamnt.Api.Dtos.Auth;
using Steamnt.Api.Interfaces;
using Steamnt.Api.Models;
using Steamnt.Api.Services;

namespace Steamnt.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
    public class AuthController: ControllerBase
    {
    private readonly AppDbContext _contexto;
    private readonly IAuthService _authService;

    public AuthController(AppDbContext contexto, IAuthService authService)
    {
        _contexto = contexto;
        _authService = authService;

    }

    [HttpPost("register")]
public async Task<IActionResult> Register(RegisterDTO dto)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    var result = await _authService.RegisterAsync(dto);

    if (!result.Success)
    {
        return BadRequest(result.Message);
    }

    return Ok(result.Message);
}

[HttpPost("login")]
    public async Task<IActionResult> Login(LoginDTO dto)
    {
        var result = await _authService.LoginAsync(dto);

        if (result == null)
        {
            return BadRequest("Correo o contraseña incorrectos");
        }

        return Ok(result);
    }
}
