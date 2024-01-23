import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



export default function NewGCard({name,damount}) {
  return (
    <Box sx={{ minWidth: 275 ,  width:"28vw" }}>
    <Card style={{padding:"10px"}} variant="outlined">
    <React.Fragment>
  <CardContent>
    <Typography style={{fontSize:"18px"}}  variant="h5" component="div">
    {name} is requesting for Data
    </Typography>
    
    <Typography  color="text.secondary">
     Number of Data : {damount}
    </Typography>
  </CardContent>
 
  <div style={{display:"flex" , justifyContent:"space-around"}} className="footerbutton">
      <button style={{width:"100vw" , borderRadius:"0px" , backgroundColor:"green" }} className="btn btn-primary d-none d-sm-inline-block">
          Accept
      </button>
      <button style={{width:"100vw"  , borderRadius:"0px" , backgroundColor:"red"}}  className="btn btn-primary d-none d-sm-inline-block">
          Assign Manually
      </button>
  </div>
 
  

</React.Fragment>
    </Card>
  </Box>
  );
}