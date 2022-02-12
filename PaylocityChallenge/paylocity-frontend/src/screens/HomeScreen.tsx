import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Company from '../models/Company';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import CustomTable from '../components/Table/CustomTable';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function HomeScreen() {
  const [companies, setCompanies] = useState<Array<Company>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companiesFetch = await fetch('/company');
      setLoading(false);
      const companies = await companiesFetch.json() as Array<Company>;
      setCompanies(companies);
    }
    fetchCompanies()
      .catch(error => console.error(`ERROR: ${error}`));
  }, []);

  return (
    <Container maxWidth="xl">
       <Box sx={{ flexGrow: 1, height: '100vh' }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h3" component="div">
            Company Payroll
          </Typography>
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            Please select a company to continue
          </Typography>
          {loading && <CircularProgress />}
          {!loading &&
            <CustomTable
              headers={['Name', '']}
              data={companies}
              keyExtractor={(value: Company, index: number) => value.id?.toString() ?? index.toString()}
              columns={[
                {
                  getValue: (company: Company) => company.companyName,
                },
                {
                  getValue: (company: Company) => 'Value',
                  customRenderer: (value: Company) => (<Button>
                    <Link to={`/company/${value.id}`}>View</Link>
                  </Button>),
                }
              ]}
            />
          }
        </CardContent>
      </Card>
      </Box>
      </Container>
  );
}

export default HomeScreen;