using Common.Configuration;
using Microsoft.Extensions.Options;
using Paylocity.Models.Models;

namespace Paylocity.DataAccess.Sqlite.DataAccess
{
    internal class PayrollDataAccess : BaseDataAccess<Payroll>
    {
        public PayrollDataAccess(IOptions<DatabaseConfig> config) : base("tblPayroll", config)
        { } 
    }
}
