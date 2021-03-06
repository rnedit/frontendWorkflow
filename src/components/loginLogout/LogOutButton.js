import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import {useHistory} from "react-router-dom";
import {getDefaultUser, editCurrentUser} from "../../reducers/currentUser";
import {setDefaultProfiles} from "../../reducers/accessProfile";
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

function LogOutButton(props: any) {
    let history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleOnClick = () => {
        history.push('/signin')
        props.editCurrentUser(props.getDefaultUser())
        props.setDefaultProfiles()
    }


    const open = Boolean(anchorEl);
    return (
        <div className={classes.root}>
                <IconButton onClick={handleOnClick} aria-label="logout"
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}

                >
                    <ExitToAppTwoToneIcon />
                </IconButton>
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography>Выйти</Typography>
                </Popover>
        </div>
    );
}

export default connect(null,{editCurrentUser,getDefaultUser,setDefaultProfiles})(LogOutButton);