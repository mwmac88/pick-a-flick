import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

const ModalInner = styled.div`
  max-width: 80vw;
  max-height: 80vh;
`;

interface Props {
  setModalVisibilty: Function;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children, setModalVisibilty }) => (
  <div className='absolute flex justify-center items-center top-0 left-0 w-screen h-screen bg-opaque70 overflow-x-scroll z-20'>
    <ModalInner className='fixed bg-white w-full h-full mx-auto overflow-auto'>
      <div className='text-center'>{children}</div>
      <CloseIcon
        onClick={() => setModalVisibilty()}
        className='absolute top-2 right-2 cursor-pointer'
        fontSize='large'
      />
    </ModalInner>
  </div>
);

export default Modal;
