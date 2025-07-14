'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../redux/hook/hook';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (groupData: { group_name: string; createdBy: string }) => void;
}

export default function GroupDialog({ open, onClose, onCreate }: Props) {
  const [name, setName] = useState('');
  
  
  const createdBy = useAppSelector((state) => state.user.email);

  const handleSubmit = () => {
    onCreate({ group_name: name, createdBy });
    setName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a New Group</DialogTitle>
      <DialogContent>
        <TextField
          label="Group Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {/* ✅ Optional: disable button if input is empty */}
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={!name.trim()}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
