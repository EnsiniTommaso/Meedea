import githubLogo from '../assets/github_icon.svg'

export default function Footer() {
    return (
        <footer className="py-3 container-fluid bg-black d-flex justify-content-center align-items-center text-white">
            <div className="w-75">
                <div className="row">
                    <div className="col-12 col-lg-6 text-center text-md-start">
                        <h5 className="fw-bold">Meedea for everyone</h5>
                        <h6> @ I.T.T. "Blaise Pascal", Cesena</h6>
                    </div>
                    <div className="col-12 col-lg-6 text-center text-md-end">
                        <h5>All World In Connection</h5>
                        <h6 className="text-secondary">by <a target="_blank" className="text-decoration-none text-secondary">Saliani Alexia</a> — <code>alexia.saliani.stud@ispascalcomandini.it</code></h6>
                        <h6 className="text-secondary">by <a target="_blank" className="text-decoration-none text-secondary">Ensini Tommaso</a> — <code>tommaso.ensini.stud@ispascalcomandini.it</code></h6>
                    </div>
                </div>
                <div className="row">
                    <p className='py-1 d-flex justify-content-center gap-2 flex-nowrap'>
                        <img style={{ width: "20px" }} src={githubLogo} alt="GitHub Logo" /> 
                        <a className="text-decoration-none text-reset font-monospace" href="">GitHub Repository</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
