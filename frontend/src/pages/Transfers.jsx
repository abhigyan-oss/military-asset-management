import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import api from "../services/api";

export default function Transfers() {
  const [equipment, setEquipment] = useState([]);
  const [bases, setBases] = useState([]);
  const [transfers, setTransfers] = useState([]);

  const [equipmentId, setEquipmentId] = useState("");
  const [fromBaseId, setFromBaseId] = useState("");
  const [toBaseId, setToBaseId] = useState("");
  const [quantity, setQuantity] = useState("");

  const loadData = async () => {
    try {
      const eq = await api.get("/equipment");
      setEquipment(eq.data);

      const tr = await api.get("/transfers");
      setTransfers(tr.data);

      // If you have a Base API
      try {
        const bs = await api.get("/bases");
        setBases(bs.data);
      } catch {
        setBases([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addTransfer = async () => {
    if (!equipmentId || !fromBaseId || !toBaseId || !quantity) {
      alert("Fill all fields");
      return;
    }

    try {
      await api.post("/transfers", {
        equipmentId,
        fromBaseId,
        toBaseId,
        quantity,
      });

      setEquipmentId("");
      setFromBaseId("");
      setToBaseId("");
      setQuantity("");

      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Transfer Failed");
    }
  };

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        Transfer Management
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
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

          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              label="From Base"
              value={fromBaseId}
              onChange={(e) => setFromBaseId(e.target.value)}
            >
              {bases.map((base) => (
                <MenuItem key={base.id} value={base.id}>
                  {base.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              select
              fullWidth
              label="To Base"
              value={toBaseId}
              onChange={(e) => setToBaseId(e.target.value)}
            >
              {bases.map((base) => (
                <MenuItem key={base.id} value={base.id}>
                  {base.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              sx={{ height: "56px" }}
              onClick={addTransfer}
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
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transfers.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.equipment?.name}</TableCell>
              <TableCell>{t.fromBase?.name}</TableCell>
              <TableCell>{t.toBase?.name}</TableCell>
              <TableCell>{t.quantity}</TableCell>
              <TableCell>
                {new Date(t.transferDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}