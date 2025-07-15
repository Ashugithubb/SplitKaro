'use client';

import { useEffect, useState } from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import { useParams } from 'next/navigation';
import {
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Navbar from '@/app/component/navbar';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { any } from 'zod';
import MemberCard from '@/app/component/members';
import { toast,ToastContainer } from 'react-toastify';
const groupMembers = [
  { id: 1, name: 'Ashutosh' },
  { id: 2, name: 'Rahul' },
  { id: 3, name: 'Priya' },
];


const categories = [
  'food',
  'travel',
  'party',
  'birthday',
  'shopping',
  'movies',
  'other',
];

type Balance = {
  totalExpense: number;
  totalPaid: number;
  totalPending: number;
  count: number;
};
type Member = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
};




export default function GroupDetails() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const params = useParams();
  const groupId = parseInt(params.groupId as string, 10);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
 ;
  const [expenses,setExpenses] = useState([]);
  const [balance, setBalance] = useState<Balance>({
  totalExpense: 0,
  totalPaid: 0,
  totalPending: 0,
  count: 0,
});

  const router = useRouter();



  const handleSubmit = async () => {
    if (!category || !amount || !description) {
      alert('Please fill all fields');
      return;
    }

    const expenseData = {
      groupId,
      category,
      amount: parseFloat(amount),
      description,
    };

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3001/expense/create', expenseData, {
        withCredentials: true,
      });
      console.log('Expense saved:', res.data);
      alert('Expense added!');
      setCategory('');
      setAmount('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add expense:', error);
      alert('Failed to save expense');
    } finally {
      setLoading(false);
    }
  };


 const handleAddExpenseClick = () => {
  console.log("expense clicked");
  setShowExpenseForm(!showExpenseForm);
}



  const handleAddMemberClick = () => {
    console.log("Add Member clicked");
    setSearchOpen(!searchOpen);
  };
const handleAddUser = async (userId: number) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/group-members`,
      {
        userId,
        groupId, 
      },
      {
        withCredentials: true,
      }
    );
    console.log("User added:", res.data);
    toast.success('memeber Added');
  } catch (err) {
    console.error("Failed to add user:", err);
  }
};

  useEffect(() => {
  const fetchUsers = async () => {
    if (searchTerm.trim() === '') {
      setUsers([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3001/user/search?query=${searchTerm}`, {
        withCredentials: true,
      });
      setUsers(res.data); 
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const debounce = setTimeout(fetchUsers, 300);

  return () => clearTimeout(debounce);
}, [searchTerm]);

  useEffect(() => {
  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/group/expenses/${groupId}`, {
        withCredentials: true,
      });
      setExpenses(res.data);

    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  if (groupId) {
    fetchExpenses();
  }
}, [groupId]); 


const handelEventClick = (expensId:string)=>{
  console.log("Event cleicked");
    router.push(`/expense/${expensId}`)
  
}


 useEffect(() => {
  const fetchBalance = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/group/balance/${groupId}`, {
        withCredentials: true,
      });
      setBalance(res.data); 
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  };

  if (groupId) {
    fetchBalance();
  }
}, [groupId]);

 const [members, setMembers] = useState<Member[]>([]);

