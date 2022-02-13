using Paylocity.Business.Interfaces;
using Paylocity.Business.Models;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;
using System.Linq;

namespace Paylocity.Business.Services
{
    internal class PayrollService : IPayrollService
    {
        private const decimal _nameStartsWithLetterADiscountAmount = 0.9m;
        private readonly IRepository<Company> _companyRepository;
        private readonly IRepository<Benefit> _benefitRepository;
        private readonly IRepository<Payroll> _payrollRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IDependentRepository _dependentRepository;

        public PayrollService(IRepository<Company> companyRepository,
            IRepository<Benefit> benefitRepository,
            IRepository<Payroll> payrollRepository,
            IEmployeeRepository employeeRepository,
            IDependentRepository dependentRepository)
        {
            _companyRepository = companyRepository;
            _benefitRepository = benefitRepository;
            _payrollRepository = payrollRepository;
            _employeeRepository = employeeRepository;
            _dependentRepository = dependentRepository;
        }

        public PayrollSummary? GetYearlyPayrollPreviewForCompany(int companyId)
        {
            var company = _companyRepository.Get(companyId);
            if (company == null) return null;

            var payrollSummary = new PayrollSummary();
            var benefits = _benefitRepository.Get(company.BenefitId);
            var payroll = _payrollRepository.Get(company.PayrollId);
            var employees = _employeeRepository.GetEmployeesForCompany(companyId);
            var employeeIds = employees.Select(employee => employee.Id);
            var dependentsForEmployees = _dependentRepository.GetDependentsForEmployees(employeeIds);
            payrollSummary.TotalEmployees = employees.Count();

            foreach (var employee in employees)
            {
                var totalBenefitCostForEmployee = employee.FirstName.StartsWith("A") ? benefits.CostPerEmployeePerYear * _nameStartsWithLetterADiscountAmount : benefits.CostPerEmployeePerYear;
                var dependentsForEmployee = dependentsForEmployees.Where(dependent => dependent.EmployeeId == employee.Id);
                totalBenefitCostForEmployee += dependentsForEmployee.Sum(dependent => dependent.FirstName.StartsWith("A") ? benefits.CostPerDependentPerYear * _nameStartsWithLetterADiscountAmount : benefits.CostPerDependentPerYear);

                var totalBenefitCostForEmployeePayroll = (payroll.EmployeePayPerPeriod * payroll.NumberOfPayPeriodsPerYear) - totalBenefitCostForEmployee;

                payrollSummary.TotalBenefitsCost += totalBenefitCostForEmployee;
                payrollSummary.TotalPayrollGross += payroll.EmployeePayPerPeriod * payroll.NumberOfPayPeriodsPerYear;
                payrollSummary.TotalPayrollWithBenefits += totalBenefitCostForEmployeePayroll;
            }

            return payrollSummary;
        }
    }
}
