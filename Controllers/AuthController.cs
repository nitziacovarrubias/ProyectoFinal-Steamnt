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
    private readonly AuthService authService;

    public AuthController(AppDbContext _contexto, AuthService _authService)
    {
        contexto = _contexto;
        authService = _authService

    }

    [HttpPost("register")]
public async Task<IActionResult> Register(RegisterDTO dto)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    var result = await authService.RegisterAsync(dto);

    if (!result.Success)
    {
        return BadRequest(result.Message);
    }

    return Ok(result.Message);
}

[HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await authService.LoginAsync(dto);

        if (!result.Success)
        {
            return BadRequest(result.Message);
        }

        return Ok(result.Message);
    }
}
