using NewsPortal.Data;
using System;
using System.ComponentModel.DataAnnotations;

namespace NewsPortal.Models
{
    public class Article : IEntity
    {
        public Article()
        {
            CreatedDateTime = DateTime.Now;
        }

        public int Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Title { get; set; }

        [Required]
        [StringLength(500, MinimumLength = 3)]
        public string Description { get; set; }

        [Required(ErrorMessage = "Please provide a Category")]
        public int CategoryId { get; set; }

        [DataType(DataType.Date)]
        public DateTime CreatedDateTime { get; set; }
    }
}