import { useContext, useEffect, useState} from 'react';
import CartContext from '../../Store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnISHighlighted,setBtnIsHighlighted]=useState(false);
  const cartCtx=useContext(CartContext);

  const numberOfCartItem=cartCtx.items.reduce((currNumber,item)=>{
    return currNumber+item.amount;
  },0);

  const btnClass=`${classes.button}  ${ btnISHighlighted ?classes.bump :'' }`

  const {items}=cartCtx;

  useEffect(()=>{
    if(items.length===0){
      return ;
    }
    setBtnIsHighlighted(true);

    const timer=setTimeout(()=>{
      setBtnIsHighlighted(false)
    },300)

    return ()=>{
      clearTimeout(timer)
    }

  },[items])

  return (
    <button className={btnClass} onClick={props.onClick} >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;