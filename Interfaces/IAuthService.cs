using Steamnt.Api.Dtos.Auth;
using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDTO?> LoginAsync(LoginDTO dto);
        Task<ServiceResponse> RegisterAsync(RegisterDTO dto);
    }
}
