using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Steamnt.Api.Dtos.Auth
{
    public class RegisterDTO
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(150)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
