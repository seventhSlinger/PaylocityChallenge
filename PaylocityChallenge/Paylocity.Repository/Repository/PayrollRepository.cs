using Paylocity.DataAccess.Sqlite.Interfaces;
using Paylocity.Models.Models;

namespace Paylocity.Repository.Repository
{
    internal class PayrollRepository : BaseRepository<Payroll>
    {
        public PayrollRepository(IDataAccess<Payroll> dataAccess) : base(dataAccess)
        {}
    }
}
