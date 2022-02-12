import { Paper } from '@mui/material';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ITableProps } from './ITableProps';

function CustomTable<TValue extends object>(props: ITableProps<TValue>) {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow component="th">
            {props.headers.map((header, index) =>
              <TableCell align={index > 0 ? 'right' : 'inherit'}>{header}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) =>
            <TableRow
              key={props.keyExtractor(row, index)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {props.columns.map((column, index) =>
                <TableCell component="th" scope="row" align={index > 0 ? 'right' : 'inherit'}>
                  {column.customRenderer && column.customRenderer(row)}
                  {!column.customRenderer && column.getValue(row)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default CustomTable;