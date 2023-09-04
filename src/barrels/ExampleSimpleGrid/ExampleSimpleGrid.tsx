import { FC } from 'react';
import { GridProps } from './GridProps';
import styles from './grid.module.scss';

const ExampleSimpleGrid: FC<GridProps> = (props: GridProps): JSX.Element => {
    return (
        <div
            className={`${props.className} ${styles.gridContainer}`}
            style={{
                display: 'grid',
                gridTemplateRows: props.rows,
                gridTemplateColumns: props.columns
                    ? `repeat(${props.columns}, 1fr)`
                    : 'repeat(4, 1fr)',
                color: props.color,
                backgroundColor: props.backgroundColor,
                gap: props.gap ? props.gap : '1vh 1vw',
                rowGap: props.rowGap,
                height: props.height,
                width: props.width,
            }}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    );
};

export default ExampleSimpleGrid;
