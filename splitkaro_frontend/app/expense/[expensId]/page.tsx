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
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// ---------- Type Definitions ----------
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

// ---------- Component ----------
export default function Events() {
  const params = useParams();
  const expensId = parseInt(params.expensId as string, 10);
  const [data, setSettlement] = useState<ExpenseData | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/expense/settlement/${expensId}`,
          { withCredentials: true }
        );
        setSettlement(res.data);
        console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
      }
    };

    if (expensId) {
      fetchExpenses();
    }
  }, [expensId]);

  if (!data) return <Typography>Loading...</Typography>;

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
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            mb={2}
            p={2}
            sx={{
              border: '1px solid #ddd',
              borderRadius: 2,
              width: '500px',
              mx: 'auto',
              boxShadow: 1,
            }}
          >
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
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => alert(`Edit user ${fullName}`)}
            >
              Edit
            </Button>
          </Box>
        );
      })}
    </>
  );
}
