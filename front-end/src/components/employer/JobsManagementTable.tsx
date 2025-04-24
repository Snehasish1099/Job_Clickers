"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { JobHooks } from "@/src/containers/jobs/Hooks";
import { RootState } from "@/src/redux/configureStore";

const JobsManagementTable = () => {
  const { getAllJobsApiCall } = JobHooks();
  const router = useRouter();

  useEffect(() => {
    getAllJobsApiCall();
  }, []);

  const jobs = useSelector((state: RootState) => state.jobs.jobs);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/employer/jobs/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    // Add delete logic here
    console.log("Deleting job with id:", id);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Manage Your Jobs
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Company</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Posted On</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs && jobs.length > 0 ? (
              jobs.map((job: any) => (
                <TableRow key={job._id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(job._id)}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(job._id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No jobs posted yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JobsManagementTable;
