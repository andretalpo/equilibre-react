import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Formartter from '../../../utils/Formatter';
import Typography from '@material-ui/core/Typography';
import './SimpleTable.css'

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <TableContainer title="Editable Example" component={Paper}>
        <Typography className={`${classes.title} title-align-font-weight`} color="textSecondary" gutterBottom>
            TOP 10 Compras
        </Typography>
      <Table className={classes.root} aria-label="simple table">
        <TableHead>
            <TableRow >
                <TableCell className="header-font-weight">Compra</TableCell>
                <TableCell className="header-font-weight" align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                props.data === 0 
                ? (<></>)
                :(props.data.map((row,index) => (
                    <TableRow key={`${row.name}-${index}`}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{`R$${Formartter.formatValue(row.value)}`}</TableCell>
        
                    </TableRow>
                  )))
            }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
