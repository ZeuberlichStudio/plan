import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const ModalHeader = ({posts}) => {

  function findCat(cat) {
    if( cat._id === '5defcab71c9d440000e67e80' ){
      return cat
    }
  }

  return(
    <div id="modal_header" className="modal_header static">
      <div className="modal_header_content">
        <h2>{ posts[0].cat.find(findCat).name }</h2>
      </div>
      <Link to="/" id="modal_close"></Link>
    </div>
  );
}

export default ModalHeader
