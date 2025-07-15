'use client';

import { Avatar, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

type MemberCardProps = {
  id: number;
  avatar: string;
  name: string;
  groupId: number;
  onDelete?: () => void; // optional callback to refresh list after deletion
};

export default function MemberCard({ id, avatar, name, groupId, onDelete }: MemberCardProps) {
  const handleRemove = async () => {
    try {
      await axios.delete(`http://localhost:3001/group-members/${groupId}/${id}`, {
        withCredentials: true,
      });
      if (onDelete) onDelete();
    } catch (error) {
      console.error('Failed to remove member:', error);
      alert('Failed to remove member');
    }
  };

  return (
    <Box
      sx={{
        width: 60,
        position: 'relative',
        mx: 'auto',
      }}
    >
      <IconButton
        size="small"
        onClick={handleRemove}
        sx={{
          position: 'absolute',
          top: -10,
          right: -10,
          backgroundColor: '#fff',
          zIndex: 1,
          p: 0.5,
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <Box
        p={1}
        sx={{
          borderRadius: '50%',
          width: 60,
          height: 60,
        }}
      >
        <Avatar src={avatar} alt={name} sx={{ width: 56, height: 56 }} />
      </Box>
    </Box>
  );
}
