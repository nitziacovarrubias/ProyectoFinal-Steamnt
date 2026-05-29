using Steamnt.Api.Dtos.Auth;
using Steamnt.Api.Dtos.Developers;
using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.Interfaces
{
    public interface IDeveloperService
    {
        Task<ServiceResponse> BecomeDeveloperAsync(BecomeDeveloperDTO dto);
        Task<List<DeveloperDTO>> GetDevelopers();
        Task<DeveloperDTO> GetDeveloperById(int id);
        Task<DeveloperDTO> GetDeveloperByUserId(int userId);
        Task<DeveloperDTO> EditDeveloper(int id, UpdateDeveloperDTO developer);
        Task<bool> DisableDeveloper(int id);
    }
}
