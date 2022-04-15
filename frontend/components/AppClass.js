import React from 'react'
import axios from 'axios'


const URL =  'http://localhost:9000/api/result'
export default class AppClass extends React.Component {
  
  state = {
    x:2,
    y:2,
    steps:0,
    email:'',
    message:'',
  }

  sendAPI = ()=>{
    const newPost = {
      x:this.state.x,
      y:this.state.y,
      steps:this.state.steps,
      email:this.state.email
    }
    axios.post(URL,newPost)
    .then(res=>{
      this.setState({
        ...this.state,
        message:res.data.message
      })
    })
    .catch(err=>{
      console.log(err)
      this.setState({
      ...this.state,
      message:err.response.data.message
    }
  )})
  }

  moveDown = ()=>{
    this.setState({
      ...this.state,
      y:this.state.y<3?this.state.y+1:this.state.y,
      steps: this.state.y<3?this.state.steps+1:this.state.steps,
      message:this.state.y<3?'':"You can't go down",

    })
  }
  moveUp =()=>{
    this.setState({
      ...this.state,
      y:this.state.y>1?this.state.y-1:this.state.y,
      steps:this.state.y>1?this.state.steps+1:this.state.steps,
      message:this.state.y>1?'':"You can't go up",

    })
  }
  moveLeft = ()=>{
    this.setState({
      ...this.state,
      x:this.state.x>1?this.state.x-1:this.state.x,
      steps:this.state.x>1?this.state.steps+1:this.state.steps,
      message:this.state.x>1?'':"You can't go left",

    })
  }
  moveRight = ()=>{
    this.setState({
      ...this.state,
      x:this.state.x<3?this.state.x+1:this.state.x,
      steps:this.state.x<3?this.state.steps+1:this.state.steps,
      message:this.state.x<3?'':"You can't go right",

    })
  }
  moveReset = ()=>{
    this.setState({
      ...this.state,
      x:2,
      y:2,
      steps:0,
      message:'',
      email:''
    })
  }
  
  onChange =evt=>{
    this.setState({
      ...this.state,
      email:evt.target.value
    })
  }
  onSubmit = evt=>{
    evt.preventDefault()
    this.sendAPI()
    this.setState({
      ...this.state,
      email:''
    })
  }
  square1 =()=>{
    if(this.state.x ==1 && this.state.y ==1){
      return 'square active'
    } else{
      return 'active'
    }
  }
  


  render() {
    
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x},{this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} {(this.state.steps===1?'time':'times')}</h3>
        </div>
        <div id="grid">
          <div className={'square ' + (this.state.x ==1 && this.state.y ==1? 'active' : '')}>{(this.state.x ==1 && this.state.y ==1? 'B':'')}</div>
          <div className={'square ' + (this.state.x ==2 && this.state.y ==1? 'active' : '')}>{(this.state.x ==2 && this.state.y ==1? 'B':'')}</div>
          <div className={'square ' + (this.state.x ==3 && this.state.y ==1? 'active' : '')}>{(this.state.x ==3 && this.state.y ==1? 'B':'')}</div>
          <div className={'square ' + (this.state.x ==1 && this.state.y ==2? 'active' : '')}>{(this.state.x ==1 && this.state.y ==2? 'B':'')}</div>
          <div className={'square ' + (this.state.x ==2 && this.state.y ==2? 'active' : '')}>{(this.state.x ==2 && this.state.y ==2? 'B':'')}</div>
          <div className={'square ' + (this.state.x ==3 && this.state.y ==2? 'active' : '')}>{(this.state.x ==3 && this.state.y ==2? 'B':'')}</div>
          <div className={'square ' + (this.state.x ==1 && this.state.y ==3? 'active' : '')}>{(this.state.x ==1 && this.state.y ==3? 'B':'')}</div>
          <div className={'square ' + (this.state.x ==2 && this.state.y ==3? 'active' : '')}>{(this.state.x ==2 && this.state.y ==3? 'B':'')}</div>
          <div className={'square ' + (this.state.x ==3 && this.state.y ==3? 'active' : '')}>{(this.state.x ==3 && this.state.y ==3? 'B':'')}</div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick ={this.moveLeft} id="left">LEFT</button>
          <button onClick ={this.moveUp} id="up">UP</button>
          <button onClick ={this.moveRight} id="right">RIGHT</button>
          <button onClick ={this.moveDown} id="down">DOWN</button>
          <button onClick ={this.moveReset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" value ={this.state.email} onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
