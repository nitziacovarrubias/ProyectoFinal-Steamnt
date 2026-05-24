using Microsoft.AspNetCore.Mvc;
using Steamnt.Api.Dtos.Developers;
using Steamnt.Api.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DevelopersController : ControllerBase
{
    private readonly IDeveloperService _developerService;

    public DevelopersController(IDeveloperService developerService)
    {
        _developerService = developerService;
    }

    [HttpPost("become")]
    public async Task<IActionResult> BecomeDeveloper(BecomeDeveloperDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _developerService.BecomeDeveloperAsync(dto);

        if (!result.Success)
        {
            return BadRequest(result.Message);
        }

        return Ok(result.Message);
    }

    [HttpGet]
    public async Task<ActionResult<List<DeveloperDTO>>> GetDevelopers()
    {
        var developers = await _developerService.GetDevelopers();

        return Ok(developers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DeveloperDTO>> GetDeveloperById(int id)
    {
        var developer = await _developerService.GetDeveloperById(id);

        if (developer == null)
            return NotFound();

        return Ok(developer);
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<DeveloperDTO>> GetDeveloperByUserId(int userId)
    {
        var developer = await _developerService.GetDeveloperByUserId(userId);

        if (developer == null)
            return NotFound();

        return Ok(developer);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<DeveloperDTO>> EditDeveloper(
        int id,
        [FromBody] UpdateDeveloperDTO developer)
    {
        var updatedDeveloper =
            await _developerService.EditDeveloper(id, developer);

        if (updatedDeveloper == null)
            return NotFound();

        return Ok(updatedDeveloper);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DisableDeveloper(int id)
    {
        var result = await _developerService.DisableDeveloper(id);

        if (!result)
            return NotFound();

        return NoContent();
    }

}