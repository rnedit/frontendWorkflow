import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classNames from 'classnames'
import LoginLogout from "./loginLogout/LoginLogout";
import { connect } from 'react-redux';
import LetterAvatars from "./LetterAvatars/la";
import { useLocation } from "react-router-dom";
import ButtonSignUp from "./ButtonSignUp";

import TabPanelTabs from '../components/tsx/tabs/TabPanelTabs'
import TabPanelTabsOnTopMenu from '../components/tsx/tabs/TabPanelTabsOnTopMenu'

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { NavTab } from "react-router-tabs";
import { useTranslation } from 'react-i18next';
import { ROLES } from '../components/security/ERules'
import useGenerateLinkAccessForLeftAndTopAndBodyNav from "./utils/useGenerateLinkAccessForLeftAndTopAndBodyNav"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },

    appBar2: {

        marginBottom: theme.spacing(5),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    indicator: {
        backgroundColor: "white"
    },
    wrapper: {
        width: "100%",
        display: "inline-flex",
        alignItems: "first baseline",
        flexDirection: "row",
        justifyContent: "left",
    },
}));

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,

    };
}

function TopAppBarAndLeftMenu(props) {
    //console.log("Render TopAppBarAndLeftMenu")
    const { t } = useTranslation();
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const adminModerRoles = [ROLES.MODERATOR , ROLES.ADMIN]
    const roleAccess = props.roles.some(r => adminModerRoles.includes(r) );

    const [value, setValue] = React.useState(0);
    const [valueTopMenu, setValueTopMenu] = React.useState(0);

    const handleChange = useCallback(
        (event, newValue) => {
            setValue(newValue);
        },
        [],
    )


    const handleDrawerToggle = useCallback(
        () => {
            setMobileOpen(!mobileOpen);
        },
        [mobileOpen],
    )

    const myCallback = useCallback(
        (dataFromChild) => {
            setValueTopMenu(dataFromChild);
        },
        [],
    )

    const AppBar1 = classNames(classes.appBar, classes.appBar2);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tab = query.get('tab')
    const stab = query.get('stab')
   

    const dataAccessProfile = useGenerateLinkAccessForLeftAndTopAndBodyNav(props.accessProfile, roleAccess);

    const leftMenuUserGen = useLeftMenuUserGen(dataAccessProfile)

     const drawer = (

        <div>

            <div className={classes.toolbar}>
                <div style={{ width: '100%' }}>
                    <Box display="flex" justifyContent="center" mx={1.5} px={1.5} >
                       
                   
                    </Box>
                    
                </div>
            </div>
            
            <Divider />
            <AppBar position="static" color="default">
                <Tabs
                    orientation="vertical"
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    value={tab ? Number(tab) : value}
                    aria-label="scrollable auto tabs"
                >
                    { leftMenuUserGen}

                </Tabs>
            </AppBar>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>



        </div>
    );

    const signupButton = (
        <Box >
            <ButtonSignUp />
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (

        <div className={classes.root}>

            <CssBaseline />

            <AppBar position="fixed" color="default" className={AppBar1}>
                <Toolbar>                     
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>


                    <div style={{ width: '100%' }}>
                        <Box display="flex" >
                            <Box flexGrow={1} >
                                <TabPanelTabsOnTopMenu value={tab ? Number(tab) : value} 
                                stab={stab ? Number(stab) : "0"} 
                                callback={myCallback} 
                                dataAccessProfile={dataAccessProfile}
                                />
                            </Box>
                            <Box>
                                <LetterAvatars username={props.username} />
                             </Box>
                            <Box >
                                <LoginLogout />
                            </Box>
                            {!props.loggedIn ? signupButton : ''}
                        </Box>
                    </div>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            <main className={classes.content}>

                <div className={classes.toolbar} />

                {/* props.children */}

                <TabPanelTabs t={t} value={tab ? Number(tab) : value}
                 valueTopMenu={stab ? Number(stab) : valueTopMenu}
                 dataAccessProfile={dataAccessProfile} />

            </main>

        </div>
    );
}

TopAppBarAndLeftMenu.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const mapStateToProps = function (state) {
    return {
        username: state.currentUser.user.username,
        loggedIn: state.currentUser.user.loggedIn,
        accessProfile: state.accessProfile.data,
        roles: state.currentUser.user.roles,
    }
}
export default connect(mapStateToProps)(TopAppBarAndLeftMenu);



const useLeftMenuUserGen = (dataAccessProfile) => {
    const classes = useStyles();
    const [state, setState] = React.useState([])
    const NavTabRef = React.forwardRef((props, ref) => <NavTab {...props} innerRef={ref} />)
    useEffect(() => {
        dataAccessProfile.map(p => {
            switch (p.name) {
                case "ACCESS_SZ": {
                    let d = <Tab key={p.count} component={NavTabRef} to={"/workflow?tab=" + p.count}
                    classes={{ wrapper: classes.wrapper }} label={"Внутренние документы"} {...a11yProps(p.count)} />
                    setState((prevState)=>{
                        return[...prevState, d]
                    })
                break;
                }
                   
                case "ACCESS_ORD":{
                    let d = <Tab key={p.count} component={NavTabRef} to={"/workflow?tab=" + p.count}
                    classes={{ wrapper: classes.wrapper }} label={"Приказы и ОРД"} {...a11yProps(p.count)} />
                    setState((prevState)=>{
                        return[...prevState, d]
                    })
                break;
                }
                   
                case "ACCESS_INDOC":{
                    let d = <Tab key={p.count} component={NavTabRef} to={"/workflow?tab=" + p.count}
                    classes={{ wrapper: classes.wrapper }} label={"Входящие документы"} {...a11yProps(p.count)} />
                    setState((prevState)=>{
                        return[...prevState, d]
                    })
                break;
                }
                   
                case "ACCESS_OUTDOC":{
                    let d = <Tab key={p.count} component={NavTabRef} to={"/workflow?tab=" + p.count}
                    classes={{ wrapper: classes.wrapper }} label={"Исходящие документы"} {...a11yProps(p.count)} />
                    setState((prevState)=>{
                        return[...prevState, d]
                    })
                break;
                }
                    
                case "ACCESS_STRUCT":{
                    let d = <Tab key={p.count} component={NavTabRef} to={"/workflow?tab=" + p.count}
                    classes={{ wrapper: classes.wrapper }} label={"Структура"} {...a11yProps(p.count)} />
                    setState((prevState)=>{
                        return[...prevState, d]
                    })
                break;
                }
                   
                case "ACCESS_SPRAV":{
                    let d = <Tab key={p.count} component={NavTabRef} to={"/workflow?tab=" + p.count}
                    classes={{ wrapper: classes.wrapper }} label={"Справочник"} {...a11yProps(p.count)} />
                    setState((prevState)=>{
                        return[...prevState, d]
                    })
                break;
                }
                   
                default:
                    break;
            }

            return null
        })

        return () => {
            setState([])  
        }
    }, [dataAccessProfile])
    

    return state
}