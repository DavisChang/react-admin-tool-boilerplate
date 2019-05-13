import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import './App.css';

const mapStateToProps = state => ({
  ping: state.pingReducer,
})

const actionPing = () => ({ type: 'PING' });
const mapDispatchToProps = dispatch => ({
  actionPing: () => dispatch(actionPing()),
})

const data = [{
  name: 'Tanner Linsley',
  age: 26,
  friend: {
    name: 'Jason Maurer',
    age: 23,
  },
}];
const columns = [{
    Header: 'Name',
    accessor: 'name',
  }, {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className='number'>{props.value}</span>,
  }, {
    id: 'friendName',
    Header: 'Friend Name',
    accessor: d => d.friend.name,
  }, {
    Header: props => <span>Friend Age</span>,
    accessor: 'friend.age'
  }];

let Landing = ({ ping, actionPing, ...rest }) => {
  return (
    <div>
      <h2>Landing</h2>
      {`ping: ${ping.isPinging}`}
      <div>
        <Button variant="contained" onClick={actionPing}>Start PING</Button>
      </div>
    </div>
  );
}

Landing = connect(mapStateToProps, mapDispatchToProps)(Landing);

function Icon() {
  return (
    <div>
      <h2>Icon</h2>
      <Badge badgeContent={99} color="primary">
        <MailIcon />
      </Badge>
    </div>
  );
}

function Table() {
  return (
    <div>
      <h2>ReactTable</h2>
      <ReactTable
        data={data}
        columns={columns}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <React.Fragment>
        <CssBaseline />
        <div>
          <ul>
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/table">Table</Link>
            </li>
            <li>
              <Link to="/icon">Icon</Link>
            </li>
          </ul>
        </div>
        <Route exact path="/" component={Landing} />
        <Route path="/table" component={Table} />
        <Route path="/icon" component={Icon} />
      </React.Fragment>
    </Router>
  );
}

export default App;
