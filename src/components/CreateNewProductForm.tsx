import React, { useEffect, useState } from 'react'
import {Label, TextInput, Textarea } from 'flowbite-react';

type ErrorType = {
    title: string
    price: string
    description: string
}

export default function CreateNewProductForm({getDataForm}:any) {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    //const [description, setDescription] = useState("")
    const [category, setCategory] = useState("electronic")
    const [image, setImage] = useState("picture")

    const [error, setError] = useState<ErrorType>(
        {
            title: "",
            price: "",
            description: "",
        }
    )

    useEffect(() => {
        if(title.length <5 ) {
            setError((prev) => ({...prev, title: "Title must be at least 5 character!"}))
            // setError((prev) => {
            //   console.log(prev)
            //   return prev
            // })
        } else {
          setError((prev) => {
            console.log(prev)
            return {
              ...prev,title:""
            }
          })
        }
        if(price < 0) {
          setError((prev) => {
            console.log(prev)
            return {
              ...prev, 
              title: "Invalid! Price must be bigger than $0"
            }
          })
        } else {
          setError((prev) => {
            console.log(prev)
            return {
              ...prev,price:""
            }
          })
        }
    },[title,price])

    useEffect(() => {
      getDataForm({title,price,description,category,image})
    },[title,price,description,category,image])

    return (
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Product Title:" />
            </div>
            <TextInput id="title" type="text" placeholder="Apple Vision Pro" required onChange={(e) => setTitle(e.target.value)} />
            {error.title && <p className='text-red-500'>{error.title}</p>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Product Price:" />
            </div>
            <TextInput id="price" type="number" placeholder='599' required onChange={(e) => setPrice(parseFloat(e.target.value))} />
            {error.price && <p className='text-red-500'>{error.price}</p>}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Product Description:" />
            </div>
            <Textarea id="description" placeholder='' required onChange={(e) => setDescription(e.target.value)} />
          </div>

          {/* <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div> */}
        </form>
      );
}
