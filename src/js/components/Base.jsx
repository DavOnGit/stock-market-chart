import { PropTypes, default as React } from 'react'

const Base = ({ children }) => (
  <div className='container'>
    {children}
  </div>
)

Base.propTypes = {
  children: PropTypes.object.isRequired
}

export default Base
