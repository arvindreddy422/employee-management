import Container from './Container'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import userAtom from '../store/userAtom'

const Header = () => {
  const [user, setUser] = useRecoilState(userAtom)

  const navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    setUser('')
    navigate('/signin')
  }

  return (
    <Container>
      <div className="px-4 flex justify-between items-center">
        <Link to={'/dashboard'}>
          <span>AK</span>
        </Link>
        <div>
          {user ? (
            <span>
              {`${user} - `}
              <button
                onClick={logout}
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Logout
              </button>
            </span>
          ) : (
            <span>
              <Link to={'/signup'}>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Signup
                </button>
              </Link>
            </span>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Header
