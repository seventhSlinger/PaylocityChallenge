using Paylocity.Common.Interfaces;

namespace Paylocity.Models.Models
{
    public class Dependent : IUniqueModel
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsSpouse { get; set; }
    }
}
