import React from 'react';

const Products = ({productList, loading}) => {
    console.log(productList)

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (productList) {
        return Object.keys(productList).map((item, index) => {
            return (
                <main>
                    <section className="cards">
                            <div className="card" key={index}>
                                <div className="card__image-container">
                                    <img
                                        src={productList[item].sprites.front_default}
                                        alt={productList[item].sprites.front_default}
                                    />
                                </div>
                                <div className="card__content">
                                    <p className="card__title text--medium text-thick">
                                        {productList[item].name}
                                    </p>
                                    <div className="card__info">
                                        <p className="text--medium text-thick">R$ {Math.floor(Math.random() * 10) + 1},00</p>
                                    </div>
                                    <div className="card__info">
                                        <button className="card__price text--medium">Adicionar ao carrinho</button>
                                    </div>
                                </div>
                            </div>
                    </section>
                </main>
            )
        })
    }
}

export default Products;