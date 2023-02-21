import { Box, Typography } from '@pankod/refine-mui';

interface IError {
    text?: string;
}

export const ErrorBox = ({ text = 'Error...' }: IError) => (
    <Box>{text}</Box>
);

export const ErrorText = ({ text = 'Something went wrong!' }: IError) => (
    <Typography>{text}</Typography>
);