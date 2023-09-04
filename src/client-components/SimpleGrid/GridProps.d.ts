import { CommonProps } from '../types/CommonProps';

export interface GridProps extends CommonProps {
    rows?: number;
    columns?: number;
    gap?: string;
    rowGap?: string;
    columnGap?: string;
    centerItems?: boolean;
}
