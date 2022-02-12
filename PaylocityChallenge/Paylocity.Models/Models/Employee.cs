using Paylocity.Common.Interfaces;

namespace Paylocity.Models.Models
{
    public class Employee : IUniqueModel
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get;set; } 
    }
}
