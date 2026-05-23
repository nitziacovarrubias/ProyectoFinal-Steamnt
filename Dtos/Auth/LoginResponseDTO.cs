namespace MyApi.DTOs.Auth;

public class LoginResponseDTO
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;
}