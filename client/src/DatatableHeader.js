import React from 'react'

const DatatableHeader = (props) => {
  return (
        <div className="active-permit-header">
            <h4 className="title">{props.Header}</h4>
            <div className="search-container">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search" className="form-control" />
            </div>

        </div>
  )
}

export default DatatableHeader
