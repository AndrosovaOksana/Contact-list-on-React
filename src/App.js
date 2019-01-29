import React, { Component } from 'react';
import './App.css';
import logo from './user-secret-solid.svg';
import styled from 'styled-components';
import Modal from 'react-modal';

const ButtonAdd = styled.button`
  color: #000;
  background-color: #fff;
  border-radius: 40px;
  height: 60px;
  width: 60px;
  text-align: center;
  font-family: 'Noto Serif', serif;
  font-size: 35px;
  position: fixed;
  top: 830px;
  // left: 1770px;

`;

const customStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center'
  }
};

const Table = styled.div`
  height: 100%;
  width: 100%;
  backgraund-color: #fff;
  border-radius: 50px;
  color: #000;
  font-family: 'Noto Serif', serif;
  text-align: center;
`;

Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.5)';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      contactName: null,
      number: null,
      email: null,
      img: logo,
      contacts: []
      
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }
  
  afterOpenModal = () => {
    this.subtitle.style.color = '#f00';
  }

  saveContact = () => {
    const {contactName, number, email, img, contacts} = this.state;
    
    if(contactName != null) {
    this.setState({modalIsOpen: false});

    const newContact = {
      contactName,
      number,
      email,
      img
    };

    const newContacts = [...contacts, newContact];

    console.log(newContacts);
    

    this.setState({contacts: newContacts});
    this.setState({contactName: null, number: null, email: null, img: logo});
    } else {
      alert("Введите имя контакта!");
    }
  }
  
  closeModal = () => {
    this.setState({modalIsOpen: false});
    this.setState({contactName: null, number: null, email: null});
  }

  handleChangeInput = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const {contacts} = this.state;

    return (
      <section className='App'>
        <header>
          <h1>Мои контакты</h1>
        </header>
        <main>
          <Table>
            <ul className='showContact'>
              {contacts.map(({contactName, number, email, img}, index) => (
                <li key={index}>
                  <div className='contact'>
                    <img src={img} className='imgContact' alt='img'/>
                    <div className='infoContact'>
                      <p className='titleContact'>{contactName}</p>
                      <p>{number}</p>
                      <p>{email}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Table>
        </main>
        <footer></footer>
        
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyle}
          contentLabel="Example Modal"
        >
          <h2 className='titleModal' ref={subtitle => this.subtitle = subtitle}>Новый контакт</h2>
          <button className='closeButton' onClick={this.closeModal}><i className="far fa-times-circle"></i></button>
          <div className='modalForm'>
            <label>Имя:</label><input name='contactName' onChange={this.handleChangeInput}/><br/>
            <label>Номер телефона:</label><input name='number' onChange={this.handleChangeInput}/><br/>
            <label>e-mail:</label><input name='email' onChange={this.handleChangeInput}/><br/>
          </div>
          <button className='saveModalButton' onClick={this.saveContact}>Сохранить</button>
          <form></form>
        </Modal>

        <ButtonAdd onClick={this.openModal}>+</ButtonAdd>
      </section>
    );
  }
}

export default App;
