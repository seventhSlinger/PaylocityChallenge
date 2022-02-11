using Paylocity.Common.Interfaces;

namespace Paylocity.Models.Models
{
    public class Company : IUniqueModel
    {
        public int Id { get; set; }
        public string CompanyName { get; set;}
        public string CompanyDescription { get; set;}
    }
}
