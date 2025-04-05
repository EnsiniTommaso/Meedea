import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../components/Layout";

export default function ItemPage() {
    const { itemId } = useParams()
    /* Or, equivantely (without object destructuring)
    const urlParams = useParams()
    */ 
    const [ product, setProduct ] = useState({})
    useEffect(() => {
        fetch("/sample_data.json")
            .then(res => res.json())
            .then(data => setProduct(data.find(p => p.id == itemId)))  
    }, [ product ])

    return <Layout>
        <section>
            <h3 className="bg-primary display-5 fw-bold text-white rounded">
                <span className="badge">Item #{product.id}</span>
            </h3>
            <h1 className="display-1">{product.name}</h1>
            <div className="d-flex flex-row flex-wrap gap-2">
                { product.categories?.length > 0 && product.categories?.map(cat => 
                    <h6 key={cat} className="badge bg-danger text-white card-subtitle mb-2">#{cat}</h6>
                )}
            </div>
            <h2>{product.description}</h2>
        </section>
    </Layout> 
}