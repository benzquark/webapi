import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import axios from "axios";


const styles = theme =>({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})
const data = [
  {
    name: 'Page A',
    ยืนยันติดเชื้อ: 4000,
    ยืนยันเสียชีวิต: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    ยืนยันติดเชื้อ: 3000,
    ยืนยันเสียชีวิต: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    ยืนยันติดเชื้อ: 2000,
    ยืนยันเสียชีวิต: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    ยืนยันติดเชื้อ: 2780,
    ยืนยันเสียชีวิต: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    ยืนยันติดเชื้อ: 1890,
    ยืนยันเสียชีวิต: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    ยืนยันติดเชื้อ: 2390,
    ยืนยันเสียชีวิต: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    ยืนยันติดเชื้อ: 3490,
    ยืนยันเสียชีวิต: 4300,
    amt: 2100,
  },
];

class App extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      data_test:{
        confirmed: '',
        hospitalized: '',
        deaths: '',
        recovered: ''
      }
    }
  }
  componentDidMount(){
    this.callAPI();
  }

  callAPI(){
    axios.get('https://covid19.th-stat.com/json/covid19v2/getTimeline.json')
    .then(response => {
      console.log(response.data);
      const data = response.data['Thailand'];
      const lastdata = data.slice(-1)[0];

      this.setState({
        data_text: {
          confirmed: lastdata['confirmed'],
          hospitalized: lastdata[''],
          deaths: lastdata['deaths'],
          recovered: lastdata['recovered']
        }
      })
    })
  }

  render() {
    const { classes } = this.props;
    const { data_text } = this.state;
    return ( 
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">            
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Covid19 Status
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <Typography>Confirmed</Typography>
            <Typography variant="h3">{data_text.confirmed}</Typography>
            <Typography variant="h5">1000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <Typography>Hospitalized</Typography>
            <Typography variant="h3">1000</Typography>
            <Typography variant="h5">1000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <Typography>Recovered</Typography>
            <Typography variant="h3">1000</Typography>
            <Typography variant="h5">1000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <Typography>Death</Typography>
            <Typography variant="h3">1000</Typography>
            <Typography variant="h5">1000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ยืนยันติดเชื้อ" fill="#FFC300" />
                <Bar dataKey="ยืนยันเสียชีวิต" fill="#F11B1B" />
              </BarChart>
            </ResponsiveContainer>

          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            
          </Paper>
        </Grid>
      </Grid>
      </Container>
    </div>
    )
  }
}
export default withStyles(styles)(App);