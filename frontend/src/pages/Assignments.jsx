import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import api from "../services/api";

export default function Assignments() {
  const [equipment, setEquipment] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [equipmentId, setEquipmentId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [quantity, setQuantity] = useState("");

  const loadData = async () => {
    try {
      const eq = await api.get("/equipment");
      setEquipment(eq.data);

      const as = await api.get("/assignments");
      setAssignments(as.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addAssignment = async () => {
    if (!equipmentId || !assignedTo || !quantity) {
      alert("Fill all fields");
      return;
    }

    try {
      await api.post("/assignments", {
        equipmentId,
        assignedTo,
        quantity: Number(quantity),
      });

      setEquipmentId("");
      setAssignedTo("");
      setQuantity("");

      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Assignment Failed");
    }
  };

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        Assignment Management
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
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

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Assigned To"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              fullWidth
              sx={{ height: "56px" }}
              onClick={addAssignment}
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
            <TableCell>Assigned To</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {assignments.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.equipment?.name}</TableCell>
              <TableCell>{item.assignedTo}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                {new Date(item.assignmentDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}