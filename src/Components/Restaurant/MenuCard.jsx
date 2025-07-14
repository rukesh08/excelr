import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from '../Util/CategorizeIngredients';
import { SpaRounded } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';

const demo=[
    {
        category:"Nuts & seeds",
        ingredients:["cashew nuts"]
    },
    {
        category:"Protiens",
        ingredients:["Bacon strips","Protien"]
    }
]
export const MenuCard = ({item}) => {
    const[selectedIngredients,setSelectedIngredients]=useState([]);
    const dispatch=useDispatch();
const handleCheckBoxChange = (ingredient) => {

  if (selectedIngredients.includes(ingredient.name)) {
    setSelectedIngredients((prev) =>
      prev.filter((name) => name !== ingredient.name)
    );
  } else {
    setSelectedIngredients((prev) => [...prev, ingredient.name]);
  }
};

const handleAddItemToCart=(e)=>{
    e.preventDefault();
    const reqData={
        token:localStorage.getItem("jwt"),
        cartItem:{
            foodId:item.id,
            quantity:1,
            ingredients:selectedIngredients,
        },
    };
    dispatch(addItemToCart(reqData))
    console.log("req data",reqData);
    console.log("Sending to backend:", reqData.cartItem.ingredients);

    
}

  return (
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className='lg:flex gap-5 items-center justify-between'>
            <div className='lg:flex items-center lg:gap-5'>
                <img className='w-[7rem] h-[7rem] object-cover' src={item.images[0]} alt="" />
            </div>
            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                <p className='font-semibold text-xl'>{item.name}</p>
                <p>₹{item.price}</p>
                <p className='text-gray-400'>{item.description}</p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
            <form onSubmit={handleAddItemToCart}>
                <div className='flex gap-5 flex-wrap'>
                    {
                        Object.keys(categorizeIngredients(item.ingredients)).map((category)=>
                            <div>
                                <p>{category}</p>
                                <FormGroup>
                                    {categorizeIngredients(item.ingredients)[category].map((ingredient) => (
                                        <FormControlLabel
                                            key={ingredient.id}
                                            control={
                                            <Checkbox onChange={() => handleCheckBoxChange(ingredient)} />
                                            }
                                            label={ingredient.name}
                                        />
                                    ))}

                                </FormGroup>
                            </div>
                        )
                    }
                </div>
                <div className='pt-5'>
                    <Button  variant='contained' disabled={false} type='submit'>
                        {true?"Add to Cart":"Out Of Stock"}
                    </Button>
                </div>
            </form>
        </AccordionDetails>
      </Accordion>
  )
}

export default MenuCard