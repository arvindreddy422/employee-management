import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { useState } from 'react'
import Loading from '../components/Loading'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import userAtom from '../store/userAtom'

const Signin = () => {
  const setUser = useSetRecoilState(userAtom)
  const navigate = useNavigate()
  const [errMessage, setErrMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  })
  function handleInput(e) {
    setLoginInfo({ ...loginInfo, [e.target.id]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (loginInfo.username.length < 5) {
        return setErrMessage('username atleast 5 characters')
      } else if (loginInfo.password.length < 6) {
        return setErrMessage('password atleast 6 characters')
      } else {
        setErrMessage('')
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signin`,
        {
          username: loginInfo.username,
          password: loginInfo.password,
        }
      )
      if (response.data.success) {
        localStorage.setItem('token', JSON.stringify(response.data.user.token))
        localStorage.setItem(
          'name',
          JSON.stringify(response.data.user.username)
        )
        setUser(response.data.user.username)
        navigate('/dashboard')
      } else {
        setErrMessage(response.data.message)
      }
    } catch (error) {
      setErrMessage(error.message)
    }

    setLoading(false)
    return
  }
  return (
    <Container width=" max-w-4xl flex justify-center items-center h-[80vh] ">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center p-4 text-3xl font-medium">Sign In</h1>
        <div className="w-96">
          <input
            onChange={handleInput}
            id="username"
            type="text"
            required
            placeholder="Username"
            className="pl-3 py-2 text-black font-medium w-full rounded-md mb-4"
          />
          <input
            onChange={handleInput}
            type="text"
            required
            id="password"
            placeholder="Password"
            className="pl-3 py-2 text-black font-medium w-full rounded-md mb-4"
          />
        </div>
        <div className="w-96">
          <button
            className="w-full outline-none text-base font-semibold bg-slate-600 p-2 rounded-md"
            type="submit"
          >
            {loading ? <Loading /> : 'Sign In'}
          </button>
          <p className="text-red-600">{errMessage}</p>

          <p className="mt-3">
            Don`t have an account:
            <Link to={'/signup'}> SignUp</Link>
          </p>
        </div>
      </form>
    </Container>
  )
}

export default Signin
