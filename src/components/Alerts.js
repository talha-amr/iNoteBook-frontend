import React from 'react'

export default function Alerts(props) {
    function capitalized (message){
       let newText =message.charAt(0).toUpperCase() + message.slice(1);
       return newText;
    }
  return (
        <div style={{ height: '50px' }}>
            {props.alert && (
                <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{capitalized(props.alert.type)}</strong>: {props.alert.message}
                </div>
            )}
        </div>
  )
}
