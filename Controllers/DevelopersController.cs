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
    public async Task<IActionResult> BecomeDeveloper(DeveloperDTO dto)
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
}