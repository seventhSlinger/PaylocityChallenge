using Paylocity.Business.Models;

namespace Paylocity.Business.Interfaces
{
    public interface IPayrollService
    {
        PayrollSummary? GetYearlyPayrollPreviewForCompany(int companyId);
    }
}
