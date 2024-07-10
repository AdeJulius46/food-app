import React from 'react'

const dateTimefunction = (str) => {
  return str.replace("T", " ").substring(0,16)
}

export default dateTimefunction