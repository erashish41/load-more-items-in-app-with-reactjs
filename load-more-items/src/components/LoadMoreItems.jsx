import { useEffect, useState } from "react";

export const LoadMoreItems = () => {

    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [disableButton, setDisableButton] = useState(false);

    async function fetchProducts() {
        try {
            setLoading(true);
            const response = await fetch(
                `https://dummyjson.com/products?limit=20&skip=${
                    count === 0 ? 0 : count * 20
                }`
            );
            const result = await response.json();
            console.log(result);
            
            if(result && result.products && result.products.length){
                setProducts((prevProducts) => [...prevProducts, ...result.products]);
                setLoading(false);
            }
            
        } catch (e) {
            setError(e.message)
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    },[count]);

    useEffect(() => {
        if(products && products.length === 100) setDisableButton(true);
    },[products])

    if(loading){
       return <div>Loading data! Please wait...</div>
    }

    if(error){
        return <div>Error occured! Please check your Code again.</div>
    }

    return (
        <div className="container">
            <div className="navbar">
                <h1>Spopify</h1>
                <span>Sign in  Log in </span>
            </div>
            <div className="product-container">
                {
                    products && products.length > 0 
                    ? products.map((currElem, index) => {
                        return <div className="product" key={currElem.id}>
                            <img 
                                src={currElem.thumbnail}
                                alt={currElem.title}
                            />
                            <p>{currElem.title}</p>
                        </div>
                    }) 
                    : null
                }
            </div>
            <button 
                onClick={() => setCount(count + 1)}
                className="button-container"
                disabled={disableButton}
                >
                Load more items
            </button>
            {
                disableButton ? <div>You have reached 100 limit</div> : null
            }
        </div>
    )
}