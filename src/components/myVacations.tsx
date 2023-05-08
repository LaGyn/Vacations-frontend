import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import ApplyForVacation from "./applyForVacation";
import { useEffect, useState } from "react";
import { VacationRequest } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import requestService from "../services/vacRequests";
import Remove from "./Remove";

interface ExpandableRowProps {
    request: VacationRequest;
}

const renderMyVacations = () => {
    const [ requests, setRequests ] = useState<VacationRequest[]>([]);

    useEffect(() => {
        axios.get<VacationRequest[]>(`${apiBaseUrl}/requests/456789`).then(res => {
            setRequests(res.data as VacationRequest[]);
        })
        console.log(requests);
    }, [])

    // const deleteRequest = (id: number) => {
    //     console.log(`poistetaan ${id}`);

    // }

    // const requestRef = useRef();
    const addRequest = (requestObject: VacationRequest) => {
        // requestRef.current()
        requestService
            .create(requestObject)
            .then(returnedRequest => {
                setRequests(requests.concat(returnedRequest))
            })
    };
    
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
                                <TableBody>
                                    <ApplyForVacation createRequest={addRequest}/>
                                    <TableCell>
                                        <Remove key={request.id} request={request}/>
                                    </TableCell>
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
            <Box>
                <Typography variant="h5">My Vacations</Typography>
                <Typography>Spent holidays: </Typography>
                <Typography>Remaining holidays: </Typography>
            </Box>
            <Box>
                <Typography>Apply for vacation</Typography>
                <ApplyForVacation createRequest={addRequest}/>
            </Box>
            <TableContainer>
                <Table aria-label="collapsible table" style={{ marginBottom: "1em" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ paddingLeft: "3em" }}>Vacation type</TableCell>
                            <TableCell>Employee</TableCell>
                            <TableCell>Days</TableCell>
                            <TableCell>Start date</TableCell>
                            <TableCell>End date</TableCell>
                            <TableCell>Remaining days</TableCell>
                            <TableCell>Status</TableCell>
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

export default renderMyVacations;