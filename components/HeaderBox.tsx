import React from 'react'

const HeaderBox = ({type = "title", title, subtext, user}: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <h1 className='header-box-title'>
        {title}
        {type === "greeting" && (
          <span className='text-bankGradient'>
            {user? `, ${user}!` : ''}
          </span>
        )}
      </h1>
      <p>
        {subtext}
        {type === "greeting" && (
          <span className='text-bankGradient'>
            {" "}
            {user? `Welcome back!` : ''}
          </span>
        )}
      </p>
    </div>
  )
}

export default HeaderBox