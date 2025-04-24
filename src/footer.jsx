import './footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className="container">
                <h3>Suitwalk Linz</h3>
                <p>Delta © {new Date().getFullYear()} - All Rights Reserved</p>
            </div>
            <div className='container'>
                <h3><Link to="/impressum">Impressum</Link></h3>
            </div>
        </footer>
    )
}

export default Footer;