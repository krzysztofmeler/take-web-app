import { FC } from 'react';
import { Link } from 'react-router-dom';

type BasicSelectorProps = {
    values: [string, string][];
    selectedValues: string[];
    updateValue: (values: string[]) => void;
    label: string;
};

const CheckboxSelector: FC<BasicSelectorProps> = ({
    label,
    ...props
}: BasicSelectorProps) => (
    <>
        {' '}
        <label htmlFor={label}>{label}</label>
        <table>
            <tbody>
                {props.values.map((val) => (
                    <tr key={val[0]}>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td>{val[1]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
);

export { CheckboxSelector };
