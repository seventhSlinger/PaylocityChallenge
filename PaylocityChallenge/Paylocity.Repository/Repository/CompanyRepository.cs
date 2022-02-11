using Paylocity.DataAccess.Sqlite.Interfaces;
using Paylocity.Models.Models;

namespace Paylocity.Repository.Repository
{
    internal class CompanyRepository : BaseRepository<Company>
    {
        public CompanyRepository(IDataAccess<Company> dataAccess) : base(dataAccess)
        {}
    }
}
