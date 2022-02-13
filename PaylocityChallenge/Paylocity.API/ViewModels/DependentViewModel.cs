using Paylocity.Common.Interfaces;

namespace Paylocity.API.ViewModels
{
    public class DependentViewModel : IUniqueModel
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsSpouse { get; set; }
    }
}
