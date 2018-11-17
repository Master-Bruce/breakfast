import * as React from "react";
import {Election} from "../interfaces/Election";
import {style} from "typestyle";
import {theme} from "../../layout/styles/styles";
import OpenInNew from "@material-ui/icons/OpenInNew"
import Add from "@material-ui/icons/Add"
import Refresh from "@material-ui/icons/Refresh"
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Button from "@material-ui/core/Button/Button";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {MoreMenu} from "../../layout/components/MoreMenu";
import IconButton from "@material-ui/core/IconButton/IconButton";
import cc from "classcat"
import {ElectionState} from "../interfaces/ElectionState";
import {StatusBadge} from "../../layout/components/StatusBadge";
import Lock from "@material-ui/icons/Lock";

interface ElectionListProps {
    elections: Election[]
    activeElectionId?: number

    handleActiveChange(id)

    handleCodesClick(id)

    handleRowClick(id)

    handleNewElection()

    handleMenuItemSelected(item: number)
}

const styles = ({
    root: style({
        width: '100%',
        height: '100%',
    }),
    paper: style({
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    }),
    spacer: style({
        flex: '1 1 100%',
    }),
    tableButtons: style({
        flex: '0 0 auto',
        // flexDirection: 'column'
    }),
    table: style({
        minWidth: 700,
    }),
    row: style({
        cursor: "pointer"
    }),
    footer: style({
        padding: 5,
    }),
    fab: style({
        position: "absolute",
        bottom: "5%",
        right: "5%",
    }),
    finished: style({
        backgroundColor: theme.palette.text.hint,
    }),
});

const options = [
    {
        id: 0,
        text: "Refresh",
        icon: <Refresh/>,
    }, {
        id: 1,
        text: "Abgeschlossene anzeigen",
        icon: <Lock/>
    }
];
export const ElectionList = ({elections, activeElectionId, handleActiveChange, handleRowClick, handleCodesClick, handleNewElection, handleMenuItemSelected}: ElectionListProps) => (
    <div className={styles.root}>
        <Paper className={styles.paper}>
            <Toolbar>
                <div>
                    <Typography variant="h6">
                        Wahlgänge
                    </Typography>
                </div>
                <div className={styles.spacer}/>
                <div className={styles.tableButtons}>
                    <IconButton onClick={handleNewElection}>
                        <Add/>
                    </IconButton>
                    <MoreMenu options={options} onItemSelected={handleMenuItemSelected}/>
                </div>
            </Toolbar>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Kandidaten</TableCell>
                        <TableCell numeric>Codes</TableCell>
                        <TableCell numeric>Abgegebene Stimmen</TableCell>
                        <TableCell>Aktiv</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {elections.map(election => (
                        <TableRow key={election.id}
                                  className={cc([styles.row, election.state == ElectionState.FINISHED && styles.finished])}>
                                <TableCell component="th" scope="row" onClick={() => handleRowClick(election.id)}>
                                    {election.title}
                                </TableCell>
                                <TableCell onClick={() => handleRowClick(election.id)}>
                                    {election.candidateNames}
                                </TableCell>
                                <TableCell numeric onClick={() => handleRowClick(election.id)}>
                                    {election.codes && election.codes.length}
                                </TableCell>
                                <TableCell numeric onClick={() => handleRowClick(election.id)}>
                                    {election.voteCount}
                                </TableCell>
                                <TableCell>
                                    {election.state == ElectionState.FINISHED ?
                                        <StatusBadge state={election.state}/>
                                        :
                                        <Checkbox
                                            checked={election.id == activeElectionId}
                                            onChange={() => handleActiveChange(election.id)}
                                            value={election.id.toString()}
                                        />
                                    }
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={() => handleCodesClick(election)}>
                                        Codes<OpenInNew/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </Paper>
    </div>
);