import React from 'react';
import Styled from 'styled-components';
import { Use_Global_Context } from '../../context/globalContext';
import { dateFormat } from '../../util/dateFormat';

function TopTransactions({ type }) {
    const { incomes, expenses } = Use_Global_Context();

    // Sort incomes and expenses based on amount
    const sortedIncomes = incomes.sort((a, b) => b.amount - a.amount);
    const sortedExpenses = expenses.sort((a, b) => b.amount - a.amount);

    // Get the top three incomes or expenses based on the provided type
    let topTransactions;
    if (type === 'income') {
        topTransactions = sortedIncomes.slice(0, 3);
    } else if (type === 'expense') {
        topTransactions = sortedExpenses.slice(0, 3);
    }

    return (
        <TopTransactions_Styled>
            <h2>Top {type === 'income' ? 'Incomes' : 'Expenses'}</h2>
            {topTransactions && topTransactions.length > 0 ? (
                topTransactions.map((transaction) => (
                    <div className="transaction-item" key={transaction.id}>
                        <p className="transaction-info">Title: {transaction.title}</p>
                        <p className="transaction-info">Amount: {transaction.amount}</p>
                        <p className="transaction-info">Date: {dateFormat(transaction.date)}</p>
                    </div>
                ))
            ) : (
                <p>No {type === 'income' ? 'incomes' : 'expenses'} found.</p>
            )}
        </TopTransactions_Styled>
    );
}

const TopTransactions_Styled = Styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .transaction-item {
        background: #F6FCF9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default TopTransactions;
