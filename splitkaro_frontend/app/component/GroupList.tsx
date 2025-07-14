'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Group {
  id: number;
  group_name: string;
}

export default function GroupList() {
  const [groups, setGroups] = useState<Group[]>([]);
const router = useRouter();
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get('http://localhost:3001/group/my-groups', {
          withCredentials: true,
        });
        setGroups(res.data);
        console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch groups:', err);
      }
    };

    fetchGroups();
  }, []);
 
const handleGroupClick = (id: number) => {
  router.push(`/group/${id}`);
};


  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        maxHeight: '80vh',
        overflowY: 'auto',
        minWidth: 300,
        borderRadius: 3,
        bgcolor: '#f5f5f5',
      }}
    >
      <Typography variant="h6" gutterBottom color="primary">
        Your Groups
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {groups.length === 0 ? (
          <Typography variant="body2" color="textSecondary" align="center">
            No groups found.
          </Typography>
        ) : (
          groups.map((group) => (
            <ListItemButton 
              key={group.id}
              onClick={() =>handleGroupClick(group.id)}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                },
              }}
            >
              <ListItemIcon>
                <GroupIcon color="action" />
              </ListItemIcon>
              <ListItemText primary={group.group_name} />
            </ListItemButton>
          ))
        )}
      </List>
    </Paper>
  );
}
