import { useEffect, useState } from "react"
import ItemCard from "../components/ItemCard"
import Layout from "../components/Layout"

/**
 * Sample page, nothing too fancy
 * @returns 
 */
export default function Shop() {

    const [ products, setProducts ] = useState([])

    useEffect(() => {
        fetch("/sample_data.json")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [ products ])

    return <Layout>
        <section className="py-5">
            <h1 className="display-1">Shop</h1>
            <hr className="d-md-none my-1 w-50 pb-2"/>
            <div className="container-fluid pt-0 pt-md-5">
                <div className="row gap-4 gap-md-0">
                    {
                        products.map(prod => {
                            return (
                                <div key={prod.id} className="col-12 col-md-4 col-lg-3 d-flex justify-content-center">
                                    <ItemCard {...prod} />
                                </div>
                            ) 
                        })
                    }
                </div>
            </div>
        </section>
    </Layout>
}