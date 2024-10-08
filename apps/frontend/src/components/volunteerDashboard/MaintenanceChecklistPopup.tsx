import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface MaintenanceChecklistPopupProps {
  maintenanceChecklistOpen: boolean;
  setMaintenanceChecklistOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MaintenanceChecklistPopup({
  maintenanceChecklistOpen,
  setMaintenanceChecklistOpen,
}: MaintenanceChecklistPopupProps) {
  const [site, setSite] = useState('');

  const handleClose = () => {
    setMaintenanceChecklistOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSite(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: Add logic to display the maintenance checklist for the selected site
    event.preventDefault();
    console.log(site);
    handleClose();
  };

  return (
    <Dialog
      open={maintenanceChecklistOpen}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box
            flexGrow={1}
            style={{
              fontFamily: 'Montserrat',
              fontSize: '24px',
              fontWeight: '600',
            }}
          >
            Maintenance Visit Checklist
          </Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ paddingBottom: '8px' }}
          style={{
            fontFamily: 'Lora',
            fontSize: '16px',
            fontWeight: '400',
            color: 'black',
          }}
        >
          Select the site you'd like to see a checklist for
        </DialogContentText>
        <FormControl fullWidth>
          <Select
            id="select-site"
            value={site}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return 'Most recently adopted';
              }
              return selected;
            }}
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '20px',
              fontWeight: '400',
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .MuiMenuItem-root': {
                    fontFamily: 'Montserrat',
                    fontSize: '20px',
                    fontWeight: '400',
                    '&:hover': {
                      fontWeight: '600',
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value={'Rain Garden 1'}>Rain Garden 1</MenuItem>
            <MenuItem value={'Green Roof 2'}>Green Roof 2</MenuItem>
            <MenuItem value={'Tree Trench 3'}>Tree Trench 3</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions
        sx={{ padding: '24px', paddingBottom: '16px', paddingTop: '0px' }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#D9D9D9',
            color: 'black',
            fontFamily: 'Montserrat',
            fontSize: '20px',
            fontWeight: '400',
            px: 4,
          }}
        >
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
}
