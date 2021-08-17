import React, { Component } from 'react'
import PuffLoader from 'react-spinners/PuffLoader'
import { css } from '@emotion/react'

const override = css`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

class Loader extends Component {
  render() {
    return (
      <>
        <PuffLoader color={'#167AB6'} loading={true} css={override} size={150} />
      </>
    )
  }
}

export default Loader
