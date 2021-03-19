import React from 'react'
import './Button.scss'

const Button = props => {
  const cls = ['Button']
  
  if (props.type) {
    cls.push(props.type)
  }
  
  return (
    <button
      className={cls.join(' ')}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button