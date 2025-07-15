// app/home/page.tsx or wherever your HomePage is
'use client';

import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Navbar from '../component/navbar';
import GroupDialog from '../component/GroupDialog';
import axios from 'axios';
import GroupList from '../component/GroupList';
import Summary from '../component/expenseSummary';


export default function HomePage() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreateGroup = async (groupData: { group_name: string; createdBy: string }) => {
    console.log("New Group Created:", groupData);
    try {
  const res = await axios.post(
    "http://localhost:3001/group/create",
    groupData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, 
    }
  );
  console.log(res.data); // log actual response data
} catch (err) {
  console.error('Error creating group:', err);
}

  };

  return (
    <>
      <Navbar />

      <Button
        sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
        onClick={() => setOpenDialog(true)}
        variant="outlined"
        startIcon={<AddIcon />}
      >
        Create a Group
      </Button>
<Box
 sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 3 }}>
  <GroupList />
</Box>

      <GroupDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onCreate={handleCreateGroup}
      />
      <Summary/>
    </>
  );
}
