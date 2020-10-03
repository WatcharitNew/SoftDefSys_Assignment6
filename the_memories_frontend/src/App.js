import React from 'react';
import Background from './image/background.jpg';
import MemoryIcon from './image/memory.svg';
import SendIcon from './image/send.svg';
import AddIcon from './image/add.svg'
import superagent from 'superagent';
import './App.css';

const api = process.env.API || 'http://localhost';
const scroll = document.body.offsetHeight;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      memory: '',
      allMemory: [],
    }
  };

  _onSubmit = () => {
    const {name, memory} = this.state;
    console.log('api: ', api);
    superagent.post(api + ':10000/api/memory').send({ name, memory }).end((req, res) => {
      if(res.status === 200) {
        this.setState({allMemory: res.body});
        this._handleScroll(2*scroll);
      } 
    });
  }

  _handleScroll = (scroll) => {
    window.scroll({
      top: scroll,
      left: 0, 
      behavior: 'smooth',
    });
  }

  render() {  
    const {name, memory, allMemory} = this.state;
    const allMemDisp = allMemory.map((mem) => (
      <div key={mem.id} className="result-box">
        <div className="result-memory">
          <div className="result-id">{mem.id}</div>
          <div className="result-username"><div className="text-yellow">name:</div>{mem.username}</div>
          <div className="result-detail"><div className="text-yellow">memory: </div>{mem.detail}</div>
        </div>
      </div>
    ));
    return (
      <div className="main">
        <img src={Background} alt='' className="background-image" />
        <div className="topic">
          Welcome to <br /> The Memories <br />
          <div className="detail">The place where we can share our memories together.</div>
          <button className="add-button" onClick={() => this._handleScroll(scroll)}><img className="add-icon" src={AddIcon} alt="" /> <br /> <div className="add-label">Add Your <br /> memories </div></button>
        </div>
        <div className="questionaire-section">
          <div className="all-form">
            <div className="questionaire-area">
              <div className="questionaire-label">Share Your Memories Here!</div>
                <div className="form">
                  <label className="quest-label">
                    Name
                  </label>
                  <input
                    value={name} 
                    placeholder="name"
                    className="quest-answer" 
                    onChange={(evt) => {
                    evt.preventDefault(); 
                    this.setState({name: evt.target.value});
                    }} 
                  />
                  <label className="quest-label">
                    Memory
                  </label>
                  <textarea
                    value={memory} 
                    placeholder="Add your valuable memories here"
                    className="quest-answer" 
                    onChange={(evt) => {
                    evt.preventDefault(); 
                    this.setState({memory: evt.target.value});
                    }} 
                  />
                </div>
            </div>
          <button className="submit" onClick={() => this._onSubmit()}>Submit <img className="send-icon" src={SendIcon} alt="" /></button>
          </div>
          <img className="memory-icon" src={MemoryIcon} alt="" />
        </div>
        <div className="result-section">
          <div className="result-topic">ALL MEMORIES</div>
          <div className="result-allmem">{allMemDisp}</div>
        </div>
        <footer>
          Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
        </footer>
      </div>
    );
  };
}
