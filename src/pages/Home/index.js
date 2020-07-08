import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  './index.css';

import Products from '../../components/Products'
import Pagination from '../../components/Pagination'
import Logo from './logo.png'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App(props) {
    const [pokeList, setPokeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(10);

    const [ usuario, setUsuario] = useState("");
    const [ error, setError ] = useState(false);
    const [pokemon, setPokemon] = useState([])

    const URL = `https://pokeapi.co/api/v2/pokemon?limit={itemPerPage}`;

    // useEffect(() => {
    //     const fetchPokeList = async() => {
    //         setLoading(true)
    //         const result = await axios.get(URL)
    //         setPokeList(result.data)
    //         setLoading(false)
    //     }

    //     console.log(loading)
    //     fetchPokeList()
    // }, [])
    // console.log(pokeList)


    useEffect(() => {
        const fetchPokeList = async () => {
            setLoading(true)
            const result = await axios.get(URL)
            .then(response => response.data.results.map(
                item => {
                    axios.get(item.url)
                        .then(proditem => {
                            pokeList.push(proditem.data)
                            setPokeList([...pokeList])
                        })
                })
            )
            setLoading(false)
        }

        console.log(loading)
        fetchPokeList()
    }, [])

    const indexOfLastItem = currentPage * itemPerPage
    const indexOfFirstItem = indexOfLastItem - itemPerPage
    const currentItems = pokeList.slice(indexOfFirstItem, indexOfLastItem)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    function handlePesquisa() {
        // console.log(pokemon);

        // setLimit(10);
        // https://pokeapi.co/api/v2/pokemon/
        axios.get(URL)
        .then(response => response.data.results.map (item => {
                axios.get(item.url)
                .then(proditem => {
                    const pokePrice = {
                        "price" : Math.floor(Math.random() * 10) + 1
                    }

                    pokeList.push(proditem.data)
                    setPokeList([...pokeList])
                })
                .catch(err => {
                    setError(true);
                });
            })
        )
        .catch(err => {
            setError(true);
        });

        console.log(pokeList);
    }

    return (
        <>
        <Container fluid>
            <Navbar expand="lg" variant="light" bg="light">
                <Navbar className="bg-light justify-content-between">
                    <Navbar.Brand href="#home">
                        <img
                            src={Logo}
                            width="150"
                            className="d-inline-block align-top"
                            alt="Pokemon Store"
                        />
                    </Navbar.Brand>                    
                    <Form inline>
                        <FormControl type="text" placeholder="Pokemon" className=" mr-sm-2" />
                        <Button type="submit" onClick={handlePesquisa}>Pesquisar</Button>
                    </Form>
                </Navbar>
            </Navbar>
        </Container>

        <div className="container">
            <main>
            <section className="cards">
                {pokeList.map((res, i) => (
                    <div className="card" key={i}>
                        <div className="card__image-container">
                            <img
                                src={res.sprites.front_default}
                                alt={res.sprites.front_default}
                            />
                        </div>
                        <div className="card__content">
                            <p className="card__title text--medium text-thick">
                                {res.name}
                            </p>
                            <div className="card__info">
                                <p className="text--medium text-thick">R$ {Math.floor(Math.random() * 10) + 1},00</p>
                            </div>
                            <div className="card__info">
                                <Button variant="success" type="button" onClick={handlePesquisa}>Adicionar ao carrinho</Button>
                            </div>
                        </div>
                    </div>
                ))}

            </section>
            </main>
        </div>
        </>

            /* <Products productList={currentItems} loadling = {loading}/> */
            /* <Pagination 
            itemPerPage={itemPerPage} 
            totalItems={pokeList.length}
            paginate={paginate}
            /> */

    );
}

export default App;
