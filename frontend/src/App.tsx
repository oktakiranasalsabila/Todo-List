/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import "./App.css";

interface MahasiswaProps {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [mahasiswa, setMahasiswa] = useState<MahasiswaProps[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [clickId, setClickId] = useState<number | null>(null);
  useEffect(() => {
    axios
      .get<MahasiswaProps[]>("http://localhost:5000/mahasiswa")
      .then((response) => {
        setMahasiswa(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddMahasiswa = () => {
    if (!newName || !newEmail) {
      return;
    }
    axios
      .post("http://localhost:5000/mahasiswa", {
        name: newName,
        email: newEmail,
      })
      .then((response) => {
        setMahasiswa((mahasiswa) => [...mahasiswa, response.data]);
        setNewName("");
        setNewEmail("");
      })
      .catch((error) => {
        console.error("Error adding new mahasiswa:", error);
      });
  };

  const handleDeleteMahasiswa = (id: number) => {
    axios
      .delete(`http://localhost:5000/mahasiswa/${id}`)
      .then(() => {
        setMahasiswa((prevMahasiswa) =>
          prevMahasiswa.filter((mahasiswa) => mahasiswa.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting mahasiswa:", error);
      });
  };
  const handleUpdateMahasiswa = (id: number) => {
    const updatedMahasiswa = mahasiswa.map((mahasiswa) => {
      if (mahasiswa.id === id) {
        return { ...mahasiswa, name: newName, email: newEmail };
      }
      return mahasiswa;
    });

    axios
      .patch(`http://localhost:5000/mahasiswa/${id}`, {
        name: newName,
        email: newEmail,
      })
      .then((response) => {
        setMahasiswa(updatedMahasiswa);
        setNewName("");
        setNewEmail("");
      })
      .catch((error) => {
        console.error("Error updating mahasiswa:", error);
      });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (clickId !== null) {
        handleUpdateMahasiswa(clickId);
      } else {
        handleAddMahasiswa();
      }
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 500,
          padding: 3,
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 42 }} color="text.secondary">
            Mahasiswa List
          </Typography>
          <TextField
            id="outlined-helperText"
            sx={{ mb: 2 }}
            label="Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            id="outlined-helperText"
            sx={{ mb: 2 }}
            label="Email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={() =>
              clickId !== null
                ? handleUpdateMahasiswa(clickId)
                : handleAddMahasiswa()
            }
          >
            {clickId !== null ? "Edit Mahasiswa" : "+ ADD"}
          </Button>
          <Card sx={{ minWidth: 400, mt: 2 }}>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableBody>
                    {mahasiswa.map((mahasiswa) => (
                      <TableRow key={mahasiswa.id}>
                        <TableCell>{mahasiswa.name}</TableCell>
                        <TableCell>{mahasiswa.email}</TableCell>
                        <TableCell>
                          <Stack direction="row">
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              onClick={() => {
                                setNewName(mahasiswa.name);
                                setNewEmail(mahasiswa.email);
                                setClickId(mahasiswa.id);
                              }}
                            >
                              {clickId === mahasiswa.id && (
                                <ClearIcon style={{ color: "green" }} />
                              )}
                              {clickId !== mahasiswa.id && (
                                <EditIcon style={{ color: "green" }} />
                              )}
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() =>
                                handleDeleteMahasiswa(mahasiswa.id)
                              }
                            >
                              <DeleteIcon style={{ color: "red" }} />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
