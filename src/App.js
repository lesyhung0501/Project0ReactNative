import {useReducer, useRef} from 'react';

let initState = {
  job: '',
  jobs: []
};

let Set_Job = 'set_job';
let Add_Job = 'add_job';
let Delete_Job = 'delete_job';

function setJob(payload) {
  return {
    type: 'set_job',
    payload
  }
}

function addJob(payload) {
  return {
    type: 'add_job',
    payload
  }
}

function deleteJob(payload) {
  return {
    type: 'delete_job',
    payload
  }
}


function reducer(state, action) {
  switch(action.type) {
    case Set_Job:
      return {
        ...state,
        job: action.payload
      }
     
    case Add_Job:
      return {
        ...state,
        jobs: [...state.jobs, action.payload]
      }

    case Delete_Job:
      // let newJobs = state.jobs;
      // console.log(newJobs === [...state.jobs]);
      // newJobs.splice(action.payload, 1)
      // console.log(newJobs);

      // let a = {
      //   ...state,
      //   jobs: newJobs
      // }

      // console.log(a);
      let newJobs = [...state.jobs];
      newJobs.splice(action.payload, 1);
      return {
        ...state,
        jobs: newJobs
      }
      
    default:
      throw new Error('Invalid action');
  }
}




function App() {
  
  let [state, dispatch] = useReducer(reducer, initState);
  let inputRef = useRef();
  
  
  function handleClick() {
    dispatch(addJob(state.job));
    dispatch(setJob(''));
    inputRef.current.focus();
  }

  function handleDelete(index) {
    dispatch(deleteJob(index))
    inputRef.current.focus();
  }
  
  return (
    <div className="App" style={{padding: '10px'}}>
      <input
        style={{margin: '0 10px 0 24px', padding: '2px'}}
        ref = {inputRef}
        value={state.job}
        onChange={e => dispatch(setJob(e.target.value))}
      />
      <button style={{padding: '2px 8px', color: 'green', fontWeight: 'bold'}} onClick={handleClick}>ADD</button>
      <ol>
        {state.jobs.map(function (job, index) {
          return (
            <li key={index} style={{borderBottom: '1px solid #ccc', paddingTop: '8px'}}>
              <span style={{display: 'inline-block', minWidth: '144px'}}>{job}</span>
              <span style={{paddingLeft: '20px', color: 'red'}} onClick={() => handleDelete(index)}>DELETE</span>
            </li>
          )
        })}
      </ol>
    </div>
  );
}

export default App;

