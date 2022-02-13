import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

interface IBackButtonProps {
    link: string;
}

function BackButton(props: IBackButtonProps) {
    const navigate = useNavigate();
    const onNavigate = () => navigate(props.link);

    return (
        <Button variant='contained' sx={{ mt: 1.5, float: 'right' }} onClick={onNavigate}>
            Back
        </Button>
    );
}

export default BackButton;
