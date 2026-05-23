using Steamnt.Api.Dtos.Auth;
using Steamnt.Api.Dtos.Developers;
using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.Interfaces
{
    public interface IDeveloperService
    {
        Task<ServiceResponse> BecomeDeveloperAsync(DeveloperDTO dto);
    }
}
