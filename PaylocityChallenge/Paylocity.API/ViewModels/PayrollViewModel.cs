using Paylocity.Common.Interfaces;

namespace Paylocity.API.ViewModels
{
    public class PayrollViewModel : IUniqueModel
    {
        public int Id { get; set; }
        public decimal EmployeePayPerPeriod { get; set; }
        public int NumberOfPayPeriodsPerYear { get; set; }
    }
}
