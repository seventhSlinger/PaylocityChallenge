using Common.Configuration;
using Microsoft.Extensions.Options;
using Paylocity.Models.Models;

namespace Paylocity.DataAccess.Sqlite.DataAccess
{
    internal class BenefitDataAccess : BaseDataAccess<Benefit>
    {
        public BenefitDataAccess(IOptions<DatabaseConfig> config) : base("tblBenefit", config)
        { } 
    }
}
