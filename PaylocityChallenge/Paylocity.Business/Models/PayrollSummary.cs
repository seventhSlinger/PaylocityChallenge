namespace Paylocity.Business.Models
{
    public class PayrollSummary
    {
        public int TotalEmployees { get; set; } = 0;
        public decimal TotalPayrollGross { get; set; } = 0m;
        public decimal TotalBenefitsCost { get; set; } = 0m;
        public decimal TotalPayrollWithBenefits { get;set; } = 0m;
    }
}
