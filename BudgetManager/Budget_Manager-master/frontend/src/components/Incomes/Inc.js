import React from 'react';
import Styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import { Use_Global_Context } from '../../context/globalContext';
import Form from '../form/Income_form';
import IncomeItem from './Income_item';
import { dollar } from '../../util/icons';
function Inc() {
  const { addIncome ,incomes,getIncomes, deleteIncome, totalIncome} = Use_Global_Context();
  React.useEffect(()=>{
    getIncomes();
  },[])
  return (
    <IncStyled>
      <InnerLayout>
        <div className='Total_income'>   
            Total Income:
            <span>
            {dollar}
            {totalIncome()}
            </span>
        </div>
        <div className="Income-box">
          <div className="form">
            <Form/>
          </div>
          <div className="incomes">
            {incomes.map((income) => {
                const {_id, title, amount, date, category, description, type} = income;
                return <IncomeItem
                    key={_id}
                    id={_id} 
                    title={title} 
                    description={description} 
                    amount={amount} 
                    date={date} 
                    type={type}
                    category={category} 
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteIncome}
                />
            })}
        </div>
        </div>
      </InnerLayout>
    </IncStyled>
  );
}

const IncStyled = Styled.div`
    display: flex;
    overflow: auto;
    .Total_income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2.5rem;
        font-weight:800;
        color: rgb(34,34,96);
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight:800;
            color: var(--color-green);
        }
    }
    .Income-box{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;
export default Inc;
