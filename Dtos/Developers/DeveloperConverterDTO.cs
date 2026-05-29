using Steamnt.Api.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Steamnt.Api.Dtos.Developers
{
    public static class DeveloperConverterDTO
    {
        public static DeveloperDTO DTOConverter(this Developer developer)
        {
            return new DeveloperDTO
            {
                Id = developer.Id,
                UserId = developer.UserId,
                StudioName = developer.StudioName,
                Description = developer.Description,
                Country = developer.Country
            };
        }

        public static List<DeveloperDTO> DTOConverter(this List<Developer> developers)
        {
            List<DeveloperDTO> list = new List<DeveloperDTO>();
            foreach (var developer in developers)
            {
                list.Add(developer.DTOConverter());
            }
            return list;
        }
    
}
}
