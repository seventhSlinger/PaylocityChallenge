import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Employee from '../../models/Employee';
import { Link } from 'react-router-dom';

interface IEmployeeButtonGroupProps {
    employee: Employee;
}

function EmployeeButtonGroup(props: IEmployeeButtonGroupProps) {   
    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>
            <Link style={{ color: 'white'}} to={`/company/${props.employee.companyId}/employee/${props.employee.id}`}>
                View
            </Link>
        </Button>
        <Button>
            <Link style={{ color: 'white'}} to={`/company/${props.employee.companyId}/employee/update/${props.employee.id}`}>
                Update
            </Link>
        </Button>
      </ButtonGroup>
    );
}

export default EmployeeButtonGroup;