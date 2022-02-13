import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Employee from '../../models/Employee';
import { useEffect, useState } from 'react';
import { CircularProgress } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import BackButton from '../../components/BackButton/BackButton';

interface IEmployeeScreenProps {
    mode: 'read' | 'create' | 'update';
}

function EmployeeScreen(props: IEmployeeScreenProps) {
    const params = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<Employee | undefined>();
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [firstNameErrors, setFirstNameErrors] = useState<boolean>(false);
    const [lastNameErrors, setLastNameErrors] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const employeeFetch = await fetch(`/employee/${params.id}`);
            const employee = await employeeFetch.json() as Employee;
            setEmployee(employee);
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setLoading(false);
        }

        if (props.mode !== 'create') {
            fetchData()
                .catch(error => console.error(`ERROR: ${error}`));
        } else {
            setLoading(false);
        }
    }, []);

    const handleClick = async () => {
        if (!firstName)
            setFirstNameErrors(true);
        if (!lastName) 
            setLastNameErrors(true);      
        if (!firstName || !lastName) 
            return;

        setSending(true);
        const body = {
            id: props.mode == 'update' ? employee?.id : 0,
            firstName: firstName,
            lastName: lastName,
            companyId: params.companyId,
        };
        const options = {
            method: props.mode == 'create' ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        } as RequestInit;
        const url = props.mode == 'create' ? `/employee` : `/employee/${employee?.id}`
        const response = await fetch(url, options);       
        navigate(`/company/${params.companyId}`);
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ flexGrow: 1, height: '100vh' }}>
                <Card>
                    <CardHeader title='Employee' />
                    {loading && <CircularProgress />}
                    {!loading && <CardContent>
                        <Box sx={{ mb: 1.5 }}>
                            <FormControl fullWidth>
                                <TextField id="firstName" 
                                    error={firstNameErrors}
                                    onChange={(props) => {
                                        setFirstName(props.target.value);
                                        setFirstNameErrors(false);
                                    }}
                                    defaultValue={employee?.firstName}
                                    value={firstName}
                                    label="First Name" 
                                    variant="outlined"
                                    required
                                    InputProps={{
                                        readOnly: props.mode == 'read',
                                    }} />
                            </FormControl>
                        </Box>
                        <Box sx={{ mb: 1.5 }}>
                            <FormControl fullWidth>
                                <TextField id="lastName" 
                                    required
                                    error={lastNameErrors}
                                    defaultValue={employee?.lastName} 
                                    onChange={(props) => {
                                        setLastName(props.target.value)
                                        setLastNameErrors(false);
                                    }}
                                    label="Last Name" 
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: props.mode == 'read',
                                    }} />
                            </FormControl>
                        </Box>
                    </CardContent>}
                    {props.mode !== 'read' && <FormControl sx={{ float: 'right', m: 1.5 }}>
                        <LoadingButton
                            color="secondary"
                            onClick={handleClick}
                            loading={sending}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            Save
                        </LoadingButton>
                    </FormControl>}
                </Card>
                <BackButton link={`/company/${params.companyId}`} />
            </Box>
        </Container>
    );
}

export default EmployeeScreen;