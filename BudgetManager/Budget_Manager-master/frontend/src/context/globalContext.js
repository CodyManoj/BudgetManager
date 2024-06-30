import React, { useContext, useState,useEffect } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5000/api/version1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //register and login user
    const register=async(info)=>{
        const response=await axios.post(`${BASE_URL}register`,info)
        .catch((err)=>{
            setError(err.response.data.message)
        });
        console.log(response);
        return response;

    }

    const login=async(info)=>{
        const response=await axios.post(`${BASE_URL}login`,info)
        .catch((err)=>{
            setError(err.response.data.message);
        })
        console.log('A user info', response);
       if(response?.status===200)setUser(response);
        return response;
    }
    // useEffect(()=>{
    //     // setUser({token:12344});

    // },[]);

    

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add_income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            });
        // console.log(response);
        getIncomes();
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get_income`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete_income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}addExpense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}getExpense`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete_expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history;
    }


    return (
        <GlobalContext.Provider value={{
            register,
            login,
            user,
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const Use_Global_Context = () =>{
    return useContext(GlobalContext)
}