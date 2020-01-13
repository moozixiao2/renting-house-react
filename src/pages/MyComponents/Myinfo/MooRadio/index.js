import React from 'react'



export function RadioGroup (props) {
  console.log(props)
  return (
    <div>
      {React.Children.map(props.children, child => {
        return React.cloneElement(child, {name: props.name})
      })}
    </div>
  )
}

export function Radio ({children, ...rest}) {
  console.log(children, rest)
  return (
    <label>
      <input type='radio' {...rest} /><span>{children}</span>
    </label>
  )
}