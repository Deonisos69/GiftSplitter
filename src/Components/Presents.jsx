/* eslint-disable react/prop-types */
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { usePresentStore } from "../db/usePresentStore";
import IconButton from "@mui/material/IconButton";

export default function PeopleAdder({animation = "animate__slideInRight"}) {
  const presents = usePresentStore((state) => state.presents);
  const deletePresent = usePresentStore((state) => state.deletePresent);

  return (
    <TableContainer className={"animate__animated animate__faster table " + animation}>
      <Table size="small" padding="none">
        <TableHead>
          <TableRow className="tableTop">
            <TableCell>Von</TableCell>
            <TableCell>An</TableCell>
            <TableCell>Titel</TableCell>
            <TableCell>Preis</TableCell>
            <TableCell>Bezahlt von</TableCell>
            <TableCell />
          </TableRow>
          <TableRow className="tableSecond"></TableRow>
        </TableHead>
        <TableBody>
          {presents.map((present) => (
            <TableRow key={present.id} className="animate__animated animate__fadeIn tableElement">
              <TableCell>{present.from.map((from) => from.name).join(", ")}</TableCell>
              <TableCell>{present.to}</TableCell>
              <TableCell>{present.name}</TableCell>
              <TableCell>{present.price}</TableCell>
              <TableCell>{present.paidBy.name}</TableCell>
              <TableCell>
                <IconButton onClick={() => deletePresent(present.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
