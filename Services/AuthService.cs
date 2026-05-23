using Microsoft.EntityFrameworkCore;
using Steamnt.Api.Dtos.Auth;
using Steamnt.Api.Data;
using Steamnt.Api.Models;
using Steamnt.Api.Interfaces;

namespace Steamnt.Api.Services.Auth;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<LoginResponseDTO?> LoginAsync(LoginDTO dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null)
        {
            return null;
        }

        if (user.PasswordHash != dto.Password)
        {
            return null;
        }

        return new LoginResponseDTO
        {
         Id = user.Id,
         Name = user.Name,
         Role = user.Role
        };
    }

    public async Task<ServiceResponse> RegisterAsync(RegisterDTO dto){
        var emailExists = await _context.Users
        .AnyAsync(u => u.Email == dto.Email);

    if (emailExists)
    {
        return new ServiceResponse
        {
            Success = false,
            Message = "Ya esta este correo registrado"
        };
    }

    var user = new User
    {
        Name = dto.Name,
        Email = dto.Email,
        PasswordHash = dto.Password,
        Role = "User"
    };

    await _context.Users.AddAsync(user);

    await _context.SaveChangesAsync();

    return new ServiceResponse
    {
        Success = true,
        Message = "Usuario creado correctamente"
    };
    }
}