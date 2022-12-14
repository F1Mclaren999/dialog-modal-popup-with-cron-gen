import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AlertsConfig from './AlertsConfig';

export default function ResponsiveDialog() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedRowData, setSelectedRowData] = React.useState({
    cutOffExpr: '0 0 0,1,2,3 1/1 JAN ? *s',
    cutOffExpInMinutes: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedRowData = (event, expression) => {
    switch (expression) {
      case 'cutOffExpr':
        setSelectedRowData({ cutOffExpr: event, cutOffExpInMinutes: false });
        break;
      case 'cutOffExpInMinutes':
        console.log('event from cutOffExpInMinutes...', event);
        setSelectedRowData({ cutOffExpr: event, cutOffExpInMinutes: true });
        break;
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{'Cron Gen'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <AlertsConfig
              selectedRowData={selectedRowData}
              setSelectedRowData={handleSelectedRowData}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
