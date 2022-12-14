import React, {useEffect, useState, useRef} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function AutoComplete (props){
  // constructor(props) {
  //   super(props);
    // this.state = {
    //   inputVal: '',
    //   showList: false
    // };
    // this.inputRef = React.createRef();
  // }
  const [value, setValue] = useState('');
  const [list, setList] = useState(false);

  const inputRef = useRef(null);

  // componentDidUpdate() { 
  //   if (this.state.showList) {
  //     document.addEventListener('click', this.handleOutsideClick);
  //   } else {
  //     console.log("Removing Autocomplete listener on update!");
  //     document.removeEventListener('click', this.handleOutsideClick);
  //   }
  // }

  useEffect(()=>{
    if (list) {
      console.log("there is a list")
      document.addEventListener('click', handleOutsideClick);
    } else {
      console.log("Removing Autocomplete listener on update!");
      document.removeEventListener('click', handleOutsideClick);
    }
    return (()=>{
      console.log("Cleaning up event listener from Autocomplete!");
      document.removeEventListener('click', handleOutsideClick);
    })
  }, [list])

  // componentWillUnmount () {
  //   console.log("Cleaning up event listener from Autocomplete!");
  //   document.removeEventListener('click', this.handleOutsideClick);
  // }

  const handleInput = (e) => {
    setValue(e.target.value);
    
  }

  const selectName = ({ target:  { innerText: name }}) => {
    setValue(name);
    setList(false);
  }

  // Set focus to input field if user clicks anywhere inside the Autocomplete
  // section (unless they have selected a name from the dropdown list)
  const handleAutocompleteSectionClick = ({ target }) => {
    if (!target.classList.contains("nameLi")) {
      inputRef.current.focus();
    }
  }

  const handleOutsideClick = () => {
    // Leave dropdown visible as long as input is focused
    if (document.activeElement === inputRef.current) return;
    else setList(false );
  }

  const matches = () => {
    // const { inputVal } = this.state;
    const { names } = props;
    const inputLength = value.length;
    const matches = [];
    console.log(names)
    if (inputLength === 0) return names;

    names.forEach(name => {
      const nameSegment = name.slice(0, inputLength);
      if (nameSegment.toLowerCase() === value.toLowerCase()) {
        matches.push(name);
      }
    });

    if (matches.length === 0) matches.push('No matches');

    return matches;
  }

  
    const results = matches().map((result) => {
      const nodeRef = React.createRef();
      return (
        <CSSTransition
          nodeRef={nodeRef}
          key={result}
          classNames="result"
          timeout={{ enter: 500, exit: 300 }}
        >
          <li ref={nodeRef} className="nameLi" onClick={selectName}>
            {result}
          </li>
        </CSSTransition>
      )
    });
  
  return (
    <section 
      className="autocomplete-section" 
      onClick={handleAutocompleteSectionClick}
    >
      <h1>Autocomplete</h1>
      <div className="auto">
        <input
          placeholder="Search..."
          ref={inputRef}
          onChange={handleInput}
          value={value}
          onFocus={() => setList(true)}
        />
        {list && (
          <ul className="auto-dropdown">
            <TransitionGroup>
              {results}
            </TransitionGroup>
          </ul>
        )}
      </div>
    </section>
  );
  
}

export default AutoComplete;