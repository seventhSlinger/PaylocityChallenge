import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Company from "../../models/Company";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Benefit from "../../models/Benefit";
import Payroll from "../../models/Payroll";
import { CircularProgress } from "@mui/material";
import Employee from "../../models/Employee";
import CustomTable from "../../components/Table/CustomTable";
import EmployeeButtonGroup from "./EmployeeButtonGroup";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import PayrollSummary from "../../models/PayrollSummary";
import ErrorAlert from "../../components/Alert/ErrorAlert";
import BackButton from "../../components/BackButton/BackButton";

function CompanyScreen() {
  const [company, setCompany] = useState<Company | undefined>();
  const [benefit, setBenefit] = useState<Benefit | undefined>();
  const [payroll, setPayroll] = useState<Payroll | undefined>();
  const [payrollSummary, setPayrollSummary] = useState<PayrollSummary>();
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [loading, setLoading] = useState(true);
  const [payrollSummaryLoading, setPayrollSummaryLoading] = useState(true);
  const [deleteErrorAlertVisible, setDeleteErrorAlertVisible] = useState(false);
  const [deleteErrorMessage, setDeleteErrorAlertMessage] = useState('');
  const params = useParams();
  const navigate = useNavigate();

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
      const employeesFetch = fetch(`/employee/company/${company.id}`);
      const payrollSummaryFetch = fetch(`/company/${company.id}/payroll`);
      const promises = await Promise.all([benefitsFetch, payrollFetch, employeesFetch]);
      const benefit = await promises[0].json() as Benefit;
      const payroll = await promises[1].json() as Payroll;
      const employees = await promises[2].json() as Array<Employee>;

      setLoading(false);
      setBenefit(benefit);
      setPayroll(payroll);
      setEmployees(employees);

      const payrollSummary = await payrollSummaryFetch;
      setPayrollSummary(await payrollSummary.json() as PayrollSummary);
      setPayrollSummaryLoading(false);
    }

    fetchData()
      .catch(error => console.error(`ERROR: ${error}`));
  }, []);

  const onDeletePress = async (employee: Employee) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    } as RequestInit;
    const url = `/employee/${employee?.id}`
    const response = await fetch(url, options);
    if (response.status !== 204) {
      const responseText = await response.json();
      setDeleteErrorAlertMessage(responseText.message);
      setDeleteErrorAlertVisible(true);

      return;
    }

    setPayrollSummaryLoading(true);
    const employeesFetch = await fetch(`/employee/company/${company?.id}`);
    const payrollSummaryFetch = fetch(`/company/${company?.id}/payroll`);

    const employees = await employeesFetch.json() as Array<Employee>;
    setEmployees(employees);

    const payrollSummary = await payrollSummaryFetch;
    setPayrollSummary(await payrollSummary.json() as PayrollSummary);
    setPayrollSummaryLoading(false);
  }

  return (
    <Container maxWidth="xl">
      {deleteErrorAlertVisible && <ErrorAlert message={deleteErrorMessage} onClose={() => setDeleteErrorAlertVisible(false)} />}
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
          <Grid item xl={12}>
            {!loading &&
              <CustomTable
                headers={['First Name', 'Last Name', '']}
                data={employees}
                keyExtractor={(value: Employee, index: number) => value.id?.toString() ?? index.toString()}
                columns={[
                  {
                    getValue: (value: Employee) => value.firstName,
                  },
                  {
                    getValue: (value: Employee) => value.lastName,
                  },
                  {
                    getValue: (value: Employee) => 'Value',
                    customRenderer: (value: Employee) => <EmployeeButtonGroup employee={value} onDeletePress={onDeletePress}/>,
                  }
                ]}
                footerRenderer={() => (
                  <Button variant="contained" sx={{mt: 1.5, mb: 1.5, ml: 1.5}} onClick={() => navigate(`/company/${company?.id}/employee/create`)}>
                      Create
                  </Button>)}
              />
            }
          </Grid>
          <Grid item xl={12}>
            {!payrollSummaryLoading && <Card>
              <CardHeader title={'Payroll and Benefits Summary'}>
              </CardHeader>
              <CardContent sx={{ bgColor: 'gray' }}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Total Employees
                </Typography>
                <Typography sx={{mb: 1.5}} variant="body2">
                  {payrollSummary?.totalEmployees}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Total Payroll Gross
                </Typography>
                <Typography sx={{mb: 1.5}} variant="body2">
                {`$${payrollSummary?.totalPayrollGross}`}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Total Benefits Cost Gross
                </Typography>
                <Typography sx={{mb: 1.5}} variant="body2">
                {`$${payrollSummary?.totalBenefitsCost}`}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Total Payroll with Benefits Gross
                </Typography>
                <Typography variant="body2">
                  {`$${payrollSummary?.totalPayrollWithBenefits}`}
                </Typography>
              </CardContent>
            </Card>}
          </Grid>
        </Grid>
        <BackButton link={'/'} />
      </Box>
    </Container>
  );
}

export default CompanyScreen;
