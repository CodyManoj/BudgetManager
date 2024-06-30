import React from 'react';
import Styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import History from '../../History/History/History'

function view_t() {
  return (
    <ViewTStyled>
      <InnerLayout>
        <h1 className='head'>Transaction History</h1>
        <History />
      </InnerLayout>
    </ViewTStyled>
  );
}

const ViewTStyled = Styled.div`
  .head{
    padding-bottom:2rem;
  }
`;
export default view_t;
