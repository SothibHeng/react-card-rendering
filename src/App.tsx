import { useEffect, useState } from 'react'
import './App.css'
import { Button, Modal } from 'flowbite-react';
import CardProduct from './components/CardProduct'
import FooterComponent from './components/FooterComponent'
import NavBar from './components/NavBar'
import CreateNewProductForm from './components/CreateNewProductForm';

type Status = 'idle' | 'loading' | 'success' | 'error'
type Product = {
  readonly id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string
}

function App() {
  const[products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [openModal, setOpenModal] = useState(false);
  const [dataForm, setDataForm] = useState({})

  


  useEffect(() => {
    setStatus("loading")
    fetch('https://fakestoreapi.com/products').then(res => res.json()).then(data => {
      setProducts(data)
      setStatus("success")
    }).catch(err => {
      setStatus("error")
    })
  }, [])

  if(status === "loading") {
    return (
      <div className='h-screen grid place-items-center'>
        <h1 className='text-center text-2xl'>Loading</h1>
      </div>
    )
  }


  function getDataForm(product:any) {
    setDataForm(product)
  }

  const createProduct = () => {
    fetch("https://fakestoreapi.com/products",
    {
      method: "POST",
      body:JSON.stringify(dataForm),
      headers: {
        "Content-type": "application/json;",
      },
    }).then((res) => res.json()).then((data) => {
      console.log("Successfully!")
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })

    setOpenModal(false)
  }

  return (
    <div className='h-screen flex flex-col justify-between'>
      {/* Nav bar */}
     <NavBar/>
     {/* button */}
     <div className='p-10 flex justify-center'>
     <Button onClick={() => setOpenModal(true)}>Create new Product</Button>

     </div>
     {/* card */}
     <div className='grid grid-cols-4 gap-10 py-10'>
      {/* Card product */}
      {/* <CardProduct title='Apple Vision Pro' image='https://www.flowbite-react.com/images/products/apple-watch.png' price={599}/> */}
      {
      products.map(
        (product) => (
          < CardProduct key = {product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          />)
      )
      }
     </div>
     {/* Modal */}
     <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create product</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <CreateNewProductForm getDataForm = {getDataForm}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createProduct()}>Create</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
     {/* Footer */}
     <FooterComponent/>
    </div>
  )
}

export default App
