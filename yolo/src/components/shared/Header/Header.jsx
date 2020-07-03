import React, { useState, useEffect } from 'react';
import {
    AppBar, Toolbar,
    Typography, CssBaseline, Select,
    Link, Button, makeStyles, TextField, Icon, Popper, Fade,
    Paper, InputBase, Grid, Snackbar, NativeSelect, InputLabel, ClickAwayListener, MenuItem
} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import LoginPopUpContainer from '../../../containers/LoginPopUpContainer';
import { store, history } from '../../../store';
import {
    TOGGLE_LOGIN_DIALOG,
    FILTER_PROVIDER_BY_COUNTRY,
    FILTER_PROVIDER_BY_SEARCH,
    FILTER_BY_FINANCIAL_SERVICES,
    FILTER_BY_BUSINESS_SERVICES
} from '../../../types/utils';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';


export default function Header(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openDialog, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [anchorE, setAnchorE] = React.useState(null);
    const [placement, setPlacement] = React.useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [openPopper, setOpenPopper] = useState(false);
    const [countriesList, setCountriesList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("India");
    const [selectedSearchItem, setselectedSearchItem] = useState("All");
    const [businessTypes, setBusinessTypes] = useState([]);
    const [financialTypes, setFinancialTypes] = useState([]);
    const [selectedBusinessType, setSelectedBusinessType] = useState(["Company Secretary"]);
    const [selectedFinancialType, setselectedFinancialType] = useState(["Banking"]);
    
    const styles = (theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });
    const useMultiStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }));

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleBussinessChange = (event) => {
        setSelectedBusinessType(event.target.value);
        
        store.dispatch({
            type: FILTER_BY_BUSINESS_SERVICES,
            payload: event.target.value
        })
      };
    
    const handleBussinessChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
          
        }
        setSelectedBusinessType(value);
    }
    const handleFinanceChange = (event) => {
        setselectedFinancialType(event.target.value);
        store.dispatch({
            type: FILTER_BY_BUSINESS_SERVICES,
            payload: event.target.value
        })
      };
    
    const handleFinanceChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
          setselectedFinancialType(value);
        }
        store.dispatch({
            type: FILTER_BY_BUSINESS_SERVICES,
            payload: value
        })
        
    }

    // const handleSelectedBusinessType = (e) => {
    //     // setSelectedBusinessType(e.target.getAttribute('data-value'));
    //     setSelectedBusinessType(prevArray => [...prevArray, e.target.getAttribute('data-value')])
    //     store.dispatch({
    //         type: FILTER_BY_BUSINESS_SERVICES,
    //         payload: e.target.getAttribute('data-value')
    //     })
    // }

    // const handleSelectedFinancialType = (e) => {
    //     setselectedFinancialType(prevArray => [...prevArray, e.target.getAttribute('data-value')])
    //     store.dispatch({
    //         type: FILTER_BY_FINANCIAL_SERVICES,
    //         payload: e.target.getAttribute('data-value')
    //     })
    // }

    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        {/* <CloseIcon /> */}
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    const DialogContent = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiDialogContent);

    const DialogActions = withStyles((theme) => ({
        root: {
            margin: 0,
            padding: theme.spacing(1),
        },
    }))(MuiDialogActions);

    const [openFilter, setopenFilter] = React.useState(false);

    const handleClickOpen = () => {
        setopenFilter(true);
    };
    const handleFilterClose = () => {
        setopenFilter(false);
    };

    useEffect(() => {
        if (history.location.pathname !== '/login' || '/register') {
            setIsLoggedIn(true);
        }
        setIsLoggedIn(false);
        props.getCountriesList();
        props.getBusinessTypes();
        props.getFinancialServices();
        store.subscribe(() => {
            setCountriesList(store.getState().getCountries.countries);
            setBusinessTypes(store.getState().getBusinessTypes.success);
            setFinancialTypes(store.getState().getFinancialService.success);
        })
    }, []);


    const navigateToRegister = () => {
        history.push('/register');
    }

    const change = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'location':
                setLocation(value);
                break;
            case 'name':
                setName(value);
                break;
            default:
                break;
        }
    }

    const navigateToProviderRegister = () => {
        history.push('/provider/register');
    }

    const navigateToProviderLogin = () => {
        history.push('/provider/login');
    }

    const performSearch = (e) => {
        store.dispatch({
            type: FILTER_PROVIDER_BY_SEARCH,
            payload: {
                'selectedCategory': selectedSearchItem,
                'item': e.target.value
            }
        })
    }

    const renderRegister = () => {
        if (history.location.pathname === '/') {
            return (
                <Button variant="contained" className={classes.margin} onClick={navigateToRegister}>Sign Up</Button>
            )
        }
        if (history.location.pathname === '/login') {
            return <Button variant="contained" className={classes.margin}>Sign Up</Button>
        }
        return null;
    }

    const handleSelectedCountry = (e) => {
        setSelectedCountry(e.target.getAttribute('data-value'))
        store.dispatch({
            type: FILTER_PROVIDER_BY_COUNTRY,
            payload: e.target.getAttribute('data-value')
        })
    }

    

    const handleClosed = () => {
        setOpen(!openDialog)
        store.dispatch({
            type: TOGGLE_LOGIN_DIALOG,
            payload: openDialog
        })
    }

    const handlePopper = (e) => {
        setOpenPopper(!openPopper);
        setAnchorE(e.currentTarget);
    }

    const handleSelectedCategory = (e) => {
        setselectedSearchItem(e.target.getAttribute('data-value'))
    }

    const renderLogin = () => {
        if (history.location.pathname === '/') {
            return (
                <div style={{ display: 'inline' }}>
                    <Button variant="contained"
                        className={classes.margin}
                        onClick={handleClosed}>Login
                    </Button>
                    <LoginPopUpContainer />
                </div>
            )
        }

        if (history.location.pathname === '/register') {
            return (
                <div style={{ display: 'inline' }}>
                    <Button variant="contained"
                        className={classes.margin}
                        onClick={handleClosed}>Login
                 </Button>
                    <LoginPopUpContainer />
                </div>
            )
        }
        return null;
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        toolbarButtons: {
            marginLeft: 'auto',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        btnColorWhite: {
            color: '#ffff'
        },
        popoverRoot: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        margin: {
            margin: theme.spacing(1),
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <div className="PlatformName">
                        <Typography variant="h6">Yoloj Platform</Typography>
                        <Select value={selectedCountry} style={{ color: '#fff' }}>
                            {
                                (countriesList && countriesList.length) ? countriesList.map((item, index) => {
                                    return (<MenuItem key={index} value={item.name} autoWidth={true} onClick={handleSelectedCountry}>{item.name}</MenuItem>)
                                }) : <span>Loading....</span>
                            }
                        </Select>
                    </div>
                    <div>
                    <Select value={selectedSearchItem} style={{ marginRight: 10, color: "#fff", width: "100px" }}>
                        <MenuItem value={"all"} autoWidth={true} onClick={handleSelectedCategory}>All Categories </MenuItem>
                        <MenuItem value={"name"} autoWidth={true} onClick={handleSelectedCategory}>Name</MenuItem>
                        <MenuItem value={"orgName"} autoWidth={true} onClick={handleSelectedCategory}>Organization Name</MenuItem>
                    </Select>
                    <TextField InputProps={{
                        endAdornment: (
                            <Icon className="fa fa-search" aria-hidden="true" />
                        )
                    }}
                        style={{ color: "#fff", width: "500px", cursor: "pointer" }}
                        onChange={performSearch}
                    >
                    </TextField>
                    </div>
                    <p> &nbsp; &nbsp; </p>
                    <div>
                        <Button variant="contained" color="default" onClick={handleClickOpen}>
                            Filter
                         </Button>
                        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openFilter}>
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                Filter
                            </DialogTitle>
                            <DialogContent style={{minHeight:'300px',minWidth:'500px'}} dividers>
                                <div>
                                    <InputLabel id="demo-mutiple-chip-label">Select your business preference</InputLabel>
                                    <br/>
                                    <Select
                                        
                                        labelId="BussinessType"
                                        id="businesstype"
                                        multiple
                                        value={selectedBusinessType}
                                        onChange={handleBussinessChange}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {
                                        (businessTypes && businessTypes.length) ? businessTypes.map((item, index) => {
                                            return (<MenuItem key={index} value={item.name} >{item.name}</MenuItem>)
                                        }) : <span>Loading....</span>
                                    }
                                    </Select>
                                    </div>                               
                                     <br/>
                                     <br/>
                                    <div>
                                    <InputLabel id="Financechip">Select your financial preference</InputLabel>
                                    <br/>
                                    <Select
                                        labelId="FinancialType"
                                        id="FinancialType"
                                        multiple
                                        value={selectedFinancialType}
                                        onChange={handleFinanceChange}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {
                                        (financialTypes && financialTypes.length) ? financialTypes.map((item, index) => {
                                            return (<MenuItem key={index} value={item.name}>{item.name}</MenuItem>)
                                        }) : <span>Loading...</span>
                                    }
                                    </Select>
                                    </div>                                {/* <Select
                                    closeMenuOnSelect={false}
                                    defaultValue={selectedBusinessType}
                                    isMulti
                                    // options={stateOptions}
                                // styles={colourStyles}
                                > {
                                    (businessTypes && businessTypes.length) ? businessTypes.map((item, index) => {
                                        return (<MenuItem key={index} value={item.name} onClick={handleSelectedBusinessType}>{item.name}</MenuItem>)
                                    }) : <span>Loading....</span>
                                }
                                </Select> */}
                                {/* <Typography >Select the Expertice</Typography>
                                <Select value={selectedBusinessType} style={{ marginLeft: 10, color: '#4B0082' }}>
                                    {
                                        (businessTypes && businessTypes.length) ? businessTypes.map((item, index) => {
                                            return (<MenuItem key={index} value={item.name} onClick={handleSelectedBusinessType}>{item.name}</MenuItem>)
                                        }) : <span>Loading....</span>
                                    }
                                </Select>
                                <br />
                                <Typography >Select the Expertice</Typography>
                                <Select value={selectedFinancialType} style={{ marginLeft: 10, color: '#4B0082' }}>
                                    {
                                        (financialTypes && financialTypes.length) ? financialTypes.map((item, index) => {
                                            return (<MenuItem key={index} value={item.name} onClick={handleSelectedFinancialType}>{item.name}</MenuItem>)
                                        }) : <span>Loading...</span>
                                    }
                                </Select> */}
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleFilterClose} color="primary">
                                    Apply Filter
                             </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                   

                    <div className={classes.toolbarButtons}>
                        {
                            isLoggedIn ? null :
                                <div>
                                    <Button className={[classes.margin, classes.btnColorWhite]} onClick={handlePopper}>Providers</Button>
                                    <Button className={[classes.margin, classes.btnColorWhite]}>Contact Us</Button>
                                    {
                                        renderRegister()
                                    }
                                    {
                                        renderLogin()
                                    }
                                </div>
                        }
                    </div>
                    <Popper open={openPopper} placement={"bottom"} transition anchorEl={anchorE} style={{ marginTop: 20, width: "300px" }}>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <ClickAwayListener onClickAway={handlePopper}>
                                    <Paper className="balloon">
                                        <div className="arrow"></div>
                                        <div className="mainPopContent">
                                            <Button variant="contained" className={classes.margin} style={{ minWidth: 250, marginLeft: 30 }} onClick={navigateToProviderRegister}>Provider Register</Button><br />
                                            <Button variant="contained" className={classes.margin} style={{ minWidth: 250, marginLeft: 30 }} onClick={navigateToProviderLogin}>Provider Login</Button>
                                        </div>
                                    </Paper>
                                </ClickAwayListener>
                            </Fade>
                        )}
                    </Popper>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}
