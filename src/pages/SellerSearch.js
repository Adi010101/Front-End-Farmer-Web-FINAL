import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, 
    Typography,
    Paper,
    Toolbar,
    Grid,
    ListItem,
    ListItemText, 
    Button,
    IconButton,
    InputBase,} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ResponsiveDrawer from '../components/Drawer';
import {useNavigate} from 'react-router-dom';
import { Image } from 'mui-image';

//ScreenSize
const drawerWidth = 240;
//Styles
const classes = {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: 20,
      textAlign: "center",
      color: "blue"
    },
    Header: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: '#5F645F',
      marginBottom: 5,
    },
    SearchButton: {
      fontFamily: 'Poppins',
      marginBottom: 5,
      backgroundColor: '#DCDCDC'
    },  
    Message: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#000000',
    }
};

function SellerSearch() {

    const [table, setTable] = useState(null);
    let customer = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('customer', JSON.stringify(customer))

    
    async function search(key) {
        console.warn(key)
        let result = await fetch("http://localhost:8000/api/search/"+key);
        console.log(result);
        result = await result.json();
 
        var productList = result.map((item, index) => {
            return(
                <Grid item xs={4} key={ index}>
                    <Paper style={classes.paper}>
                        <ListItem sx={classes.positionImage}>
                            <Image sx={classes.productImg} duration={0} src={`http://localhost:8000/${item.image}`}/>
                        </ListItem>
                        <ListItem>
                        <ListItemText primaryTypographyProps={classes.ProductTitle} 
                        secondaryTypographyProps={classes.QuantityTitle}
                        primary={item.name} secondary={item.price}/>
                        <Typography sx={classes.ProductTitle}>
                            {item.seller_name}</Typography>
                        </ListItem>
                        <ListItem sx={classes.positionButton}>
                            <Button variant="contained" onClick={() => navigate(`/products/edit/${item.id}`,{state:item})} sx={classes.EditButton}>EDIT</Button>
                        </ListItem>
                    </Paper>
                </Grid>
            );
        });
        setTable(productList)

    }
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer/>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
        <Toolbar />
        <Typography variant='h3' sx={classes.Header}>
          My Products
        </Typography>
        <Box>
          <Paper component="form" elevation={1} sx={classes.SearchButton}>
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              onChange={(e)=>search(e.target.value)}
              sx={{ ml: 1, flex: 1, fontFamily: 'Poppins', }}
              placeholder="Search product"
              inputProps={{ 'aria-label': 'Search' }}
            />
          </Paper>
          <div style={classes.root}>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                        {/*Render the InnerGrid as a child item */}
                        {table}
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </Box>
    </Box>
    )
}

export default SellerSearch;