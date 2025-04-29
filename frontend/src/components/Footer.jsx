import githubLogo from '../assets/github_icon.svg';

export default function Footer() {
    return (
        <footer className="footer bg-black text-white py-3 mt-auto">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 text-center text-lg-start mb-2 mb-lg-0">
                        <h5 className="fw-bold">Meedea for everyone</h5>
                        <h6>@ I.T.T. "Blaise Pascal", Cesena</h6>
                    </div>
                    <div className="col-12 col-lg-6 text-center text-lg-end">
                        <h5>All World In Connection</h5>
                        <h6 className="text-secondary">
                            by <a target="_blank" rel="noreferrer" className="text-decoration-none text-secondary">Saliani Alexia</a> — 
                            <code> alexia.saliani.stud@ispascalcomandini.it</code>
                        </h6>
                        <h6 className="text-secondary">
                            by <a target="_blank" rel="noreferrer" className="text-decoration-none text-secondary">Ensini Tommaso</a> — 
                            <code> tommaso.ensini.stud@ispascalcomandini.it</code>
                        </h6>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col text-center">
                        <a className="text-decoration-none text-reset font-monospace d-flex justify-content-center align-items-center gap-2" href="https://github.com/EnsiniTommaso/Meedea" target="_blank" rel="noreferrer">
                            <img src={githubLogo} alt="GitHub Logo" style={{ width: "20px" }} />
                            GitHub Repository
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
