import { useEffect, useState } from 'react'
import Container from './Container'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EmpDetail = ({ type = 'edit' }) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const [loading, setLoading] = useState(type === 'edit')
  const { id } = useParams()

  const [empData, setEmpData] = useState({
    course: '',
    designation: 'HR',
    email: '',
    gender: 'Male',
    id: 6,
    image: '',
    mobile: '',
    name: '',
  })
  useEffect(() => {
    async function getEmpById() {
      const token = JSON.parse(localStorage.getItem('token'))

      if (type == 'edit') {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/employ-id/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )

        if (response.data.success) {
          setEmpData(response.data.emp)
          setLoading(false)
        } else {
          setErrorMessage(response.data.message)
          setLoading(false)
        }
      }
    }
    getEmpById()
  }, [id, type])

  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [course, setCourse] = useState([false, false, false, 'n'])

  const [image, setImage] = useState('')

  function handleImage(e) {
    const file = e.target.files[0]
    setImage(file)
  }

  function getCourses() {
    let c = ''
    if (course[0]) {
      c += 'BCA '
    }
    if (course[1]) {
      c += 'BSC '
    }
    if (course[2]) {
      c += 'MCA'
    }

    return c
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let courses
      if (course[3] === 'm') {
        courses = getCourses()
      } else {
        courses = empData.course
      }
      const Data = {
        ...empData,
        course: courses,
      }

      const formData = new FormData()
      formData.append('image', image)
      if (image) {
        const resurl = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',

              Authorization: token,
            },
          }
        )
        Data.image = resurl.data.url
      }

      if (type === 'edit') {
        await axios.put(`${import.meta.env.VITE_BASE_URL}/employ`, Data, {
          headers: {
            Authorization: token,
          },
        })
      } else {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/employ`, Data, {
          headers: {
            Authorization: token,
          },
        })
      }
      navigate('/dashboard')
    } catch (error) {
      console.log(error.message)
    }
  }

  if (errorMessage) {
    ;<div>
      <h1 className="text-center m-6">{errorMessage}</h1>
    </div>
  }
  if (loading || !empData) {
    return (
      <div>
        <h1 className="text-center m-6">Loading...</h1>
      </div>
    )
  }
  return (
    <Container width="max-w-4xl">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="w-64">
          <p className=" my-2  ">Name</p>
          <input
            onChange={(e) =>
              setEmpData({ ...empData, [e.target.id]: e.target.value })
            }
            className="outline-none w-full rounded-sm p-1 text-black"
            type="text"
            id="name"
            name="name"
            value={empData.name}
            required
          />
          <p className=" mt-2 ">Email</p>
          <input
            onChange={(e) =>
              setEmpData({ ...empData, [e.target.id]: e.target.value })
            }
            className="outline-none  w-full  rounded-sm p-1 text-black"
            type="email"
            id="email"
            name="email"
            value={empData.email}
            required
          />
          <p className=" mt-2 ">Mobile No</p>
          <input
            className="outline-none  w-full  rounded-sm p-1 text-black"
            onChange={(e) =>
              setEmpData({ ...empData, [e.target.id]: e.target.value })
            }
            type="tel"
            id="mobile"
            value={empData.mobile}
            required
            name="mobile"
            pattern="[0-9]{10}"
          />

          <p className=" mt-2 ">Designation</p>
          <select
            className="text-black"
            required
            onChange={(e) =>
              setEmpData({ ...empData, [e.target.id]: e.target.value })
            }
            defaultValue={'HR'}
            name="designation"
            selected={empData.designation}
            id="designation"
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          <p className=" mt-2 " id="gender" name="gender">
            Gender
          </p>
          <input
            onChange={(e) =>
              setEmpData({ ...empData, [e.target.id]: e.target.value })
            }
            type="radio"
            name="gender"
            checked={empData.gender === 'Male'}
            id="gender"
            value={'Male'}
          />
          <label htmlFor="M">Male</label>
          <input
            onChange={(e) =>
              setEmpData({ ...empData, [e.target.id]: e.target.value })
            }
            type="radio"
            name="gender"
            id="gender"
            checked={empData.gender === 'Female'}
            value={'Female'}
          />
          <label htmlFor="F">Female</label>

          <p name="course" id="course" className=" mt-2 ">
            Course
          </p>
          <p>{empData.course}</p>
          <input
            onChange={(e) => {
              course[3] = 'm'
              let arr = course
              arr[parseInt(e.target.id)] = !course[parseInt(e.target.id)]

              setCourse(arr)
            }}
            type="checkbox"
            id="0"
            name="course"
            value={'BCA'}
          />
          <label htmlFor="BCA">BCA</label>
          <input
            onChange={(e) => {
              course[3] = 'm'
              let arr = course
              arr[parseInt(e.target.id)] = !course[parseInt(e.target.id)]
              setCourse(arr)
            }}
            type="checkbox"
            id="1"
            name="course"
            value={'BSC'}
          />
          <label htmlFor="BSC">BSC</label>
          <input
            onChange={(e) => {
              course[3] = 'm'
              let arr = course
              arr[parseInt(e.target.id)] = !course[parseInt(e.target.id)]
              setCourse(arr)
            }}
            type="checkbox"
            id="2"
            name="course"
            value={'MCA'}
          />
          <label htmlFor="MCA">MCA</label>

          <p className=" my-2 ">Image</p>
          {type === 'edit' ? <img src={empData.image} alt="img" /> : null}
          <input
            onChange={handleImage}
            type="file"
            id="image"
            required={type === 'edit' ? false : true}
            name="image"
            accept="image/png,  image/jpg"
          />
        </div>
        <div className="mt-4">
          {type ? (
            <button
              type="submit"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              {type === 'create' ? 'Create' : 'Edit'}
            </button>
          ) : (
            <button
              type="submit"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </Container>
  )
}

export default EmpDetail
