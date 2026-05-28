using Steamnt.Api.Dtos.Library;

namespace Steamnt.Api.Services;

public interface ILibraryService
{
    Task<(bool Success, string Message)> AddGameToLibrary(AddToLibraryDto dto);
}