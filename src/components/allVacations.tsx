/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material"
import { useEffect, useState } from "react";
import { VacationRequest } from "../types";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import requestService from "../services/vacRequests";

interface ExpandableRowProps {
    request: VacationRequest;
}

const renderAllVacationRequests = () => {
    const [ requests, setRequests ] = useState<VacationRequest[]>([]);

    useEffect(() => {
        requestService.getAll()
        .then(requests =>
            setRequests(requests)
        )
    }, [])

/**
 * Styled expandable table cell
 */
const StyledTableCell = styled(TableCell)(() => ({
    "& .pending": {
        color: "#FF493C"
    },
    "& .approved": {
        color: "#45cf36"
    },
    
    // eslint-disable-next-line no-restricted-globals
    ...(status === 'APPROVED' ? { "&.approved": {} } : { "&.pending": {} })
}));

const ExpandableRow = (
    { request }: ExpandableRowProps
        
    ) => {
    const [open, setOpen] = useState(false);
    
    return (
    <>
        <TableRow key={ request.id }>
            <StyledTableCell component="th" scope="row">{ request.type }</StyledTableCell>
            <StyledTableCell>{ request.person }</StyledTableCell>
            <StyledTableCell>days</StyledTableCell>
            <StyledTableCell>{ request.startDate }</StyledTableCell>
            <StyledTableCell>{ request.endDate }</StyledTableCell>
            <StyledTableCell>remaining days</StyledTableCell>
            <StyledTableCell sx={{ "&.pending": { color: "#FF493C" }, "&.approved": { color: "#45cf36" } }} className={request.status === "APPROVED" ? "approved" : "pending"}>{ request.status }</StyledTableCell>
            <StyledTableCell>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
            </StyledTableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                <Collapse in={ open } timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1, width: "100%" }}>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Message</TableCell>
                                    <TableCell>Created</TableCell>
                                    <TableCell/>
                                    <TableCell/>
                                    <TableCell/>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.values(requests).map(request => (
                                <TableRow key={ request.id }>
                                    <TableCell component="th" scope="row">{ request.message }</TableCell>
                                    <TableCell>{ request.created }</TableCell>
                                    <TableCell/>
                                    <TableCell/>
                                    <TableCell align="right"><Button variant="outlined" color="error" sx={{ color: "#F9473B" }}>DECLINED</Button></TableCell>
                                    <TableCell align="right"><Button variant="outlined" color="success" sx={{ color: "green" }}>APPROVED</Button></TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </>
    );
};


    
    return (
        <Box>
            <Typography style={{ width: "100%" }}>Employee Vacation Requests</Typography>
            <TableContainer style={{ width: "100%" }}>
                <Table aria-label="collapsible table" style={{ marginBottom: "1em" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vacation type</TableCell>
                            <TableCell>Employee</TableCell>
                            <TableCell>Days</TableCell>
                            <TableCell>Start date</TableCell>
                            <TableCell>End date</TableCell>
                            <TableCell>Remaining days</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {Object.values(requests).map((request: VacationRequest) => (
                        <ExpandableRow key={request.id} request={request}/>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
};

export default renderAllVacationRequests;