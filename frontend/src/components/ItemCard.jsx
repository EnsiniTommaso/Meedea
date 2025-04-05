import { Link } from "react-router";

export default function ItemCard({ id, name, categories }) {
    return <div className="card" style={{ width: "18rem" }}>
        <svg
            className="bd-placeholder-img card-img-top text-center"
            style={{
                width: "100%",
                minHeight: "3em",
                maxHeight: "6em"
            }}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: Image cap"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            >
            <rect width="100%" height="100%" fill="#868e96" />
        </svg>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <div className="d-flex flex-row flex-wrap gap-2">
                { categories.length > 0 && categories.map(cat => 
                    <h6 key={cat} className="badge bg-danger text-white card-subtitle mb-2">#{cat}</h6>
                )}
            </div>
            <Link to={`/shop/${id}`}>View details</Link>
        </div>
    </div>
}