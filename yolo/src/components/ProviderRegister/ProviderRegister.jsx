import React from 'react';
import HeaderContainer from '../../containers/headerContainer';
import './ProviderRegister.css';
import {
    Container,
    InputLabel, Icon,
    StepLabel, Step, ExpansionPanelSummary,
    Stepper, TextField, Grid, Typography,
    Paper, Select, Avatar,
    MenuItem, Chip, ExpansionPanel, ExpansionPanelActions,
    Snackbar, Button, ExpansionPanelDetails
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { history, store } from '../../store';
import log from '../../utils/logger.service';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



export default class ProviderRegister extends React.Component {
    constructor(props) {
        super();
        this.state = {
            activeStep: 0,
            steps: ['Partner Details', 'Organization Details', 'Services Details', 'Service Type Details'],
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            countries: [],
            businessList: ['Business Incorporation', 'GST Service', 'Startup Serices', 'Legal Complaince Service', 'Tax Returns', 'Goverment Registration', 'Trademark', 'Miscelleneous Services'],
            individualList: ['Tax returns', 'TDS', 'Legal', 'Miscelleneous Services'],
            services: [],
            servivesList: [],
            selectedServices: [],
            actualServices: [],
            expertise: [],
            confirmPassword: '',
            phoneNumber: '',
            country_code: '+91',
            errorMessage: '',
            OrgName: '',
            base64: '',
            OrgAddress: '',
            OrgPINType: '',
            OrgCountry: 'India',
            OrgRegNumber: '',
            OrgServiceType: '',
            OrgExpertise: [],
            open: false,
            showAlert: false,
            value:0,
            errors: {
                firstName: '',
                lastName: '',
                OrgName: '',
                OrgAddress: '',
                OrgCountry: '',
                OrgRegNumber: '',
                OrgPINType: '',
                password: '',
                email: '',
                confirmPassword: '',
                phoneNumber: ''
            }
        }
    }

    name = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            this.setState({
                base64: reader.result
            });
        };
    }

     TabPanel=(props)=> {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
    //   TabPanel.propTypes = {
    //     children: PropTypes.node,
    //     index: PropTypes.any.isRequired,
    //     value: PropTypes.any.isRequired,
    //   };
      
      a11yProps =(index)=> {
        return {
          id: `full-width-tab-${index}`,
          'aria-controls': `full-width-tabpanel-${index}`,
        };
      }
      
      useStyles = makeStyles((theme) => ({
        root: {
          backgroundColor: theme.palette.background.paper,
          width: 500,
        },
      }));
      
      classes = this.useStyles();
      theme = useTheme();
    //   [value, setValue] = React.useState(0);
    
       handleChange = (event, newValue) => {
        this.setState({value:newValue});
      };
    
       handleChangeIndex = (index) => {
        this.setState({value:index});
      };
    

    change = (e) => {
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch (name) {
            case 'firstName':
                errors.firstName = value.length < 3 ? 'First Name should be 3 characters long' : null;
                break;
            case 'lastName':
                errors.lastName = value.length < 3 ? 'Last name should be 3 characters long' : null;
                break;
            case 'email':
                errors.email = value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) ? '' : 'Invalid Email Address';
                break;
            case 'password':
                errors.password = value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) ? '' : 'Password should be atleast 7 characters with alphanumeric characters';
                break;
            case 'confirmPassword':
                errors.confirmPassword = (this.state.password === value) ? '' : 'Confirm Password should be equal to password';
                break;
            case 'phoneNumber':
                errors.phoneNumber = value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) ? '' : 'Invalid phone number.';
                break;
            case 'OrgName':
                errors.OrgName = value.length < 3 ? 'Organization name should be 3 characters long' : '';
                break;
            case 'OrgAddress':
                errors.OrgAddress = value.length < 3 ? 'Ivalid Organization address' : '';
                break;
            case 'OrgRegNumber':
                errors.OrgRegNumber = value.length ? '' : 'Organization registration number is required';
                break;
            case 'OrgPINType':
                errors.OrgPINType = value.length ? '' : 'PIN type is required';
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value }, () => {
            return null;
        });
    }

    componentDidMount() {
        log('User is on Provider Register Page')
        document.title = 'Yolo- Partner Register';
        this.props.getFinancialServiceList();
        this.props.getBusinessTypeList();
        this.props.getCountriesList();
        store.subscribe(() => {
            this.setState({
                services: store.getState().getFinancialService.success
            });
            this.setState({
                expertise: store.getState().getBusinessTypes.success
            });
            this.setState({
                countries: store.getState().getCountries.countries
            })
        });
        setTimeout(() => {
            this.state.services.map((item) => {
                var joined = this.state.servivesList.concat(item.name);
                this.setState({ servivesList: joined })
            })
        }, 1000);
    }


    // handleData = () => {
    //     console.log(this.state.services)
    // }


    // handleDelete = (name) => {
    //     if (this.state.services.length === 1) {
    //         this.setState({
    //             showAlert: true
    //         })
    //         return null;
    //     }
    //     this.setState({
    //         services: this.state.services.filter(item => item.name !== name.name)
    //     })
    // }

    storeSelectedservices = (value) => {
        var newArrayobj = []
        this.state.services.forEach(element1 => {
            value.forEach(element2 => {
                if (element1.name === element2) {
                    newArrayobj.push(element1);
                }
            });
        });
        this.setState({ actualServices: newArrayobj });
        // setTimeout(() => {
        //     console.log(this.state.actualServices)
        // }, 1000);
    }


    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    };

    handleReset = () => {
        this.setState({
            activeStep: 0
        });
    };

    handleAccessCode = (e) => {
        this.setState({ country_code: e.target.getAttribute('data-value') });
    }

    handleCountrySelect = (e) => {
        this.setState({
            OrgCountry: e.target.getAttribute('data-value')
        })
    }

    // handleServiceCode = (e) => {
    //     this.setState({ OrgExpertise: e.target.getAttribute('data-value') });
    //     console.log(e.target.getAttribute('data-value'))
    // }

    handleSelectedexpertise = (e, value) => {
        this.setState({ OrgExpertise: value });
        // console.log(this.state.OrgExpertise);
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    handleClick = () => {

    }

    createOrganization = () => {
        this.props.registerProvider(
            this.state.firstName + " " + this.state.lastName,
            this.state.password, this.state.email, this.state.phoneNumber,
            this.state.OrgCountry, this.state.OrgName,
            this.state.OrgAddress, this.state.OrgRegNumber,
            this.state.OrgPINType, this.state.actualServices,
            this.state.base64, this.state.OrgExpertise
        );
        store.subscribe(() => {
            if (store.getState().registerProvider.error) {
                this.setState({ open: true });
                this.setState({ errorMessage: store.getState().registerProvider.error })
            } else {
                history.push('/provider/login');
            }

        })
    }

    handleSelectedservices = (event, value) => {
        this.setState({ selectedServices: value });
        this.storeSelectedservices(value);
    }


    getStepperContent = () => {
        if (this.state.activeStep === 3) {
            return (
                <Paper style={{ height: 500 }}>
                    <h4>Please provide your serice type details</h4>
                    <div style={{ display: 'inline-flex' }}>
                        <div>
                            <Paper style={{ width: 800, marginBottom: 50 }}>
                                <ExpansionPanel style={{ width: 800 }}>
                                    <ExpansionPanelSummary expandIcon={<Icon className="fa fa-sort-desc" aria-hidden="true" />}>
                                        <Typography>{"For business"}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelSummary >
                                        {
                                            (this.state.individualList && this.state.individualList.length) ? this.state.individualList.map((item, index) => {
                                                return <Chip label={item}
                                                    style={{ marginBottom: 10, marginRight: 10 }}
                                                    onDelete={() => this.handleDelete(item)}
                                                    onClick={() => this.handleClick()}
                                                    clickable
                                                    key={index}
                                                    avatar={<Avatar
                                                        className="avatarRe">{item[0]}</Avatar>}
                                                />
                                            }) : <span>No serices found.</span>
                                        }
                                    </ExpansionPanelSummary>
                                </ExpansionPanel>

                                <ExpansionPanel style={{ width: 800 }}>
                                    <ExpansionPanelSummary expandIcon={<Icon className="fa fa-sort-desc" aria-hidden="true" />}>
                                        <Typography>{"For business"}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelSummary>
                                        <div>
                                            {
                                                (this.state.individualList && this.state.businessList.length) ? this.state.businessList.map((item, index) => {
                                                    return <Chip label={item}
                                                        style={{ marginBottom: 10, marginRight: 10 }}
                                                        onDelete={() => this.handleDelete(item)}
                                                        onClick={() => this.handleClick()}
                                                        clickable
                                                        key={index}
                                                        avatar={<Avatar
                                                            className="avatarRe">{item[0]}</Avatar>}
                                                    />
                                                }) : <span>No serices found.</span>
                                            }
                                        </div>
                                    </ExpansionPanelSummary>
                                </ExpansionPanel>
                            </Paper>
                        </div>
                    </div><br />
                    <Button disabled={this.state.activeStep === 0} onClick={this.handleBack}
                        style={{ marginRight: 30 }} variant="outlined"
                    >Back</Button>
                    <Button onClick={this.handleReset}
                        variant="outlined"
                        color="secondary"
                        style={{ marginRight: 30 }}>Reset Form
                    </Button>
                    <Button onClick={this.createOrganization}
                        variant="outlined"
                        color="primary">Create your Provider Account
                    </Button>
                </Paper>
            )
        }
        if (this.state.activeStep === 2) {
            return (
                <Paper style={{ height: 500 }}>
                    <h4>Enter your Organization Services</h4>
                    
                    <div style={{ display: 'inline-flex' }}>
                        <div>
                            <Paper style={{ width: 800, marginBottom: 50 }}>
                                {
                                    this.state.showAlert ? <Alert severity="warning">Cannot delete. Atleast one expertise required</Alert> : null
                                }
                                <InputLabel id="demo-simple-select-label" style={{ marginBottom: 20 }}>Select your service Type</InputLabel>
                                {
                                    <Autocomplete
                                        multiple
                                        id="checkboxes-tags-demo"
                                        options={this.state.servivesList}
                                        disableCloseOnSelect
                                        getOptionLabel={(option) => option}
                                        onChange={(event, value) => this.handleSelectedservices(event, value)}
                                        renderOption={(option, { selected }) => (
                                            <React.Fragment>
                                                <Checkbox
                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {option}
                                            </React.Fragment>
                                        )}
                                        style={{ width: 600 }}
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" label="Select your service Type" placeholder="services" />
                                        )}
                                    />

                                }
                            </Paper>

                        </div>
                    </div><br />
                    <div style={{ display: 'inline-flex', marginBottom: 50 }}>
                        <div>
                            <InputLabel id="demo-simple-select-label">Please Select your Expertise</InputLabel>
                            <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={this.state.expertise}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.name}
                                onChange={(event, value) => this.handleSelectedexpertise(event, value)}
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.name}
                                    </React.Fragment>
                                )}
                                style={{ width: 600 }}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label="Please Select your Expertise" placeholder="Expertise" />
                                )}
                            />
                            {/* <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-sßelect"
                                value={this.state.OrgExpertise}
                                style={{ minWidth: 650 }}
                            >
                                {
                                    (this.state.expertise && this.state.expertise.length) ? this.state.expertise.map((item, index) => {
                                        return <MenuItem key={index} value={item.name} onClick={(e) => this.handleServiceCode(e)}>{item.name}</MenuItem>
                                    }) : <span>Loading</span>
                                }
                            </Select> */}
                        </div>
                    </div><br />
                    <Button
                        disabled={this.state.activeStep === 0}
                        onClick={this.handleBack} style={{ marginRight: 30 }}
                        variant="outlined"
                    >
                        Back
                    </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleNext} style={{ marginRight: 30 }}>
                        {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Paper>
            )
        } if (this.state.activeStep === 0) {
            return (
                <Paper style={{ marginLeft: 150, height: 500 }}>
                    <h4>Please provide your personal details</h4>
                    <Container maxWidth="sm" style={{ marginBottom: 30 }}>
                        <form noValidate autoCapitalize="off">
                            <TextField
                                id="firstName"
                                label="Please enter your first Name"
                                fullWidth
                                type="text"
                                required
                                name="firstName"
                                error={this.state.errors.firstName}
                                helperText={this.state.errors.firstName}
                                autoFocus
                                onChange={(e) => this.change(e)}
                                value={this.state.firstName}
                            />
                            <TextField
                                id="lastName"
                                label="Please enter your last Name"
                                fullWidth
                                type="text"
                                required
                                name="lastName"
                                error={this.state.errors.lastName}
                                helperText={this.state.errors.lastName}
                                onChange={(e) => this.change(e)}
                                value={this.state.lastName}
                            />
                            <TextField
                                id="email"
                                label="Please enter your Email Address"
                                fullWidth
                                type="email"
                                required
                                name="email"
                                error={this.state.errors.email}
                                helperText={this.state.errors.email}
                                onChange={(e) => this.change(e)}
                                value={this.state.email}
                            />
                            <TextField
                                id="password"
                                label="Please enter your password"
                                fullWidth
                                type="password"
                                required
                                name="password"
                                error={this.state.errors.password}
                                helperText={this.state.errors.password}
                                onChange={(e) => this.change(e)}
                                value={this.state.password}
                            />
                            <TextField
                                id="confirmPassword"
                                label="Please re-enter your password"
                                fullWidth
                                type="password"
                                required
                                name="confirmPassword"
                                error={this.state.errors.confirmPassword}
                                helperText={this.state.errors.confirmPassword}
                                onChange={(e) => this.change(e)}
                                value={this.state.confirmPassword}
                            />
                            <Grid item xs={4} style={{ display: 'flex' }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-sßelect"
                                    value={this.state.country_code}
                                    style={{ minWidth: 150 }}
                                >
                                    {
                                        (this.state.countries && this.state.countries.length) ? this.state.countries.map((item, index) => {
                                            return <MenuItem key={index} value={item.dial_code} onClick={(e) => this.handleAccessCode(e)}>{item.dial_code}</MenuItem>
                                        }) : <span>Loading</span>
                                    }
                                </Select>
                                <TextField
                                    id="phone_number"
                                    label="Enter your Phone number"
                                    name="phoneNumber"
                                    fullWidth
                                    type="number"
                                    error={this.state.errors.phoneNumber}
                                    helperText={this.state.errors.phoneNumber}
                                    autoFocus
                                    required
                                    style={{ minWidth: 400 }}
                                    onChange={(e) => this.change(e)}
                                    value={this.state.phoneNumber}
                                />
                            </Grid>
                        </form>
                    </Container>
                    <Button
                        disabled={this.state.activeStep === 0}
                        onClick={this.handleBack} style={{ marginRight: 30 }}
                        variant="outlined"
                    >
                        Back
                    </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleNext} style={{ marginRight: 30 }}>
                        {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Paper>
            )
        } if (this.state.activeStep === 1) {
            return (
                <Paper >
                    <h4>Please provide your Organization Details</h4>
                    <Container maxWidth="sm" style={{ marginBottom: 50 }}>
                        <form noValidate autoCapitalize="off">
                            <TextField
                                fullWidth
                                type="text"
                                required
                                label="Enter your Organization Name (As per goverment fillings)"
                                id="OrgName"
                                name="OrgName"
                                error={this.state.errors.OrgName}
                                helperText={this.state.errors.OrgName}
                                autoFocus
                                onChange={(e) => this.change(e)}
                                value={this.state.OrgName}
                            />
                            <TextField
                                fullWidth
                                label="Enter your Organization Address"
                                type="text"
                                required
                                id="OrgAddress"
                                name="OrgAddress"
                                error={this.state.errors.OrgAddress}
                                helperText={this.state.errors.OrgAddress}
                                onChange={(e) => this.change(e)}
                                value={this.state.OrgAddress}
                            />
                            <Select id="countriesLabel"
                                labelId="demo-simple-select-label"
                                style={{ minWidth: 550 }}
                                value={this.state.OrgCountry}
                            >
                                {
                                    (this.state.countries && this.state.countries.length) ? this.state.countries.map((item, index) => {
                                        return <MenuItem key={index} value={item.name} onClick={(e) => this.handleCountrySelect(e)}>{item.name}</MenuItem>
                                    }) : <span>Loading...</span>
                                }
                            </Select>
                            <TextField
                                fullWidth
                                label="Enter your Organization Registation Number"
                                type="text"
                                required
                                id="OrgRegNumber"
                                name="OrgRegNumber"
                                error={this.state.errors.OrgRegNumber}
                                helperText={this.state.errors.OrgRegNumber}
                                onChange={(e) => this.change(e)}
                                value={this.state.OrgRegNumber}
                            />
                            <TextField
                                fullWidth
                                label="Enter type of registation"
                                type="text"
                                required
                                name="OrgPINType"
                                error={this.state.errors.OrgPINType}
                                helperText={this.state.errors.OrgPINType}
                                onChange={(e) => this.change(e)}
                                style={{ marginBottom: 40 }}
                                value={this.state.OrgPINType}
                            />
                            <Grid item xs={4} style={{ display: 'flex' }}>
                                <label>Please provide a proof of Organization</label>
                                <input
                                    accept="image/*"
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    onChange={(e) => { this.name(e) }}
                                />
                            </Grid>
                        </form>
                    </Container>
                    <Button
                        disabled={this.state.activeStep === 0}
                        onClick={this.handleBack}
                        style={{ marginRight: 30 }}
                        variant="outlined"
                    >
                        Back
                </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleNext} style={{ marginRight: 30 }}>
                        {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Paper>
            )
        }
    }

    render() {
        return (
            <div>
                <HeaderContainer />
                <Paper className="stepperShrink">
                    <Stepper activeStep={this.state.activeStep} alternativeLabel elevation={0}>
                        {
                            this.state.steps.map((items, index) => {
                                return (
                                    <Step key={items}>
                                        <StepLabel>{items}</StepLabel>
                                    </Step>
                                )
                            })
                        }
                    </Stepper>
                </Paper>
                <div className="shrink">
                    {
                        this.getStepperContent()
                    }
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={(e, r) => this.handleClose(e, r)}
                    message={this.state.errorMessage}
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={(e, r) => this.handleClose(e, r)}>
                                Hide
                            </Button>
                        </React.Fragment>
                    }
                />
            </div>
        )
    }
}