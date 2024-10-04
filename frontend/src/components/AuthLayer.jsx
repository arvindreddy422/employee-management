import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import userAtom from '../store/userAtom'

const AuthLayer = ({ children, isAuthReq = false }) => {
  const navigate = useNavigate()
  const setName = useSetRecoilState(userAtom)
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')) || ''
    const name = JSON.parse(localStorage.getItem('name')) || ''


    setName(name)

    if (!isAuthReq && token) {
      navigate('/dashboard')
    } else if (isAuthReq && !token) {
      navigate('/signin')
    }
  }, [isAuthReq, navigate, setName])
  return <div>{children}</div>
}

export default AuthLayer
