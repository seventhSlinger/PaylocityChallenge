using Common.Configuration;
using Microsoft.Extensions.Options;
using Paylocity.Models.Models;

namespace Paylocity.DataAccess.Sqlite.DataAccess
{
    internal class CompanyDataAccess : BaseDataAccess<Company>
    {
        public CompanyDataAccess(IOptions<DatabaseConfig> config) : base("tblCompany", config)
        { } 
    }
}
