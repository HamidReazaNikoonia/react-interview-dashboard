import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
            backIcon,
            sx = {},
            title,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();

        return (
            <Card
                ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderColor: theme.palette.primary[200] + 25,
                    ':hover': {
                        boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
                    },
                    ...sx
                }}
            >
                {backIcon && (
                    <Link to={backIcon}>
                        <ArrowBackIcon fontSize="large" sx={{ m: 3, cursor: 'pointer' }} />
                    </Link>
                )}
                {/* card header and action */}
                {title && (
                    <CardHeader
                        sx={headerSX}
                        title={darkTitle ? <Typography variant="h3">{title}</Typography> : title}
                        action={secondary}
                    />
                )}

                {/* content & header divider */}
                {title && <Divider />}

                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    shadow: PropTypes.string,
    backIcon: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
