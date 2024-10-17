import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material'
import React, { useState } from 'react'

const DropdownIcon:React.FC = () => {
    const [up, setUp] = useState<boolean>(false)
  return (
    <button onClick={() => (setUp(!up))}>
    {up ? <KeyboardArrowDownRounded /> : <KeyboardArrowUpRounded /> }
    </button>
  )
}

export default DropdownIcon
