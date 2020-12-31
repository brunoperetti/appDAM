import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';

export const API_URL =
  'https://api.mercadolibre.com/sites/MLA/search?q=Motorola%20G6';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([
    {nombre: 'Categoria 1', color: 'pink', id: Math.random().toString(10)},
    {nombre: 'Categoria 2', color: 'purple', id: Math.random().toString(10)},
    {nombre: 'Categoria 3', color: 'lightblue', id: Math.random().toString(10)},
    {nombre: 'Categoria 4', color: 'yellow', id: Math.random().toString(10)},
  ]);
  const [categoriasProductos, setCategoriasProductos] = useState({});

  //agregado 30dec2020
  const [compradores, setCompradores] = useState([
    {nombre: 'Mario Santos', email: 'marito@gmail.com', id: Math.random().toString(10)},
    {nombre: 'Maximo Cozetti', color: 'cozetti@gmail.com', id: Math.random().toString(10)},
    {nombre: 'Pablo Lamponne', color: 'lampo@gmail.com', id: Math.random().toString(10)},
    {nombre: 'Gabriel Medina', color: 'elgabi@gmail.com', id: Math.random().toString(10)},
  ]);
  const [compradoresProducto, setCompradoresProducto] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setProductos(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const agregarProductoACategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }

    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (!categoriaProductos.includes(producto.id)) {
      //Si no esta lo agregamos
      const newCategoriasProductos = {
        ...categoriasProductos,
        [categoria.id]: [...categoriaProductos, producto.id],
      };
      setCategoriasProductos(newCategoriasProductos);
    }
  };

  const agregarProductoAComprador = (comprador, producto) => {
    if (!comprador?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }
    const compradoresProducto = categoriasProductos[comprador.id] ?? [];
    if (!compradores.includes(producto.id)) {
      //Si no esta lo agregamos
      const newCompradorProducto = {
        ...compradoresProducto,
        [comprador.id]: [...compradoresProducto, producto.id],
      };
      setCompradoresProducto(newCompradorProducto);
    }
  };


  const quitarProductoDeCategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }
    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (categoriaProductos.includes(producto.id)) {
      //Si esta lo quitamos
      setCategoriasProductos({
        ...categoriasProductos,
        [categoria.id]: categoriaProductos.filter((pid) => pid !== producto.id),
      });
    }
  };

  const quitarProductoAComprador = (comprador, producto) => {
    if (!comprador?.id || !producto?.id) {
      return; // No hay id de comprador o producto
    }
    const compradoresProducto = compradoresProducto[comprador.id] ?? [];
    if (compradoresProducto.includes(producto.id)) {
      //Si esta lo quitamos
      setCompradoresProducto({
        ...compradoresProducto,
        [comprador.id]: compradoresProducto.filter((pid) => pid !== producto.id),
      });
    }
  };



  const obtenerCategoriasDelProducto = (producto) => {
    const categoriasId = Object.keys(categoriasProductos);
    const categoriasIdDelProducto = categoriasId.reduce(
      (acc, cur) =>
        categoriasProductos[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = categorias.filter((c) =>
      categoriasIdDelProducto.includes(c.id),
    );
    return results;
  };

  const obtenerCompradoresProducto = (producto) => {
    const compradoresId = Object.keys(compradoresProducto);
    const compradoresIdDelProducto = compradoresId.reduce(
      (acc, cur) =>
        compradoresProducto[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = compradores.filter((c) =>
      compradoresIdDelProducto.includes(c.id),
    );
    return results;
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        productos,
        setProductos,
        categorias,
        setCategorias,
        agregarProductoACategoria,
        quitarProductoDeCategoria,
        obtenerCategoriasDelProducto,
        compradores,
        setCompradores,
        setCompradoresProducto,
        agregarProductoAComprador,
        quitarProductoAComprador,
        obtenerCompradoresProducto
        

      }}>
      {children}
    </StoreContext.Provider>
  );
};
