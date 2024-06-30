import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { Use_Global_Context } from '../../context/globalContext';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button/button'
import { plus } from '../../util/icons';
const FormComponent = () => {
  const { addIncome,user } = Use_Global_Context();
  const [inputState, setInputState] = React.useState({
    userName:user.data.userName,
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  const {userName, title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(inputState);
    setInputState({
      title: '',
      amount: '',
      date: '',
      category: '',
      description: '',
    })
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="input-controller">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Salary Title"
          onChange={handleInput('title')}
        />
      </div>
      <div className="input-controller">
        <input
          type="text"
          value={amount}
          name="amount"
          placeholder="Salary Amount"
          onChange={handleInput('amount')}
        />
      </div>
      <div className="input-controller">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput('category')}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-controller">
        <textarea
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput("description")}
        />
      </div>
      <div className="submit_btn">
      <Button 
          name={'Add Income'}
          icon={plus}
          bPad={'.8rem 1.6rem'}
          bRad={'30px'}
          bg={'#0F4C75'}
          color={'#fff'}
      />
      </div>
    </FormStyled>
  );
};

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-controller{
        input{
            width: 100%;
        }
    }

    .submit_btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;
export default FormComponent;
