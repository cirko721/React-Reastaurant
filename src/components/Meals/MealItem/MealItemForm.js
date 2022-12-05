import {useRef, useState} from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
    const [amountIsValid, setIsValid] = useState(true);
    const amountInputRef = useRef();
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setIsValid(false)
            return;
        }
        props.onAddToCart(enteredAmountNumber)
    };
    return (
        <form className={classes.form}>
            <Input label="Amount" ref={amountInputRef} input={{
                type: "number",
                id: "amount" + props.id,
                min: "1",
                max: "5",
                step: "1",
                defaultValue: "1"
            }} />
            <button onClick={submitHandler}>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    )
};

export default MealItemForm;