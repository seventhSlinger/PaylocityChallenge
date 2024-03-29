import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Employee from '../../models/Employee';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../../components/Alert/AlertDialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon  from '@mui/icons-material/Delete';

interface IEmployeeButtonGroupProps {
    employee: Employee;
    onDeletePress: (employee: Employee) => Promise<void>;
}

function EmployeeButtonGroup(props: IEmployeeButtonGroupProps) {
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const onDeleteClick = async () => {
        setOpen(false);
        setDeleting(true);
        await props.onDeletePress(props.employee);
        setDeleting(false);
    }

    return (
        <React.Fragment>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => navigate(`/company/${props.employee.companyId}/employee/${props.employee.id}`)}>
                    View
                </Button>
                <Button onClick={() => navigate(`/company/${props.employee.companyId}/employee/update/${props.employee.id}`)}>
                    Update
                </Button>
                <Button onClick={() => navigate(`/company/${props.employee.companyId}/employee/${props.employee.id}/dependent`)}>
                        Dependents
                </Button>
                <LoadingButton
                    color="error"
                    onClick={() => setOpen(true)}
                    loading={deleting}
                    loadingPosition="start"
                    startIcon={<DeleteIcon />}
                    variant="contained"
                >
                    Delete
                </LoadingButton>
            </ButtonGroup>
            <AlertDialog isVisible={open}
                onClose={() => setOpen(false)}
                onAccept={onDeleteClick} />
        </React.Fragment>
    );
}

export default EmployeeButtonGroup;