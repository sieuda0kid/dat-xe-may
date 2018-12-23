import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import TableHeader from './TableHeader.jsx'
import TableToolBar from './TableToolBar.jsx';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Card from '../../components/Card/Card.jsx';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import tableStyle from "../../assets/jss/material-dashboard-react/components/tableStyle.jsx";
import moment from 'moment';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    page: 0,
    rowsPerPage: 10,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      var selected = this.props.tableData.map(n => n.id);
      this.setState(state => ({ selected: selected }));
      this.props.doSelectedMail(selected);
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    console.log("row id: " + id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  onSelectedChange = (id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
    console.log(newSelected);
  }

  onDeleteMail = () => {
    this.props.onDeleteMessage();
  }
  

  render() {
    const { classes,sls, tableHead, tableTitle, tableTitleSecondary, tableData, linkTo } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    
    return (
      <Card>
        <CardHeader color="success" styles={"15px"}>
          <h2 className={classes.cardTitleWhite}>{tableTitle}</h2>
        </CardHeader>
        <CardBody>
          <TableToolBar
            numSelected={selected.length}
            tableTitle={''}
            tableTitleSecondary={tableTitleSecondary}
            onDeleteMessage={() => this.onDeleteMail()}>
            <TablePagination
              className={classes.tablePagination}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage=''
              rowsPerPageOptions={[]}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
            />
          </TableToolBar>
          <div className={classes.tableResponsive}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <TableHeader
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={tableData.length}
                rows={tableHead}
                checkbox={this.props.checkbox}
              />
              <TableBody>
                {stableSort(tableData, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n[tableHead[0].id]);
                    return (
                      <TableRow
                        key={n[tableHead[0].id]}
                        onClick={() => this.props.onTableRowClick(n)}
                      >
                        {this.props.checkbox ? 
                        <TableCell padding="checkbox" >
                          <Checkbox checked={isSelected} onChange={() => this.onSelectedChange(n.id)} color='default' />
                        </TableCell>
                        : null}
                        {tableHead.map(head => {
                          return (
                            <TableCell className={classes.tableCell} padding="none" style={{ textDecoration: 'none' }} component={Link} to={linkTo + n.id}>{head.type === 'time' ? moment(n[head.id]).format('DD/MM/YYYY') : n[head.id]}</TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHead: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  tableTitle: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default withStyles(tableStyle)(connect(mapStateToProps, mapDispatchToProps)(EnhancedTable));