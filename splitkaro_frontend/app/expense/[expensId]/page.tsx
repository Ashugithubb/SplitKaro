'use client';
import Navbar from '@/app/component/navbar';
import {
  Avatar,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
type User = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
};

type SettlementItem = {
  id: number;
  expense: number;
  paid: number;
  pending: number;
  paymentDate: string;
  user: User;
};

type ExpenseData = {
  id: number;
  description: string;
  amount: number;
  createdAt: string;
  category: string;
  settlement: SettlementItem[];
};


export default function Events() {
  const params = useParams();
  const expensId = parseInt(params.expensId as string, 10);
  const [data, setSettlement] = useState<ExpenseData | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editedExpense, setEditedExpense] = useState<number>(0);
  const [editedPaid, setEditedPaid] = useState<number>(0);


  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/expense/settlement/${expensId}`,
          { withCredentials: true }
        );
        setSettlement(res.data);
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
      }
    };

    if (expensId) {
      fetchExpenses();
    }
  }, [expensId]);

  const handleEdit = (s: SettlementItem) => {
    setEditId(s.id);
    setEditedExpense(s.expense);
    setEditedPaid(s.paid);
  };

  const handleSave = async (settlementId: number) => {
    try {
      await axios.put(
        `http://localhost:3001/settlements/update/${settlementId}`,
        {
          expense: editedExpense,
        },
        { withCredentials: true }
      );
      // Refetch updated data
      const res = await axios.get(
        `http://localhost:3001/expense/settlement/${expensId}`,
        { withCredentials: true }
      );
      setSettlement(res.data);
      setEditId(null);
    } catch (error) {
      console.error('Failed to update settlement:', error);
    }
  };

  if (!data) return <Typography>Loading...</Typography>;
  const handelDeleteClick = ()=>{
    try{
        const res = axios.delete(`http://localhost:3001/expense/${expensId}`);
        console.log(res);
       window.history.back();
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <Navbar />

      {/* Expense Summary Card */}
      <Card
        sx={{
          maxWidth: 600,
          mx: 'auto',
          mt: 4,
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: '#6e9bc7ff',
        }}
      >
       <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
  <IconButton onClick={handelDeleteClick} sx={{ color: 'red' }}>
    <DeleteIcon />
  </IconButton>
</Box>
        <CardHeader
          title={`Expense Type: ${data.category.toUpperCase()}`}
          subheader={`Expense Description: ${data.description}`}
        />
        
        <CardContent>
          <Typography variant="h6" color="secondary">
            Total Spent: ₹{data.amount}
          </Typography>
        </CardContent>
       
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* Users List */}
      {data.settlement.map((s) => {
        const fullName = `${s.user.first_name} ${s.user.last_name}`;
        const pending = s.pending;
        const color = pending < 0 ? 'red' : 'green';

        return (
          <Box
            key={s.id}
            display="flex"
            flexDirection="column"
            gap={1}
            mb={3}
            p={2}
            sx={{
              border: '1px solid #ddd',
              borderRadius: 2,
              width: '500px',
              mx: 'auto',
              boxShadow: 1,
            }}
          >
            {/* Main Row */}
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={s.user.avatar} alt={fullName} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {fullName}
                  </Typography>
                  <Typography variant="body2" color={color}>
                    Pending: {pending}₹
                  </Typography>
                </Box>
              </Box>
              <Button variant="outlined" size="small" color="primary" onClick={() => handleEdit(s)}>
                Edit
              </Button>
            </Box>

            {/* Editable Fields */}
            {editId === s.id && (
              <Box display="flex" flexDirection="column" gap={1} mt={2}>
                <TextField
                  label="Expense"
                  type="number"
                  value={editedExpense}
                  onChange={(e) => setEditedExpense(parseInt(e.target.value))}
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{
                    backgroundColor: '#1e1e1e',
                    input: { color: 'white' },
                    label: { color: '#bbb' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#555',
                      },
                      '&:hover fieldset': {
                        borderColor: '#888',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                      },
                    },
                  }}
                />

                <Box display="flex" gap={1} alignItems="center">
                  <TextField
                    label="Paid"
                    type="number"
                    value={editedPaid}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value)) {
                        if (value >= 0 && value <= data.amount) {
                          setEditedPaid(value);
                        }
                      } else {
                        setEditedPaid(0);
                      }
                    }}
                    fullWidth
                    size="small"
                    variant="outlined"
                    inputProps={{
                      min: 0,
                      max: data.amount,
                    }}
                    sx={{
                      backgroundColor: '#1e1e1e',
                      input: { color: 'white' },
                      label: { color: '#bbb' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#555',
                        },
                        '&:hover fieldset': {
                          borderColor: '#888',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1976d2',
                        },
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ height: '40px' }}
                  >
                    Pay
                  </Button>
                </Box>

                <Button variant="contained" onClick={() => handleSave(s.id)}>
                  Save
                </Button>
              </Box>
            )}
          </Box>
        );
      })}
    </>
  );
}
