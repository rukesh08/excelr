import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
} from "@mui/material";

// Mock delivery orders data
const initialOrders = [
  {
    id: 1,
    customerName: "Alice Johnson",
    address: "123 Main St, Springfield",
    status: "pending",
  },
  {
    id: 2,
    customerName: "Bob Smith",
    address: "456 Elm St, Shelbyville",
    status: "accepted",
  },
];

const PartnerHome = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleAccept = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "accepted" } : order
      )
    );
  };

  const handleComplete = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "completed" } : order
      )
    );
  };

  return (
    <Box sx={{ maxWidth: 700, margin: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, Delivery Partner!
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Your Current Deliveries
      </Typography>

      {orders.length === 0 && (
        <Typography>No orders assigned yet.</Typography>
      )}

      <Stack spacing={2}>
        {orders.map(({ id, customerName, address, status }) => (
          <Card
            key={id}
            variant="outlined"
            sx={{
              backgroundColor:
                status === "completed" ? "#e0ffe0" : "background.paper",
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {customerName}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {address}
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography>Status: {status}</Typography>

              {status === "pending" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAccept(id)}
                  sx={{ mt: 1 }}
                >
                  Accept Delivery
                </Button>
              )}

              {status === "accepted" && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleComplete(id)}
                  sx={{ mt: 1 }}
                >
                  Mark as Completed
                </Button>
              )}

              {status === "completed" && (
                <Typography color="green" sx={{ mt: 1 }}>
                  Delivery completed
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default PartnerHome;
