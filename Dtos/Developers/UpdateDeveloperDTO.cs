using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Steamnt.Api.Dtos.Developers
{
    public class UpdateDeveloperDTO
    {
        public int UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string StudioName { get; set; } = string.Empty;

        [MaxLength(300)]
        public string Description { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Country { get; set; } = string.Empty;
    }
}
