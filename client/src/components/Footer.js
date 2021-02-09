import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button, Container, FormControl, FormHelperText, IconButton, Input, InputLabel } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'grey',
        flexGrow: 1,
        backgroundColor: '#292929',
        marginTop: theme.spacing(2),
    },

    paper: {
        padding: theme.spacing(3),
        margin: 'auto',
    },

    socialIcons: {
        display: 'flex',
        justifyContent: 'center',
    },

    link: {
        color: 'inherit',
        textDecoration: 'none',
    },

    image: {
        width: 128,
        height: 128,
    },

    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography gutterBottom variant="subtitle1">
                            <h1>About</h1>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type
                                specimen book. It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was popularised in
                                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker including
                                versions of Lorem Ipsum.
                            </p>
                        </Typography>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Grid className={classes.paper}>
                                <Typography gutterBottom variant="subtitle1">
                                    <h4 style={{borderBottom: 'groove'}}>Meet The Team</h4>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <h6><strong>DEBOPRIYA DEY</strong></h6>
                                    <small>
                                        <a href="mailto:debodey158@gmail.com" className={classes.link} style={{textDecoration: 'none'}}> 
                                            <EmailIcon></EmailIcon> debodey158@gmail.com
                                        </a>
                                    </small>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <h6><strong>GOURAV MODI</strong></h6>
                                    <small>
                                        <a href="mailto:gouravmodi321@gmail.com" className={classes.link} style={{textDecoration: 'none'}}> 
                                            <EmailIcon></EmailIcon> gouravmodi321@gmail.com
                                        </a>
                                    </small>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Grid className={classes.paper}>
                                <Typography variant="subtitle1">
                                    <h4 style={{ textAlign: 'center' }}>Follow Us</h4>
                                </Typography>
                                <span className={classes.socialIcons}>
                                    <IconButton>
                                        <a href="#" title="facebook" className={classes.link}><FacebookIcon></FacebookIcon></a>
                                    </IconButton>
                                    <IconButton>
                                        <a href="#" title="instagram" className={classes.link}><InstagramIcon></InstagramIcon></a>
                                    </IconButton>
                                    <IconButton>
                                        <a href="#" title="twitter" className={classes.link}><TwitterIcon></TwitterIcon></a>
                                    </IconButton>
                                    <IconButton>
                                        <a href="#" title="pinterest" className={classes.link}><PinterestIcon></PinterestIcon></a>
                                    </IconButton>
                                </span>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Grid className={classes.paper}>
                                <p style={{ marginBottom: '0' }}>Keep up with new updates from us</p>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                                    <Input id="my-input" aria-describedby="my-helper-text" />
                                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                                    <Button variant="outlined" color="primary">
                                        Subscribe
                                    </Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <hr style={{ backgroundColor: 'white' }} />
                <Typography variant="body2" gutterBottom>
                    <p style={{ textAlign: 'center' }}>&copy; TravellMate </p>
                </Typography>
            </Container>
        </div>
    );
}
