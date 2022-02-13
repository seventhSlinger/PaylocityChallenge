using Paylocity.Common.Interfaces;

namespace Paylocity.API.ViewModels
{
    public class CompanyViewModel : IUniqueModel
    {
        public int Id { get; set; }
        public int BenefitId { get; set; }  
        public int PayrollId { get; set; }
        public string CompanyName { get; set;}
        public string CompanyDescription { get; set;}
    }
}
