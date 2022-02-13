import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dependent from '../../models/Dependent';
import CustomTable from "../../components/Table/CustomTable";
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import DependentButtonGroup from './DependentButtonGroup';
import BackButton from '../../components/BackButton/BackButton';

function DependentScreen() {
    const [dependents, setDependents] = useState<Array<Dependent>>([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const dependentsFetch = await fetch(`/dependent/employee/${params.employeeId}`);
            const dependents = await dependentsFetch.json() as Array<Dependent>;
            setDependents(dependents);
            setLoading(false);
        }

        fetchData()
            .catch(error => console.error(`ERROR: ${error}`));
    }, []);

    const onDeletePress = async (dependent: Dependent) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        } as RequestInit;
        const url = `/dependent/${dependent?.id}`
        await fetch(url, options);
        const dependentsFetch = await fetch(`/dependent/employee/${params.employeeId}`);
        const dependents = await dependentsFetch.json() as Array<Dependent>;
        setDependents(dependents);
    }

    const renderFooter = () => (
        <React.Fragment>
            <Button variant="contained" 
                sx={{ mt: 1.5, mb: 1.5, ml: 1.5 }}
                onClick={() => navigate(`/company/${params.companyId}/employee/${params.employeeId}/dependent/create`)}
                >
                Create
            </Button>
        </React.Fragment>
    );

    return (
        <Container maxWidth="xl">
             <Box sx={{ mb: 2, backgroundColor: 'white', flexGrow: 1, height: '5vh' }}>
             <Typography variant="h3">
                  Dependents
                </Typography>
             </Box>
            <Box sx={{ flexGrow: 1, height: '100vh' }}>
                {!loading &&
                    <CustomTable
                        headers={['First Name', 'Last Name', 'Is Spouse', '']}
                        data={dependents}
                        keyExtractor={(value: Dependent, index: number) => value.id?.toString() ?? index.toString()}
                        columns={[
                            {
                                getValue: (value: Dependent) => value.firstName,
                            },
                            {
                                getValue: (value: Dependent) => value.lastName,
                            },
                            {
                                getValue: (value: Dependent) => value.isSpouse ? 'Yes' : 'No',
                            },
                            {
                                getValue: (value: Dependent) => 'Value',
                                customRenderer: (value: Dependent) => <DependentButtonGroup companyId={params.companyId || ''} dependent={value} onDeletePress={onDeletePress} />,
                            }
                        ]}
                        footerRenderer={() => renderFooter()}
                    />
                }             
                <BackButton link={`/company/${params.companyId}`} />
            </Box>
        </Container>
    );
}

export default DependentScreen;