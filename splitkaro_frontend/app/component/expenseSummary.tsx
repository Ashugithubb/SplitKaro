'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download'; // install @mui/icons-material if needed

interface ExpenseSummary {
  category: string;
  totalAmount: string;
}

export default function Summary() {
  const [categoryExpenses, setCategoryExpenses] = useState<ExpenseSummary[]>([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get('http://localhost:3001/expense/grouped/summary', {
          withCredentials: true,
        });
        setCategoryExpenses(res.data);
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      }
    };

    fetchSummary();
  }, []);
  const handleDownloadCSV = () => {
  const headers = ['Category', 'Total Amount'];
  const rows = categoryExpenses.map(item => [item.category, item.totalAmount]);

  const csvContent = [headers, ...rows]
    .map(e => e.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'expense_summary.csv');
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


 return (
    
  <Box sx={{ mt: 4, mx: 3 }}>
    

    <Typography
      variant="h5"
      gutterBottom
      sx={{ color: '#ffffff', fontWeight: 'bold' }}
    >
      Expense Summary by Category
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
  <Button
    variant="outlined"
    color="info"
    startIcon={<DownloadIcon />}
    onClick={handleDownloadCSV}
    sx={{
      color: '#ffffff',
      borderColor: '#90caf9',
      '&:hover': {
        backgroundColor: '#90caf9',
        color: '#000000',
      },
    }}
  >
    Export CSV
  </Button>
</Box>

    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'flex-start',
      }}
    >
      {categoryExpenses.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            width: {
              xs: '100%',
              sm: '48%',
              md: '30%',
              lg: '22%',
            },
            background: 'linear-gradient(145deg, #1e1e1e, #2c2c2c)',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            padding: 2,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            },
          }}
        >
          <CardContent sx={{ padding: 0 }}>
            <Typography
              variant="h6"
              sx={{ color: '#90caf9', textTransform: 'uppercase', mb: 1 }}
            >
              {item.category}
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: '#ffffff', fontWeight: 'bold' }}
            >
              ₹{item.totalAmount}
            </Typography>
          </CardContent>
        </Box>
      ))}
    </Box>
  </Box>
);


}
