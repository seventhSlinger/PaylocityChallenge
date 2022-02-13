using Paylocity.Common.Interfaces;

namespace Paylocity.API.ViewModels
{
    public class BenefitViewModel : IUniqueModel
    {
        public int Id { get; set; }
        public decimal CostPerEmployeePerYear { get; set; }
        public decimal CostPerDependentPerYear { get; set; }
    }
}
