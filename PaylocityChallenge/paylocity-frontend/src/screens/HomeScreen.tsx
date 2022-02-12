import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Company } from '../models/Company';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

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
      <div className="App">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h3" component="div">
              Company Payroll
            </Typography>
            <Typography variant="h6" component="div">
              Please select a company to continue 
            </Typography>
            {loading && <CircularProgress />}
            {!loading &&
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align='right'></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companies.map((company, index) =>
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {company.companyName}
                        </TableCell>
                        <TableCell align='right'>
                            <Button>
                                <Link to={`/company/${company.id}`}>View</Link> 
                            </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            }
          </CardContent>
        </Card>
      </div>
    );
  }
  
  export default HomeScreen;