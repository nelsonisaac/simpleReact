import { useEffect, useState } from "react";
import './styles.css';

export default function LoadmoreData() {


    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchproducts();
    }, [])

    async function fetchproducts() {
        const info = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20
            }`);
        const res = await info.json();

        if (res && res.products && res.products.length) {
            setData((prev) => {
                //return prev.concat(res.products);
                return [...prev,...res.products];
            });
            console.log(data)
        }

    }

    function handleMore() {
        setCount((prevCount) => {
            return prevCount + 1
        })
        fetchproducts();
    }

    return <div className="tile">
        <div className="product-container">
            {

                data && (data.length != 0)
                    ? data.map((items) => (
                        <div key={items.id} className="imagetile">
                            <img src={items.thumbnail} alt={items.title}></img>
                            <p>{items.title}</p>
                        </div>
                    ))
                    : null
            }
        </div>
        <div>{
            data.length <= 100 ? <button onClick={handleMore}>Load more</button>
                : <label>Cannot load more max reached</label>
        }
        </div>

    </div>
}