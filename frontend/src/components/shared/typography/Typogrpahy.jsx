import { Typography } from "@material-ui/core";

export const H1 = ({ children, className }) => {
  return <Typography variant="h1" className={className}>{children}</Typography>;
};

export const H3 = ({ children, className }) => {
  return <Typography variant="h3" className={className}>{children}</Typography>;
};

export const Heading = ({ children, className }) => {
  return <Typography variant="body1" className={className}>{children}</Typography>;
};

export const Body = ({ children, className }) => {
  return <Typography variant="body2" className={className}>{children}</Typography>;
};
