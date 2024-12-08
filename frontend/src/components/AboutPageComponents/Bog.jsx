"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  { slNo: 1, name: "Prof. S.M. Chatterjee", designation: "Chairman", profession: "Eminent Educationist", position: "Nominee of the Trust" },
  { slNo: 2, name: "Mr. G. Roy Chowdhury or his nominee Mr. Pradyut Biswas", designation: "Trust's Chairman", profession: "Technopreuner", position: "Nominee of the Trust" },
  { slNo: 3, name: "Mrs. M. Roychowdhury or her nominee", designation: "Member", profession: "Technopreuner", position: "Nominee of the Trust" },
  { slNo: 4, name: "Mr. S. Roychowdhury or his nominee Mr. B.R. Sarkar", designation: "Member", profession: "Technopreuner", position: "Nominee of the Trust" },
  { slNo: 5, name: "Mr. T. K. Ghosh or his nominee Mr. H. Mazumder", designation: "Member", profession: "Technopreuner", position: "Nominee of the Trust" },
  { slNo: 6, name: "Prof. (Dr.) Sajal Dasgupta, Director of Technical Education, Govt of WB", designation: "Member (Ex-Officio)", profession: "Director - Engineer", position: "Nominee of the State Govt." },
  { slNo: 7, name: "Nominee of AICTE", designation: "Member", profession: "Regional Officer : Ex-Officio", position: "" },
  { slNo: 8, name: "Prof. Goutam Banerjee, Dept of EE, BESU, Shibpur, Kolkata", designation: "Member", profession: "Engineer", position: "Representative from WBUT" },
  { slNo: 9, name: "Prof. (Dr) Arijit Chakraborty, Govt College of Engg & Textile Technology, Sreerampur", designation: "Member", profession: "Engineer", position: "Educationist Nominated by State Govt as per AICTE guidelines" },
  { slNo: 10, name: "Mr. A. K. Roy", designation: "Member", profession: "Technical Service", position: "Nominee of the Trust" },
  { slNo: 11, name: "Mr. A. K. Ghosh", designation: "Member", profession: "Technical Service", position: "Nominee of the Trust" },
  { slNo: 12, name: "Mr. Anit Adhikari", designation: "Member", profession: "Technical Service", position: "Nominee of the Trust" },
  { slNo: 13, name: "Dr. A. Ray", designation: "Member", profession: "Technical Service", position: "Nominee of the Trust" },
  { slNo: 14, name: "Prof. Suman Chattopadhyay", designation: "Member", profession: "Academician", position: "" },
  { slNo: 15, name: "Mr. Arijit Datta", designation: "Member", profession: "Technical Service", position: "" },
  { slNo: 16, name: "Representative from Professor", designation: "Member", profession: "Teaching", position: "" },
  { slNo: 17, name: "Representative from Associate / Asst. Professor", designation: "Member", profession: "Teaching", position: "" },
];

export default function Bog() {
  const [currentPage, setCurrentPage] = React.useState(0);
  const rowsPerPage = 5;

  const paginatedData = data.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );


  const emptyRows = Array.from(
    { length: rowsPerPage - paginatedData.length },
    (_, index) => (
      <TableRow key={`empty-${index}`}>
        <TableCell colSpan={5}>&nbsp;</TableCell>
      </TableRow>
    )
  );

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold text-primary mb-4">
          Board of Governers
        </h1>
      <div className="rounded-md border">
      
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sl No</TableHead>
              <TableHead>Name of the Members</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Profession</TableHead>
              <TableHead>Position in BOG</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.slNo}>
                <TableCell>{row.slNo}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>{row.profession}</TableCell>
                <TableCell>{row.position}</TableCell>
              </TableRow>
            ))}
            {emptyRows}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(data.length / rowsPerPage) - 1)
            )
          }
          disabled={currentPage >= Math.ceil(data.length / rowsPerPage) - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
