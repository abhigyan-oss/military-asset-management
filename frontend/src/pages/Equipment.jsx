import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import api from "../services/api";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const loadEquipment = async () => {
    try {
      const res = await api.get("/equipment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEquipment(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  const addEquipment = async () => {
    try {
      await api.post(
        "/equipment",
        {
          name,
          type,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setType("");
      setDescription("");

      loadEquipment();
    } catch (err) {
      alert("Unable to add equipment");
    }
  };

  const deleteEquipment = async (id) => {
    await api.delete(`/equipment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadEquipment();
  };

  return (
    <div style={{ padding: 30 }}>
      <Typography variant="h4" gutterBottom>
        Equipment Management
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mr: 2 }}
        />

        <TextField
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ mr: 2 }}
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mr: 2 }}
        />

        <Button variant="contained" onClick={addEquipment}>
          Add
        </Button>
      </Paper>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {equipment.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => deleteEquipment(item.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}