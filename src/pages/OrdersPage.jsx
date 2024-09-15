import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import OrdersByCustomerID from '../inputs/OrdersByCustomerID';
import OrdersByAddressID from '../inputs/OrdersByAddressID';
import OrdersByStatus from '../inputs/OrdersByStatus';
import OrderDateBetween from '../inputs/OrderDateBetween';
import PriceRange from '../inputs/PriceRange';

function OrdersPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container disableGutters maxWidth={false} sx={{ padding: 0 }}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', padding: 0, margin: 0 }}>
          <Typography
            align="center"
            variant="h2"
            sx={{ padding: '20px 0', fontWeight: 'bold' }}
          >
            Find Orders
          </Typography>
          <Card sx={{ margin: 2, boxShadow: 3 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="Order filter tabs"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                paddingX: 2,
              }}
            >
              <Tab label="Customer" />
              <Tab label="Price Range" />
              <Tab label="Address" />
              <Tab label="Status" />
              <Tab label="Dates" />
            </Tabs>
            <CardContent>
              {value === 0 && <OrdersByCustomerID />}
              {value === 1 && <PriceRange />}
              {value === 2 && <OrdersByAddressID />}
              {value === 3 && <OrdersByStatus />}
              {value === 4 && <OrderDateBetween />}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default OrdersPage;
