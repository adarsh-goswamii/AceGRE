import { Typography } from "@material-ui/core";

export const H1 = ({ children, ...rest }) => {
  return (
    <Typography variant="h1" {...rest}>
      {children}
    </Typography>
  );
};

export const H3 = ({ children, ...rest }) => {
  return (
    <Typography variant="h3" {...rest}>
      {children}
    </Typography>
  );
};

export const Heading = ({ children, ...rest }) => {
  return (
    <Typography variant="body1" {...rest}>
      {children}
    </Typography>
  );
};

export const Body = ({ children, ...rest }) => {
  return (
    <Typography variant="body2" {...rest}>
      {children}
    </Typography>
  );
};
