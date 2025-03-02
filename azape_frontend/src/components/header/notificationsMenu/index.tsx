import { useState } from 'react';
import './styles.scss'
import { Box, Grid, IconButton, Popover, Typography } from '@mui/material';
import NotificationIcon from '../../../assets/notificationIcon.png';

export function NotificationMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const notifications: string[] = [];

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton onClick={handleOpen} color='inherit' className='noBorderRadius'>
                <Grid container spacing={3} className='notifications'>
                    <Grid item xs={3}>
                        <img src={NotificationIcon} alt="" />
                    </Grid>
                    <Grid item xs>
                        Avisos
                    </Grid>
                </Grid>
            </IconButton>

            <Popover 
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box sx={{ width: 250, p: 2 }}>
                    {notifications.length === 0 ? (
                        <Typography color="textSecondary" align="center">
                            Sem notificações
                        </Typography>
                    ) : (
                        notifications.map((notification, index) => (
                            <Typography key={index} sx={{ mb: 1 }}>
                                {notification}
                            </Typography>
                        ))
                    )}
                </Box>
            </Popover>
        </>
    )
}