import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';
import AlertDialog from '../../components/Alert/AlertDialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dependent from '../../models/Dependent';

interface IDependentButtonGroupProps {
    dependent: Dependent;
    companyId: string;
    onDeletePress: (dependent: Dependent) => Promise<void>;
}

function DependentButtonGroup(props: IDependentButtonGroupProps) {
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const onDeleteClick = async () => {
        setOpen(false);
        setDeleting(true);
        await props.onDeletePress(props.dependent);
        setDeleting(false);
    }

    return (
        <React.Fragment>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>
                    <Link style={{ color: 'white' }} to={`/company/${props.companyId}/employee/${props.dependent.employeeId}/dependent/${props.dependent.id}`}>
                        View
                    </Link>
                </Button>
                <Button>
                    <Link style={{ color: 'white' }} to={`/company/${props.companyId}/employee/${props.dependent.employeeId}/dependent/update/${props.dependent.id}`}>
                        Update
                    </Link>
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

export default DependentButtonGroup;