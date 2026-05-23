using Microsoft.EntityFrameworkCore;
using Steamnt.Api.Dtos.Auth;
using Steamnt.Api.Data;
using Steamnt.Api.Models;
using Steamnt.Api.Interfaces;
using Steamnt.Api.Dtos.Developers;

namespace Steamnt.Api.Services;

public class DeveloperService : IDeveloperService
{
    private readonly AppDbContext _context;

    public DeveloperService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ServiceResponse> BecomeDeveloperAsync(DeveloperDTO dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == dto.UserId);

        if (user == null)
        {
            return new ServiceResponse
            {
                Success = false,
                Message = "Este usuario no existe"
            };
        }

        if (user.Role == "Developer")
        {
            return new ServiceResponse
            {
                Success = false,
                Message = "Este usuario ya es desarrollador"
            };
        }

        var developer = new Developer
        {
            UserId = dto.UserId,
            StudioName = dto.StudioName,
            Description = dto.Description,
            Country = dto.Country,
        };

        user.Role = "Developer";

        await _context.Developers.AddAsync(developer);

        await _context.SaveChangesAsync();

        return new ServiceResponse
        {
            Success = true,
            Message = "Te convertiste en Desarrollador!"
        };
    }
}