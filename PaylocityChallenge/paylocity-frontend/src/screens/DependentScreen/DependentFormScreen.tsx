import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Dependent from '../../models/Dependent';
import { useEffect, useState } from 'react';
import { CircularProgress } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface IDependentScreenProps {
    mode: 'read' | 'create' | 'update';
}

function DependentFormScreen(props: IDependentScreenProps) {
    const params = useParams();
    const navigate = useNavigate();
    const [dependent, setDependent] = useState<Dependent | undefined>();
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [isSpouse, setSpouse] = useState<boolean>();
    const [firstNameErrors, setFirstNameErrors] = useState<boolean>(false);
    const [lastNameErrors, setLastNameErrors] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const dependentFetch = await fetch(`/dependent/${params.id}`);
            const dependent = await dependentFetch.json() as Dependent;
            setDependent(dependent);
            setFirstName(dependent.firstName);
            setLastName(dependent.lastName);
            setSpouse(dependent.isSpouse);
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
            id: props.mode == 'update' ? dependent?.id : 0,
            employeeId: params.employeeId,
            firstName: firstName,
            lastName: lastName,
            isSpouse: isSpouse,
        };
        const options = {
            method: props.mode == 'create' ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        } as RequestInit;
        const url = props.mode == 'create' ? `/dependent` : `/dependent/${dependent?.id}`
        const response = await fetch(url, options);
        navigate(`/company/${params.companyId}/`);
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ flexGrow: 1, height: '100vh' }}>
                <Card>
                    <CardHeader title='Dependent' />
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
                                    defaultValue={dependent?.firstName}
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
                                    defaultValue={dependent?.lastName}
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
                        <Box sx={{ mb: 1.5 }}>
                            <FormControl fullWidth>
                                <FormControlLabel disabled={props.mode == 'read'}
                                    control={<Checkbox checked={isSpouse} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSpouse(event.target.checked)}
                                    />}
                                    label="Is Spouse?" />
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

            </Box>
        </Container>
    );
}

export default DependentFormScreen;