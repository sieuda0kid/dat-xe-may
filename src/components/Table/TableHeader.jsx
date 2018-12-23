import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle.jsx";
import { withStyles } from '@material-ui/core/styles';

const tableHeaderColor = "gray";

class TableHeader extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, rows } = this.props;

    return (
      <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
        <TableRow>
        {this.props.checkbox ? 
          <TableCell padding="checkbox" className={classes.tableCell + " " + classes.tableHeadCell}>
            <Checkbox
              color='default'
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          : null }
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={false}
                padding={'none'}
                sortDirection={orderBy === row.id ? order : false}
                className={classes.tableCell + " " + classes.tableHeadCell}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={this.createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
} 

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  rows: PropTypes.array.isRequired
};

export default withStyles(tableStyle)(TableHeader);