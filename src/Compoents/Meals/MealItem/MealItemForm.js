import React, { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
  const [amountIsValid,setAmountIsValid]=useState(true);
  const amountInputref=useRef();

  const submitHandler=(event)=>{
    event.preventDefault();

    const enteredAmount=amountInputref.current.value;
    const enteredAmountNumber=+enteredAmount;

    if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5){
      setAmountIsValid(false);
      return ;
    }

    props.onAddToCart(enteredAmountNumber);

  }

  return (
    <form className={classes.form} onSubmit={submitHandler} >
        <Input label="Amount" 
            ref={amountInputref}
            input={{
            id:'amount_'+props.id,
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }} />
        {!amountIsValid && (
          <p>Please Enter a Valid Amount (1-5) </p>
        )}
        <button>+ Add</button>
    </form>
  )
}

export default MealItemForm