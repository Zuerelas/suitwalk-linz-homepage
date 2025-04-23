import './footer.css';

function Footer() {
    return (
        <footer>
            <div className="container">
                <h3>Suitwalk Linz</h3>
                <p>© {new Date().getFullYear()} - All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer;