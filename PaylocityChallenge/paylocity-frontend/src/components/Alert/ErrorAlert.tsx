import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

interface IErrorAlertProps {
  onClose: () => void;
  message: string;
}

function ErrorAlert(props: IErrorAlertProps) {
    return (
        <Box sx={{ position: 'absolute', top: 10,  right: 0, width: '50%' }}>
        <Collapse in={true}>
          <Alert
            severity={"error"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={props.onClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {props.message}
          </Alert>
        </Collapse>
      </Box>
    );
}

export default ErrorAlert;