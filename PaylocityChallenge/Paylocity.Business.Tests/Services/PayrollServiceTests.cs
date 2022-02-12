using Moq;
using NUnit.Framework;
using Paylocity.Business.Services;
using Paylocity.Models.Models;
using Paylocity.Repository.Interfaces;
using System.Collections.Generic;

namespace Paylocity.Business.Tests.Services
{
    public static class PayrollServiceTests
    {
        internal static PayrollService GetServiceForTesting(IRepository<Company>? companyRepository = null,
            IRepository<Benefit>? benefitRepository = null,
            IRepository<Payroll>? payrollRepository = null,
            IEmployeeRepository? employeeRepository = null,
            IDependentRepository? dependentRepository = null
            )
            => new PayrollService(companyRepository ?? Mock.Of<IRepository<Company>>(),
                benefitRepository ?? Mock.Of<IRepository<Benefit>>(),
                payrollRepository ?? Mock.Of<IRepository<Payroll>>(),
                employeeRepository ?? Mock.Of<IEmployeeRepository>(),
                dependentRepository ?? Mock.Of<IDependentRepository>());

        [TestFixture]
        public class When_getting_the_yearly_payroll_preview
        {
            [Test]
            public void Then_should_return_null_if_company_is_not_found()
            {
                //Arrange
                var companyRepository = Mock.Of<IRepository<Company>>();
                Mock.Get(companyRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns<Company?>(null);

                var service = GetServiceForTesting(companyRepository: companyRepository);

                //Act
                var result = service.GetYearlyPayrollPreviewForCompany(0);

                //Assert
                Assert.IsNull(result);
            }

            [Test]
            public void Then_should_return_successfully_if_no_employees_are_found()
            {
                //Arrange
                var company = Mock.Of<Company>();
                var companyRepository = Mock.Of<IRepository<Company>>();
                Mock.Get(companyRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns(company);

                var benefit = Mock.Of<Benefit>(benefit => benefit.CostPerEmployeePerYear == 1000m && benefit.CostPerDependentPerYear == 500m);
                var benefitRepository = Mock.Of<IRepository<Benefit>>();
                Mock.Get(benefitRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns(benefit);

                var payroll = Mock.Of<Payroll>(payroll => payroll.NumberOfPayPeriodsPerYear == 2 && payroll.EmployeePayPerPeriod == 2000);
                var payrollRepository = Mock.Of<IRepository<Payroll>>();
                Mock.Get(payrollRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns(payroll);

                var employees = new List<Employee>();
                var employeeRepository = Mock.Of<IEmployeeRepository>();
                Mock.Get(employeeRepository)
                    .Setup(repo => repo.GetEmployeesForCompany(It.IsAny<int>()))
                    .Returns(employees);
                
                var dependents = new List<Dependent>();
                var dependentRepository = Mock.Of<IDependentRepository>();
                Mock.Get(dependentRepository)
                    .Setup(repo => repo.GetDependentsForEmployees(It.IsAny<IEnumerable<int>>()))
                    .Returns(dependents);

                var service = GetServiceForTesting(companyRepository: companyRepository, benefitRepository: benefitRepository,
                    payrollRepository: payrollRepository, employeeRepository: employeeRepository, dependentRepository: dependentRepository);

                //Act
                var result = service.GetYearlyPayrollPreviewForCompany(0);

                //Assert
                Assert.AreEqual(result?.TotalEmployees, 0);
            }

            [Test]
            public void Then_should_successfully_calculate_payroll_numbers()
            {
                //Arrange
                var company = Mock.Of<Company>();
                var companyRepository = Mock.Of<IRepository<Company>>();
                Mock.Get(companyRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns(company);

                var benefit = Mock.Of<Benefit>(benefit => benefit.CostPerEmployeePerYear == 1000m && benefit.CostPerDependentPerYear == 500m);
                var benefitRepository = Mock.Of<IRepository<Benefit>>();
                Mock.Get(benefitRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns(benefit);

                var payroll = Mock.Of<Payroll>(payroll => payroll.NumberOfPayPeriodsPerYear == 2 && payroll.EmployeePayPerPeriod == 2000);
                var payrollRepository = Mock.Of<IRepository<Payroll>>();
                Mock.Get(payrollRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns(payroll);

                var employees = new List<Employee>()
                {
                    Mock.Of<Employee>(employee => employee.Id == 1 && employee.FirstName == "FName1"),                    
                    Mock.Of<Employee>(employee => employee.Id == 2 && employee.FirstName == "FName2"),
                    Mock.Of<Employee>(employee => employee.Id == 3 && employee.FirstName == "FName3")

                };
                var employeeRepository = Mock.Of<IEmployeeRepository>();
                Mock.Get(employeeRepository)
                    .Setup(repo => repo.GetEmployeesForCompany(It.IsAny<int>()))
                    .Returns(employees);

                var dependents = new List<Dependent>()
                {
                    Mock.Of<Dependent>(dependent => dependent.EmployeeId == 1 && dependent.FirstName == "FName1"),
                    Mock.Of<Dependent>(dependent => dependent.EmployeeId == 1 && dependent.FirstName == "FName2"),
                    Mock.Of<Dependent>(dependent => dependent.EmployeeId == 2 && dependent.FirstName == "FName3"),
                    Mock.Of<Dependent>(dependent => dependent.EmployeeId == 3 && dependent.FirstName == "FName4")
                };

                var dependentRepository = Mock.Of<IDependentRepository>();
                Mock.Get(dependentRepository)
                    .Setup(repo => repo.GetDependentsForEmployees(It.IsAny<IEnumerable<int>>()))
                    .Returns(dependents);

                var service = GetServiceForTesting(companyRepository: companyRepository, benefitRepository: benefitRepository,
                    payrollRepository: payrollRepository, employeeRepository: employeeRepository, dependentRepository: dependentRepository);

                //Act
                var result = service.GetYearlyPayrollPreviewForCompany(0);

                //Assert
                Assert.IsNotNull(result);
                Assert.AreEqual(result.TotalEmployees, 3);
                Assert.AreEqual(result.TotalPayrollGross, 12000m);
                Assert.AreEqual(result.TotalBenefitsCost, 5000m);
                Assert.AreEqual(result.TotalPayrollWithBenefits, 7000m);
            }

            [Test]
            public void Then_should_successfully_calculate_payroll_numbers_with_no_dependents()
            {
                //Arrange
                var company = Mock.Of<Company>();
                var companyRepository = Mock.Of<IRepository<Company>>();
                Mock.Get(companyRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns(company);

                var benefit = Mock.Of<Benefit>(benefit => benefit.CostPerEmployeePerYear == 1000m && benefit.CostPerDependentPerYear == 500m);
                var benefitRepository = Mock.Of<IRepository<Benefit>>();
                Mock.Get(benefitRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns(benefit);

                var payroll = Mock.Of<Payroll>(payroll => payroll.NumberOfPayPeriodsPerYear == 2 && payroll.EmployeePayPerPeriod == 2000);
                var payrollRepository = Mock.Of<IRepository<Payroll>>();
                Mock.Get(payrollRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns(payroll);

                var employees = new List<Employee>()
                {
                    Mock.Of<Employee>(employee => employee.Id == 1 && employee.FirstName == "FName1"),
                    Mock.Of<Employee>(employee => employee.Id == 2 && employee.FirstName == "FName2"),
                    Mock.Of<Employee>(employee => employee.Id == 3 && employee.FirstName == "FName3")

                };
                var employeeRepository = Mock.Of<IEmployeeRepository>();
                Mock.Get(employeeRepository)
                    .Setup(repo => repo.GetEmployeesForCompany(It.IsAny<int>()))
                    .Returns(employees);

                var dependents = new List<Dependent>();
                var dependentRepository = Mock.Of<IDependentRepository>();
                Mock.Get(dependentRepository)
                    .Setup(repo => repo.GetDependentsForEmployees(It.IsAny<IEnumerable<int>>()))
                    .Returns(dependents);

                var service = GetServiceForTesting(companyRepository: companyRepository, benefitRepository: benefitRepository,
                    payrollRepository: payrollRepository, employeeRepository: employeeRepository, dependentRepository: dependentRepository);

                //Act
                var result = service.GetYearlyPayrollPreviewForCompany(0);

                //Assert
                Assert.IsNotNull(result);
                Assert.AreEqual(result.TotalEmployees, 3);
                Assert.AreEqual(result.TotalPayrollGross, 12000m);
                Assert.AreEqual(result.TotalBenefitsCost, 3000m);
                Assert.AreEqual(result.TotalPayrollWithBenefits, 9000m);
            }

            [Test]
            public void Then_should_successfully_calculate_payroll_numbers_with_discount()
            {
                //Arrange
                var company = Mock.Of<Company>();
                var companyRepository = Mock.Of<IRepository<Company>>();
                Mock.Get(companyRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns(company);

                var benefit = Mock.Of<Benefit>(benefit => benefit.CostPerEmployeePerYear == 1000m && benefit.CostPerDependentPerYear == 500m);
                var benefitRepository = Mock.Of<IRepository<Benefit>>();
                Mock.Get(benefitRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns(benefit);

                var payroll = Mock.Of<Payroll>(payroll => payroll.NumberOfPayPeriodsPerYear == 2 && payroll.EmployeePayPerPeriod == 2000);
                var payrollRepository = Mock.Of<IRepository<Payroll>>();
                Mock.Get(payrollRepository)
                    .Setup(repo => repo.Get(It.IsAny<int>()))
                    .Returns(payroll);

                var employees = new List<Employee>()
                {
                    Mock.Of<Employee>(employee => employee.Id == 1 && employee.FirstName == "AFName1"),
                    Mock.Of<Employee>(employee => employee.Id == 2 && employee.FirstName == "FName2"),
                    Mock.Of<Employee>(employee => employee.Id == 3 && employee.FirstName == "FName3")

                };
                var employeeRepository = Mock.Of<IEmployeeRepository>();
                Mock.Get(employeeRepository)
                    .Setup(repo => repo.GetEmployeesForCompany(It.IsAny<int>()))
                    .Returns(employees);

                var dependents = new List<Dependent>()
                {
                    Mock.Of<Dependent>(dependent => dependent.EmployeeId == 1 && dependent.FirstName == "FName1"),
                    Mock.Of<Dependent>(dependent => dependent.EmployeeId == 1 && dependent.FirstName == "A-FName2"),
                    Mock.Of<Dependent>(dependent => dependent.EmployeeId == 2 && dependent.FirstName == "FName3"),
                    Mock.Of<Dependent>(dependent => dependent.EmployeeId == 3 && dependent.FirstName == "A-FName4")
                };

                var dependentRepository = Mock.Of<IDependentRepository>();
                Mock.Get(dependentRepository)
                    .Setup(repo => repo.GetDependentsForEmployees(It.IsAny<IEnumerable<int>>()))
                    .Returns(dependents);

                var service = GetServiceForTesting(companyRepository: companyRepository, benefitRepository: benefitRepository,
                    payrollRepository: payrollRepository, employeeRepository: employeeRepository, dependentRepository: dependentRepository);

                //Act
                var result = service.GetYearlyPayrollPreviewForCompany(0);

                //Assert
                Assert.IsNotNull(result);
                Assert.AreEqual(result.TotalEmployees, 3);
                Assert.AreEqual(result.TotalPayrollGross, 12000m);
                Assert.AreEqual(result.TotalBenefitsCost, 4800m);
                Assert.AreEqual(result.TotalPayrollWithBenefits, 7200m);
            }
        }
    }
}
