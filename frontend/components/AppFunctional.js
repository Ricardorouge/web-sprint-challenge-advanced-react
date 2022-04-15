import React,{useState, useEffect} from 'react'
import axios from 'axios'


const URL =  'http://localhost:9000/api/result'

function useForm(values){
  const [form, setForm] = useState('form', values)
  const onChange = ({ target: { type, value } }) =>
    setForm({ ...form, [type]: value })
    const [x,setX] = useState(2)
    const [y,setY] = useState(2)
    const [steps,setSteps] = useState(0)
    const [message,setMessage] = useState('')
    const onClickUp = ()=>{
      setY(y>1? y-1:y)
      setSteps(y>1?steps+1:steps)
      setMessage(y>1?'':"You can't go up")
    }
    const onClickDown =()=>{
      setY(y<3? y+1:y)
      setSteps(y<3?steps+1:steps)
      setMessage(y<3?'':"You can't go down")
    }
    const onClickLeft =()=>{
      setX(x>1? x-1:x)
      setSteps(x>1?steps+1:steps)
      setMessage(x>1?'':"You can't go left")
    }
    const onClickRight =()=>{
      setX(x<3? x+1:x)
      setSteps(x<3?steps+1:steps)
      setMessage(x<3?'':"You can't go right")
    }
    const reset =()=>{
      setX(2)
      setY(2)
      setSteps(0)
      setMessage('')
      setForm(values)
    }
    const postAPI =(email)=>{
      const newPost = {
        x:x,
        y:y,
        steps:steps,
        email:email
      } 
      axios.post(URL,newPost)
      .then(res=>{
        setMessage(res.data.message)
      })
      .catch(err=>{
        setMessage(err.response.data.message)
      })
    }
    const onSubmit =evt=>{
      evt.preventDefault()
      postAPI(form.email)
      setForm(values)
    }
  return [form, onChange,x,y,steps,message,onClickUp,onClickDown,onClickLeft,onClickRight,reset,onSubmit]
}


export default function AppFunctional(props) {
  const [form,onChange,x,y,steps,message,up,down,left,right,reset,onSubmit] = useForm({email:''})
  

  return (
    <div id="wrapper" className={props.className}>
      <div data-testid='heading'className="info">
        <h3 id="coordinates">Coordinates ({x}, {y})</h3>
        <h3 id="steps">You moved {steps} {(steps===1?'time':'times')}</h3>
      </div>
      <div id="grid">
        <div className={'square '+ (x==1&&y==1?'active':'')}>{(x==1&&y==1?'B':'')}</div>
        <div className={'square '+ (x==2&&y==1?'active':'')}>{(x==2&&y==1?'B':'')}</div>
        <div className={'square '+ (x==3&&y==1?'active':'')}>{(x==3&&y==1?'B':'')}</div>
        <div className={'square '+ (x==1&&y==2?'active':'')}>{(x==1&&y==2?'B':'')}</div>
        <div className={'square '+ (x==2&&y==2?'active':'')}>{(x==2&&y==2?'B':'')}</div>
        <div className={'square '+ (x==3&&y==2?'active':'')}>{(x==3&&y==2?'B':'')}</div>
        <div className={'square '+ (x==1&&y==3?'active':'')}>{(x==1&&y==3?'B':'')}</div>
        <div className={'square '+ (x==2&&y==3?'active':'')}>{(x==2&&y==3?'B':'')}</div>
        <div className={'square '+ (x==3&&y==3?'active':'')}>{(x==3&&y==3?'B':'')}</div>
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div data-testid='keypad'id="keypad">
        <button id="left" onClick={left}>LEFT</button>
        <button id="up" onClick={up}>UP</button>
        <button id="right" onClick ={right}>RIGHT</button>
        <button id="down" onClick={down}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input 
        data-testid='input'
        id="email" 
        type="email" 
        placeholder="type email" 
        onChange ={onChange}
        value = {form.email}
        />
        <input data-testid='submit'id="submit" type="submit"></input>
      </form>
    </div>
  )
}
