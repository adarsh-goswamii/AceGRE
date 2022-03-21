import { Typography } from "@material-ui/core";

export const H1 = ({ children }) => {
    return <Typography variant="h1">{children}</Typography>;
};

export const H3 = ({ children }) => {
    return <Typography variant="h3">{children}</Typography>;
};

export const Heading = ({ children }) => {
    return <Typography variant="body1">{children}</Typography>;
};

export const Body = ({ children }) => {
    return <Typography variant="body2">{children}</Typography>;
};