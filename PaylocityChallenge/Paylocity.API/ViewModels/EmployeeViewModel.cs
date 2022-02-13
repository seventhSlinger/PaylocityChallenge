using Paylocity.Common.Interfaces;

namespace Paylocity.API.ViewModels
{
    public class EmployeeViewModel : IUniqueModel
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
    }
}
