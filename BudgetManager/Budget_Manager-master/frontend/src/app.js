import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { MainLayout } from './styles/Layout';
import Floating from './components/Floating/Floating';
import NavigationBar from './components/Navigation/Navigation_bar';
import Dashboard from './components/dashboard/dashboard';
import ViewTransaction from './components/View_transaction/view_t';
import Exp from './components/Expenses/Exp';
import Inc from './components/Incomes/Inc';
import { Use_Global_Context } from './context/globalContext';
import Login from './components/login/login';
function App() {
  const [active, setActive] = useState(1);
  const global = Use_Global_Context()
  // console.log('global is', global)
  // console.log('user is',global.user);
  const display_data = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <ViewTransaction />;
      case 3:
        return <Inc />;
      case 4:
        return <Exp />;
      default:
        return <Dashboard />;
    }
  }

  const FloatMemo = useMemo(() => {
    return <Floating />;
  }, []);

  return (
    <AppStyled className="App">
      {FloatMemo}
      {global.user===null?<Login/>:(
      <MainLayout>
        <NavigationBar active={active} setActive={setActive} />
        <main>
          {display_data()}
        </main>
      </MainLayout>
      )}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background: linear-gradient(90deg, #e3fdfd 0%, #A6E3E9 100%);
  position: relative;
  main {
    flex: 1;
    background: #E3FDFD;
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
