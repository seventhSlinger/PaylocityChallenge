using Paylocity.Common.Interfaces;

namespace Paylocity.Models.Models
{
    public class Benefit : IUniqueModel
    {
        public int Id { get; set; }
        public decimal CostPerEmployeePerYear { get; set; }
        public decimal CostPerDependentPerYear { get; set; }
    }
}
