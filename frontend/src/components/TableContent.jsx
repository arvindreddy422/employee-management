import {useNavigate} from 'react-router-dom'

const TableContent = ({ empdata, deleteEmp }) => {
  const navigate = useNavigate()
  function editEmp(){
     navigate(`/edit/${empdata.f_Id}`)
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {empdata.f_Id}
      </td>
      <td className="px-6 py-4">
        <img src={empdata.f_Image} alt="img" />
      </td>
      <td className="px-6 py-4">{empdata.f_Name}</td>
      <td className="px-6 py-4">{empdata.f_Email}</td>
      <td className="px-6 py-4">{empdata.f_Mobile}</td>
      <td className="px-6 py-4">{empdata.f_Designation}</td>
      <td className="px-6 py-4">{empdata.f_gender}</td>
      <td className="px-6 py-4">{empdata.f_Course}</td>
      <td className="px-6 py-4">{empdata.f_Createdate}</td>
      <td className="px-6 py-4 text-right">
        <button onClick={editEmp}>Edit</button>
        <button onClick={() => deleteEmp(empdata.f_Id)}>Delete</button>
      </td>
    </tr>
  )
}

export default TableContent
