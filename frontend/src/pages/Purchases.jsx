import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import api from "../services/api";

export default function Purchases() {
  const [equipment, setEquipment] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const [equipmentId, setEquipmentId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");

  const loadEquipment = async () => {
    try {
      const res = await api.get("/equipment");
      setEquipment(res.data);

      if (res.data.length > 0) {
        setEquipmentId(res.data[0].id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadPurchases = async () => {
    try {
      const res = await api.get("/purchases");
      setPurchases(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadEquipment();
    loadPurchases();
  }, []);

  const addPurchase = async () => {
    if (!equipmentId || !quantity || !supplier) {
      alert("Fill all fields");
      return;
    }

    try {
      await api.post("/purchases", {
        equipmentId,
        quantity: Number(quantity),
        supplier,
      });

      setQuantity("");
      setSupplier("");

      loadPurchases();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
      >
        Purchase Management
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Equipment"
              value={equipmentId}
              onChange={(e) => setEquipmentId(e.target.value)}
            >
              {equipment.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Supplier"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{ height: "56px" }}
              onClick={addPurchase}
            >
              ADD
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Equipment</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell>{purchase.equipment?.name}</TableCell>
              <TableCell>{purchase.quantity}</TableCell>
              <TableCell>{purchase.supplier}</TableCell>
              <TableCell>
                {new Date(
                  purchase.purchaseDate
                ).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}