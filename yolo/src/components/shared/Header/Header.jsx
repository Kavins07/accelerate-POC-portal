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
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';

// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
// import { makeStyles } from '@material-ui/core/styles';




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
    const [openProfile, setopenProfile] = useState(false);
    const [anchorMenuEl, setAnchorMenuEl] = React.useState(null);
    const [userName, setuserDetails] = useState([]);


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

    const menuClasses = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        paper: {
            marginRight: theme.spacing(2),
        },
    }));

    const [openProfilemenu, setopenProfilemenu] = React.useState(false);
    const anchorMenuRef = React.useRef(null);

    const handleMenuToggle = () => {
        setopenProfilemenu((prevOpen) => !prevOpen);
    };

    const handleMenuClose = (event) => {
        if (anchorMenuRef.current && anchorMenuRef.current.contains(event.target)) {
            return;
        }
        setopenProfilemenu(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setopenProfilemenu(false);
        }
    }

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

    const handlemenuClick = (event) => {
        setAnchorMenuEl(event.currentTarget);
    };

    const handlemenuClose = () => {
        setAnchorMenuEl(null);
    };

    const handleBussinessChange = (event) => {
        setSelectedBusinessType(event.target.value);

        store.dispatch({
            type: FILTER_BY_BUSINESS_SERVICES,
            payload: event.target.value
        })
    };

    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userProfile');
        window.localStorage.removeItem('providerProfile');
        window.location.reload(false);
    }

    // const handleBussinessChangeMultiple = (event) => {
    //     const { options } = event.target;
    //     const value = [];
    //     for (let i = 0, l = options.length; i < l; i += 1) {
    //         if (options[i].selected) {
    //             value.push(options[i].value);
    //         }

    //     }
    //     setSelectedBusinessType(value);
    // }
    const handleFinanceChange = (event) => {
        setselectedFinancialType(event.target.value);
        store.dispatch({
            type: FILTER_BY_BUSINESS_SERVICES,
            payload: event.target.value
        })
    };

    // const handleFinanceChangeMultiple = (event) => {
    //     const { options } = event.target;
    //     const value = [];
    //     for (let i = 0, l = options.length; i < l; i += 1) {
    //         if (options[i].selected) {
    //             value.push(options[i].value);
    //         }
    //         setselectedFinancialType(value);
    //     }
    //     store.dispatch({
    //         type: FILTER_BY_BUSINESS_SERVICES,
    //         payload: value
    //     })

    // }


    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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
        if (localStorage.getItem("userProfile")) {
            setopenProfile(true);
        }
        if (localStorage.getItem("providerProfile")) {
            setopenProfile(true);
        }
        setIsLoggedIn(false);
        props.getCountriesList();
        props.getBusinessTypes();
        props.getFinancialServices();
        store.subscribe(() => {
            setCountriesList(store.getState().getCountries.countries);
            setBusinessTypes(store.getState().getBusinessTypes.success);
            setFinancialTypes(store.getState().getFinancialService.success);
            //if(localStorage.getItem('userProfile')){
            //     setuserDetails(store.getState().getUserDetails);
            // setuserDetails(true);
            // localStorage.setItem('userDeatils',userDetails[0]);
            // }
        });
        if (localStorage.getItem('userProfile') === 'true') {
            if(store.getState().getUserDetails.success.length>0){
                setName(store.getState().getUserDetails.success[0].name);
            }else{
                localStorage.setItem('userProfile', true);
                history.push('/dashboard');
            }
        }
    }, []);

    const navigateToRegister = () => {
        history.push('/register');
    }

    const navigatetoLogin = () => {
        history.push('/login')
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
                <Button className={[classes.margin, classes.btnColorWhite]} onClick={navigateToRegister}>Sign Up</Button>
            )
        }
        if (history.location.pathname === '/login') {
            return <Button className={[classes.margin, classes.btnColorWhite]}>Sign Up</Button>
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
                    <Button
                        className={[classes.margin, classes.btnColorWhite]}
                        onClick={handleClosed}>Login
                    </Button>
                    <LoginPopUpContainer />
                </div>
            )
        }

        if (history.location.pathname === '/register') {
            return (
                <div style={{ display: 'inline' }}>
                    <Button
                        className={[classes.margin, classes.btnColorWhite]}
                        onClick={() => { navigatetoLogin() }}>Login
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

    const handleProfile = () => {
        if (localStorage.getItem('userProfile')) {
            localStorage.setItem('userProfile', false);
            history.push('/dashboard');
        }
        if (localStorage.getItem('providerProfile')) {
            history.push('/provider/dashboard');
        }

    }


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
                        <Button className={classes.btnColorWhite} onClick={handleClickOpen}>
                            Filter
                        </Button>
                        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openFilter} >
                            <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{ color: '#DC143C' }}>
                                Choose your preferences here
                            </DialogTitle>
                            <DialogContent style={{ minHeight: '300px', minWidth: '500px' }} dividers>
                                <div >
                                    <InputLabel id="businesschip" style={{ color: '#6A5ACD' }} >Select your business preferences</InputLabel>
                                    <br />
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
                                        style={{ textDecorationColor: 'yellow' }}
                                    >
                                        {
                                            (businessTypes && businessTypes.length) ? businessTypes.map((item, index) => {
                                                return (<MenuItem key={index} value={item.name} >{item.name}</MenuItem>)
                                            }) : <span>Loading....</span>
                                        }
                                    </Select>
                                </div>
                                <br />
                                <br />
                                <div>
                                    <InputLabel id="Financechip" style={{ color: '#6A5ACD' }}>Select your financial preferences</InputLabel>
                                    <br />
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
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleFilterClose} style={{ color: "#228B22" }}>
                                    Apply Filter
                             </Button>
                            </DialogActions>
                        </Dialog>
                    </div>


                    <div className={classes.toolbarButtons}>
                        {
                            isLoggedIn ? null :
                                <div>
                                    {
                                        openProfile ? null :
                                            <span>
                                                <Button className={[classes.margin, classes.btnColorWhite]} onClick={handlePopper}>Providers</Button>
                                            </span>
                                    }

                                    <Button className={[classes.margin, classes.btnColorWhite]}>Contact Us</Button>
                                    {
                                        openProfile ? null :
                                            <span>
                                                {
                                                    renderRegister()
                                                }
                                                {
                                                    renderLogin()
                                                }
                                            </span>
                                    }
                                </div>
                        }
                    </div>
                    {
                        openProfile ?
                            <div>
                                <div className={menuClasses.root}>
                                    <div>
                                        <Button
                                            ref={anchorMenuRef}
                                            aria-controls={openProfilemenu ? 'menu-list-grow' : undefined}
                                            aria-haspopup="true"
                                            className={[classes.margin, classes.btnColorWhite]}
                                            onClick={handleMenuToggle}
                                        >
                                            {name}
                                            <p> &nbsp; &nbsp; </p>
                                            <AccountCircleTwoToneIcon
                                                style={{ fontSize: 30 }}
                                            />
                                        </Button>
                                        <Popper open={openProfilemenu} anchorEl={anchorMenuRef.current} role={undefined} transition disablePortal>
                                            {({ TransitionProps, placement }) => (
                                                <Grow
                                                    {...TransitionProps}
                                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                                >
                                                    <Paper>
                                                        <ClickAwayListener onClickAway={handleMenuClose}>
                                                            <MenuList autoFocusItem={openProfilemenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                                <MenuItem onClick={handleProfile}>My account</MenuItem>
                                                                <MenuItem onClick={logout}>Logout</MenuItem>
                                                            </MenuList>
                                                        </ClickAwayListener>
                                                    </Paper>
                                                </Grow>
                                            )}
                                        </Popper>
                                    </div>
                                </div>
                            </div> : null
                    }
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
