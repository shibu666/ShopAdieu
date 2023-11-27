import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import { fireDb } from '../../firebase/firebaseConfig';
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';


function MyState(props) {
  const [mode, setMode] = useState('light');  
  const [loading, setLoading] = useState(false); 

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  const [products, setProducts] = useState({
    title: '',
    price: '',
    imageUrl: '',
    category: '',
    description: '',
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });

  const addProduct = async () => {
    if (!products.title || !products.price || !products.imageUrl || !products.category || !products.description) {
      return toast.error('Please fill all fields');
    }

    setLoading(true);

    try {
      const productRef = collection(fireDb, "products");
      await addDoc(productRef, products);
      toast.success("Product added successfully");
      setTimeout(() => {
        window.location.href = '/dashboard'
      },800 );
      getProductData();
      setLoading(false);
      setProducts({
        title: '',
        price: '',
        imageUrl: '',
        category: '',
        description: '',
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
    } catch (error) {
      console.error(error); // Log the error to the console
      toast.error("Error adding product");
      setLoading(false);
    }
  }

  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);

    try {
      const q = query(
        collection(fireDb, "products"),
        orderBy("time"),
        // limit(5)
      );

      const data = onSnapshot(q, (querySnapshot) => {
        let productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
      });

      return () => data;
    } catch (error) {
      console.error(error); // Log the error to the console
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  //update product fucntion
  const edithandle = (item) => {
    setProducts(item)
  }
  // update product
  const updateProduct = async () => {
    setLoading(true)
    try {
      await setDoc(doc(fireDb, "products", products.id), products);
      toast.success("Product Updated successfully")
      getProductData();
      setLoading(false)
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 500);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setProducts("")
  }

  //delete product

  const deleteProduct = async (item) => {

    try {
      setLoading(true)
      await deleteDoc(doc(fireDb, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
    } catch (error) {
      // toast.success('Product Deleted Falied')
      setLoading(false)
    }
  }


  return (
    <MyContext.Provider value={{ 
      mode, toggleMode, loading, setLoading,
      products, setProducts, addProduct, product ,
      edithandle,updateProduct,deleteProduct
    }}>
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;