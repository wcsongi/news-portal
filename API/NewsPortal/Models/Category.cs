using NewsPortal.Data;
using System;
using System.ComponentModel.DataAnnotations;

namespace NewsPortal.Models
{
    public class Category : IEntity
    {
        public Category()
        {
            CreatedDateTime = DateTime.Now;
        }

        public int Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }

        [DataType(DataType.Date)]
        public DateTime CreatedDateTime { get; set; }
    }
}