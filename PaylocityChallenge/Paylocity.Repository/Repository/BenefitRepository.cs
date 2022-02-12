using Paylocity.DataAccess.Sqlite.Interfaces;
using Paylocity.Models.Models;

namespace Paylocity.Repository.Repository
{
    internal class BenefitRepository : BaseRepository<Benefit>
    {
        public BenefitRepository(IDataAccess<Benefit> dataAccess) : base(dataAccess)
        {}
    }
}