const fetchMembers = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/group/members/${groupId}`, {
      withCredentials: true,
    });
    setMembers(res.data);
  } catch (err) {
    console.error('Error fetching members:', err);
  }
};

useEffect(() => {
  if (groupId) fetchMembers();
}, [groupId]);



  return (
    <>
  
      <Navbar />
      <Box sx={{ p: 3 }}>
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

    <ToastContainer/>
    <Button
      onClick={handleAddMemberClick}
      variant="outlined"
      startIcon={<AddBoxIcon />}
    >
      Add Member
    </Button>
   <Box  sx={{display:"flex", gap:1}}>
      {members.map((m) => (
        <MemberCard
  key={m.id}
  id={m.id}
  avatar={m.avatar}
  name={`${m.first_name}`}
  groupId={groupId}
  onDelete={() => fetchMembers()} // re-fetch after deletion
/>
      ))}
    </Box>
    {/* Balance Box - Center */}
    <Box
      sx={{
        px: 3,
        py: 2,
        mx: 2,
        borderRadius: 2,
        backgroundColor: '#68b4a1ff',
        boxShadow: 1,
        textAlign: 'center',
        minWidth: 200,
        width:"250px"

      }}
    >
     <Typography variant="body1">Your Balance</Typography>
<Typography variant="h5" fontWeight="bold" color={balance.totalPending < 0 ? 'error' : 'success.main'}>
  ₹{balance.totalPending}
</Typography>

<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant="body2">Payment</Typography>
    <Typography fontWeight="bold">₹{balance.totalPaid}</Typography>
  </Box>

  <Box sx={{ borderLeft: '1px solid #ccc', mx: 2, height: 40 }} />

  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography variant="body2">Expense</Typography>
    <Typography fontWeight="bold">₹{balance.totalExpense}</Typography>
  </Box>
</Box>

    </Box>

    {/* Add Expenses Button - Right */}
  <Button
  variant="outlined"
  onClick={handleAddExpenseClick}
  startIcon={<AddBoxIcon />}
>
  Add Expense
</Button>

  </Box>


 {
 searchOpen && (
  <Box sx={{ mt: 2 }}>
    <TextField
      variant="outlined"
      placeholder="Search by email or name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#fff' }} />
          </InputAdornment>
        ),
        style: {
          color: '#fff',               
        },
      }}
      sx={{
        maxWidth: 400,
        bgcolor: '#1e1e1e',           
        input: { color: '#fff' },      
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ccc',        
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#fff',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#4fc3f7',      
        },
      }}
      fullWidth
    />
    <Box sx={{ mt: 2 }}>
  {users.length > 0 ? (
    users.map((user: any) => (
      <Box
        key={user.id}
        sx={{
          p: 2,
          border: '1px solid #ccc',
          borderRadius: 2,
          my: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: '#1e1e1e', 
          color: '#fff',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#bbb' }}>
            {user.email}
          </Typography>
        </Box>

      <Button
  variant="contained"
  size="small"
  startIcon={<AddIcon sx={{ color: '#fff' }} />}
  onClick={() => handleAddUser(user.id)}
  sx={{
    textTransform: 'none',
    backgroundColor: '#4caf50', 
    color: '#fff',            
    '&:hover': {
      backgroundColor: '#43a047', 
    },
  }}
>
  Add
</Button>


      </Box>
    ))
  ) : searchTerm !== '' ? (
    <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
      No users found.
    </Typography>
  ) : null}
</Box>
  </Box>
  
)}




<Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
  <Box sx={{ width: '100%', maxWidth: 500 }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
      <ReceiptLongIcon fontSize="medium" /> Expenses
    </Typography>
    {expenses.length === 0 ? (
      <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
        No expenses yet.
      </Typography>
    ) : (
      expenses.map((exp: any) => (
        <Box
          key={exp.id}
          sx={{
            mb: 2,
            p: 2.5,
            borderRadius: 3,
            boxShadow: 2,
            background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CategoryIcon sx={{ color: '#1976d2', fontSize: 36 }} />
          <Box sx={{ flex: 1 }}  onClick={()=>handelEventClick(exp.id)}>
            <Typography fontWeight="bold" sx={{ color: '#1976d2' }}>
              {exp.category.charAt(0).toUpperCase() + exp.category.slice(1)}
            </Typography>
            <Typography sx={{ color: '#333', mt: 0.5 }}>
              {exp.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {exp.createdAt ? new Date(exp.createdAt).toLocaleString() : ''}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AttachMoneyIcon sx={{ color: '#388e3c' }} />
            <Typography fontWeight="bold" sx={{ color: '#388e3c', fontSize: 18 }}>
              {exp.amount}
            </Typography>
          </Box>
        </Box>
      ))
    )}
  </Box>
</Box>




{showExpenseForm && (
  <Box
    sx={{
      position: 'fixed',         
      bottom: 20,                
      right: 20,                 
      zIndex: 1300,              
    }}
  >
    <Box
      sx={{
        width: 350,
        bgcolor: '#ffffff',
        p: 3,
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <Typography variant="h6" mb={2}>
        Add Expense
      </Typography>

      <TextField
        select
        fullWidth
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ mb: 2 }}
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Expense'}
      </Button>
    </Box>
  </Box>
)}





</Box>

    </>
  );
}
