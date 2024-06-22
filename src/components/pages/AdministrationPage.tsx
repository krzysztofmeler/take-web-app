import { FC } from 'react';
import { Link } from 'react-router-dom';
import { settings } from '../../settings';

const AdministrationPage: FC = () => {

    return (
        <div>
            <h1>Administration</h1>

            <p>Administrative options region</p>
            <p>Authorized staff only!</p>

            <ul>
                {settings.adminAreaLinks.map((link) => (
                    <li key={link.link}>
                        <Link to={link.link}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { AdministrationPage };
