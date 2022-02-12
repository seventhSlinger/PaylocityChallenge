using Paylocity.Common.Interfaces;

namespace Paylocity.Models.Models
{
    public class Payroll : IUniqueModel
    {
        public int Id { get; set; }
        public decimal EmployeePayPerPeriod { get; set; }
        public int NumberOfPayPeriodsPerYear { get; set; }
    }
}
