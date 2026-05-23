using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Steamnt.Api.Data;
using Steamnt.Api.Dtos.Auth;
using Steamnt.Api.Dtos.Developers;
using Steamnt.Api.Interfaces;
using Steamnt.Api.Models;

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

    public async Task<List<DeveloperDTO>> GetDevelopers()
    {
        var developers = await _context.Developers.Where(x => x.IsActive).ToListAsync();

        return developers.DTOConverter();
    }

    public async Task<DeveloperDTO> GetDeveloperById(int id)
    {
        var developer = await _context.Developers.FirstOrDefaultAsync(x => x.Id == id && x.IsActive);

        if (developer == null)
            return null;

        return developer.DTOConverter();
    }

    public async Task<DeveloperDTO> GetDeveloperByUserId(int userId)
    {
         var developer = await _context.Developers.FirstOrDefaultAsync(x => x.UserId == userId && x.IsActive);

        if (developer == null)
            return null;

        return developer.DTOConverter();
    }

    public async Task<DeveloperDTO> EditDeveloper(int id, DeveloperDTO developer)
    {
        var developerEdit = await _context.Developers.FirstOrDefaultAsync(x => x.Id == id && x.IsActive);

        if (developerEdit == null)
            return null;

        developerEdit.UserId = developer.UserId;
        developerEdit.StudioName = developer.StudioName;
        developerEdit.Description = developer.Description;
        developerEdit.Country = developer.Country;

        await _context.SaveChangesAsync();

        return developerEdit.DTOConverter();
    }

    public async Task<bool> DisableDeveloper(int id)
    {
        var developer = await _context.Developers.FirstOrDefaultAsync(x => x.Id == id);

        if (developer == null)
            return false;

        developer.IsActive = false;

        await _context.SaveChangesAsync();

        return true;

    }

}