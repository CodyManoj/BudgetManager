import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Use_Global_Context } from '../../context/globalContext';
import Chart from '../chart/chart';
import { InnerLayout } from '../../styles/Layout';
import { dollar } from '../../util/icons';
import TopTransactions from '../Top_transactions/TopTransactions';
function Dashboard() {
    const {
        totalExpenses,
        totalIncome,
        totalBalance,
        getIncomes,
        getExpenses,
    } = Use_Global_Context();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1 className="total-balance">Total Balance: {dollar} {totalBalance()}</h1>
                <div className="charts">
                    <div className="chart-item">
                        <h2 className="total-income">Total Income: {dollar} {totalIncome()}</h2>
                        <Chart chartType="income" />
                        <TopTransactions type={"income"}/>
                    </div>
                    <div className="chart-item">
                        <h2 className="total-expense">Total Expense: {dollar} {totalExpenses()}</h2>
                        <Chart chartType="expense" />
                        <TopTransactions type={"expense"}/>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .total-balance {
        margin-above: 2rem;
        font-size: 2.5rem;
        font-weight: bold;
        color: var(--color-green);
        margin-bottom: 2rem;
        text-align: center;
    }

    .total-income{
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
    }
    .total-expense {
        font-size: 2rem;
        font-weight: bold;
    }

    .charts {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;        
    }

    .chart-item {
        flex: 1;
        background: #CBF1F5;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;

        h2 {
            font-size: 2rem;
            margin-bottom: 3rem;
            text-align: center;
        }
    }
`;

export default Dashboard;
