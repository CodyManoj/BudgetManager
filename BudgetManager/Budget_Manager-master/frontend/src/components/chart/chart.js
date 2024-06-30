import React from 'react';
import Styled from 'styled-components';
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarController,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Use_Global_Context } from '../../context/globalContext';
import { dateFormat } from '../../util/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function Chart({ chartType }) {
    const { incomes, expenses } = Use_Global_Context();

    // Prepare data based on chart type
    const chartDataMap = new Map();
    let chartLabel = '';
    let chartBackgroundColor = '';

    if (chartType === 'income') {
        chartLabel = 'Income';
        chartBackgroundColor = 'green';

        for (const income of incomes) {
            const date = dateFormat(income.date);
            if (chartDataMap.has(date)) {
                chartDataMap.set(date, chartDataMap.get(date) + income.amount);
            } else {
                chartDataMap.set(date, income.amount);
            }
        }
    } else if (chartType === 'expense') {
        chartLabel = 'Expense';
        chartBackgroundColor = 'red';

        for (const expense of expenses) {
            const date = dateFormat(expense.date);
            if (chartDataMap.has(date)) {
                chartDataMap.set(date, chartDataMap.get(date) + expense.amount);
            } else {
                chartDataMap.set(date, expense.amount);
            }
        }
    }

    const chartData = {
        labels: Array.from(chartDataMap.keys()),
        datasets: [
            {
                label: chartLabel,
                data: Array.from(chartDataMap.values()),
                backgroundColor: chartBackgroundColor,
                tension: 0.2,
            },
        ],
    };

    return (
        <div className='charts'>
            <StyledChart>
                <Line data={chartData} options={{ plugins: { title: { display: true, text: chartLabel } } }} />
            </StyledChart>
        </div>
    );
}

const StyledChart = Styled.div`
    background: #F6FCF9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    flex: 1;
    margin-right: 1rem;
    height: 400px;
    
    &:last-child {
        margin-right: 0;
    }
`;

export default Chart;
