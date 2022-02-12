import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Company from "../models/Company";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Benefit from "../models/Benefit";
import Payroll from "../models/Payroll";
import CardActions from '@mui/material/CardActions';
import { CircularProgress } from "@mui/material";

function CompanyScreen() {
  const [company, setCompany] = useState<Company | undefined>();
  const [benefit, setBenefit] = useState<Benefit | undefined>();
  const [payroll, setPayroll] = useState<Payroll | undefined>();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    const fetchData = async () => {
      const companiesFetch = await fetch(`/company/${params.id}`);
      const company = await companiesFetch.json() as Company;
      setCompany(company);

      const benefitsFetch = fetch(`/benefit/${company.benefitId}`);
      const payrollFetch = fetch(`/payroll/${company.payrollId}`);
      const promises = await Promise.all([benefitsFetch, payrollFetch]);
      const benefit = await promises[0].json() as Benefit;
      const payroll = await promises[1].json() as Payroll;
      setLoading(false);
      setBenefit(benefit);
      setPayroll(payroll);
    }

    fetchData()
      .catch(error => console.error(`ERROR: ${error}`));
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, height: '100vh' }}>
        <Grid container justifyContent={'center'} spacing={4}>
          <Grid item xl={12}>
            <Card>
              <CardHeader title={company?.companyName}>
              </CardHeader>
              <CardContent sx={{ bgColor: 'gray' }}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {company?.companyDescription}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            {loading && <CircularProgress color={'warning'}/>}
            {!loading && <Card>
              <CardHeader title={'Benefits'}>
              </CardHeader>
              <CardContent sx={{ bgColor: 'gray' }}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Cost per Employee per Year
                </Typography>
                <Typography variant="body2">
                  {`$${benefit?.costPerEmployeePerYear}`}
                </Typography>
                <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text.secondary">
                  Cost per Dependent per Year
                </Typography>
                <Typography variant="body2">
                  {`$${benefit?.costPerDependentPerYear}`}
                </Typography>
              </CardContent>
            </Card>}
          </Grid>
          <Grid item xs={6}>
            {!loading && <Card>
              <CardHeader title={'Payroll'}>
              </CardHeader>
              <CardContent sx={{ bgColor: 'gray' }}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Employee Pay per Period
                </Typography>
                <Typography variant="body2">
                  {`$${payroll?.employeePayPerPeriod}`}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Number of Pay Periods per Year
                </Typography>
                <Typography variant="body2">
                  {payroll?.numberOfPayPeriodsPerYear}
                </Typography>
              </CardContent>
            </Card>}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default CompanyScreen;