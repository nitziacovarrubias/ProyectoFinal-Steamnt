using Steamnt.Api.Dtos.Library;
using Steamnt.Api.DTOs;

namespace Steamnt.Api.Services;

public interface ILibraryService
{
    Task<(bool Success, string Message)> AddGameToLibrary(AddToLibraryDto dto);

    Task<List<LibraryItemDTO>?> GetLibraryItemsPerUser(int userId);
}