import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import {style} from "typestyle";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {Responsive} from "../modules/layout/components/Responsive";
import {AuthInterface, AuthConsumer} from "../modules/auth/components/AuthContext";

interface LoginProps {
}

interface LoginState {
    user: string
    password: string
    showAdminLogin: boolean
}

const styles = {
    paper: style({
        padding: 30,
        marginTop: 20,
    })
};

export class Login extends React.Component<LoginProps, LoginState> {
    toggleAdminView = () => {
        const {showAdminLogin} = this.state;
        this.setState({showAdminLogin: !showAdminLogin})
    };

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            showAdminLogin: false,
        }
    }

    render() {
        const {user, password, showAdminLogin} = this.state;
        const userLabel = showAdminLogin ? 'Name' : 'Dein Code';
        const pwd = showAdminLogin ? password : 'ebujugend';
        return (
            <AuthConsumer>
                {({isAuthenticated, login}: AuthInterface) => (
                    <Responsive edgeSize={4}>
                        <Paper className={styles.paper}>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                login(user, pwd)
                            }}>
                                <Grid container direction={"column"} alignItems={"center"} justify={"center"}>
                                    <Grid>
                                        <Typography variant={"h2"} align={"center"}>Login</Typography>
                                    </Grid>
                                    <Grid>
                                        <TextField
                                            required
                                            value={user}
                                            label={userLabel}
                                            variant={"outlined"}
                                            margin={"normal"}
                                            onChange={(event) => this.setState({user: event.target.value})}
                                        />
                                    </Grid>
                                    {showAdminLogin &&
                                    <Grid>
                                        <TextField
                                            required
                                            value={password}
                                            label="Password"
                                            margin="normal"
                                            variant={"outlined"}
                                            onChange={(event) => this.setState({password: event.target.value})}
                                        />
                                    </Grid>
                                    }
                                    <Button variant={"outlined"} type="submit" fullWidth> Login</Button>
                                </Grid>
                            </form>
                        </Paper>
                        <Typography onClick={this.toggleAdminView}>Admin</Typography>
                    </Responsive>
                )}
            </AuthConsumer>
        );
    }
}