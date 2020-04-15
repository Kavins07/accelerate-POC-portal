import React from 'react';
import LoginTab from "../Login-PopUp/mdb-login"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TransitionsModal =(props)=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    //setOpen(true);
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false);
  };
  const closeAfterLogin=()=>{
    props.tobechanged('argumnt');
    setOpen(false);
  }

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      
      <button className="btn btn-success" onClick={handleOpen} style={{marginLeft:"1rem"}}>Login</button>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <LoginTab closeAfterLogin={closeAfterLogin}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default TransitionsModal