import { useEffect, useState } from 'react'
import Container from '../components/Container'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TableContent from '../components/TableContent'

const Dashboard = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate()

  const [allEmp, setAllEmp] = useState([])
  async function deleteEmp(id) {
    const newEmp = allEmp.filter((emp) => {
      return emp.f_Id != id
    })
    setAllEmp(newEmp)

    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/employ/${id}`)
    } catch (e) {
      console.log(e.message)
    }
  }

  async function searchEmp(input) {
    if (!input) {
      getData()
    } else {
      const searchData = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/employ/${input}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      setAllEmp(searchData.data.searchEmp)
    }
  }
  async function getData() {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/employ`, {
      headers: {
        Authorization: token,
      },
    })
    if (res.data.success) {
      setAllEmp(res.data.allEmp)
    } else {
      console.log(res.data.message)
    }
  }
  useEffect(() => {
    try {
      getData()
    } catch (error) {
      console.log(error.message)
    }
    async function getData() {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/employ`, {
        headers: {
          Authorization: token,
        },
      })
      if (res.data.success) {
        setAllEmp(res.data.allEmp)
      }
    }
    getData()
  }, [token])
  return (
    <Container>
      <div className="flex justify-between mb-3">
        <button
          type="button"
          onClick={() => {
            navigate('/create-employee')
          }}
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          Create Employee
        </button>
        <input
          type="text"
          placeholder="search.."
          onChange={(e) => searchEmp(e.target.value)}
          className="w-48 h-9 rounded-sm outline-none pl-1 font-medium text-black"
        />
      </div>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Unique Id
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Image</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Name</div>
                </th>

                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Email</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Mobile</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Designation</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Gender</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Course</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Create date</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {allEmp?.map((empdata, idx) => (
                <TableContent
                  key={idx}
                  deleteEmp={deleteEmp}
                  empdata={empdata}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}

export default Dashboard
