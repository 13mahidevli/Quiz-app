import React from 'react'
import Quiz from "./components/Quiz";
import './App.css'

export default function App() {
  return (
    <div>
      <Quiz/>
    </div>
  )
}

// import React,{useState} from 'react'

// export default function App() {
//   const [number, setnumber] = useState(0)
//   const buttons=['one','two','three','four','five']
//   function handleanswer() {
//     setnumber(number+1)
//   }
//   return (
//     <div>
//       {buttons.map((button,index)=>(
//         <button key={index}
//         style={{backgroundColor:index<=number?'red':'white'}}
//         >{button}</button>
//       ))}
//       <div onClick={handleanswer}>
//         <button>next</button>
//       </div>
//     </div>
//   )
// }

