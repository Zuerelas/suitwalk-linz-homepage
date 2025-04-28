import './template.css';

function NotFound() {

    return (
        <div className="container-content">
            <h1>404 - Seite nicht gefunden</h1>
            <p>Die angeforderte Seite existiert nicht.</p>
            <p>Bitte überprüfen Sie die URL oder gehen Sie zurück zur <a href="/">Startseite</a>.</p>
            <p>Wenn Sie denken, dass dies ein Fehler ist, kontaktieren Sie bitte den <a href="mailto:report@suitwalk-linz.at">report@suitwalk-linz.at</a>.</p>
        </div>
    );
}

export default NotFound;