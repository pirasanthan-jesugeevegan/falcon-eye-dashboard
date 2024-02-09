import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

import MainCard from 'components/Cards/MainCard';
import TotalIncomeCard from 'components/Cards/Skeleton/TotalIncomeCard';

const CardWrapper = styled(MainCard)(({ theme, backgroundColor }) => ({
  backgroundColor: theme.palette.mode === 'light' ? backgroundColor && theme.palette[backgroundColor]?.dark : theme.palette.dark.dark,
  color: backgroundColor && theme.palette[backgroundColor]?.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${
      backgroundColor ? theme.palette[backgroundColor][200] : theme.palette.warning.dark
    } -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${
      backgroundColor ? theme.palette[backgroundColor][200] : theme.palette.warning.dark
    } -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

const SmallCard = ({ isLoading, title, subtitle, result, icon, backgroundColor }) => {
  const theme = useTheme();
  const resultColor = (backgroundColor, result) => {
    if (result === 'OK') {
      return theme.palette.success.main;
    } else if (result === 'ERROR') {
      return theme.palette.orange.dark;
    } else if (backgroundColor) {
      return '#fff';
    } else {
      return 'black';
    }
  };
  return (
    <>
      {isLoading || String(title).includes('undefined') || String(result).includes('undefined') ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false} backgroundColor={backgroundColor} sx={{ boxShadow: theme.shadows[10] }}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor:
                        theme.palette.mode === 'light'
                          ? backgroundColor
                            ? theme.palette[backgroundColor][800]
                            : theme.palette.warning.light
                          : theme.palette.dark.main,
                      color: backgroundColor ? '#fff' : theme.palette.warning.dark
                    }}
                  >
                    {icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={
                    <Typography variant="h4" sx={{ color: backgroundColor && '#fff' }}>
                      {title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="subtitle2" sx={{ color: backgroundColor ? 'primary.light' : theme.palette.grey[500], mt: 0.25 }}>
                      {subtitle}
                    </Typography>
                  }
                />
                <Typography variant="h2" sx={{ color: resultColor(backgroundColor, result) }}>
                  {result}
                </Typography>
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

SmallCard.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  result: PropTypes.string,
  icon: PropTypes.node,
  backgroundColor: PropTypes.string
};

export default SmallCard;
