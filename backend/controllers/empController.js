const prisma = require('../config/db')

exports.getAllEmploys = async (req, res) => {
  try {
    const allEmp = await prisma.t_Employee.findMany()
    return res.json({
      success: true,
      allEmp,
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      success: false,
      message: error.message,
    })
  }
}

exports.addEmploy = async (req, res) => {
  const { name, email, image, mobile, designation, gender, course } = req.body
  try {
    const employ = await prisma.t_Employee.create({
      data: {
        f_Image: image,
        f_Name: name,
        f_Email: email,
        f_Mobile: mobile,
        f_Designation: designation,
        f_gender: gender,
        f_Course: course,
      },
    })
    return res.json({
      success: true,
      employ,
    })
  } catch (e) {
    console.log(e.message)
    return res.json({
      success: false,
      message: e.message,
    })
  }
}

exports.updateEmploy = async (req, res) => {
  const { id, name, email, image, mobile, designation, gender, course } =
    req.body
  try {
    const employ = await prisma.t_Employee.update({
      where: {
        f_Id: parseInt(id),
      },
      data: {
        f_Image: image,
        f_Name: name,
        f_Email: email,
        f_Mobile: mobile,
        f_Designation: designation,
        f_gender: gender,
        f_Course: course,
      },
    })
    return res.json({
      success: true,
      employ,
    })
  } catch (error) {
    console.log(error.message)
    return res.json({
      success: false,
      message: error.message,
    })
  }
}

exports.deleteEmploy = async (req, res) => {
  try {
    const id = req.params.id

    await prisma.t_Employee.delete({
      where: {
        f_Id: parseInt(id),
      },
    })

    return res.json({
      success: true,
      message: 'Delete Success',
    })
  } catch (e) {
    return res.json({
      success: false,
      message: 'Record not exist',
    })
  }
}
exports.getById = async (req, res) => {
  try {
    const id = req.params.id

    const emp = await prisma.t_Employee.findFirst({
      where: {
        f_Id: parseInt(id),
      },
    })
    const conEmp = {
      name: emp.f_Name,
      email: emp.f_Email,
      id: emp.f_Id,
      image: emp.f_Image,
      mobile: emp.f_Mobile,
      designation: emp.f_Designation,
      gender: emp.f_gender,
      course: emp.f_Course,
    }
    return res.json({
      success: true,
      emp: conEmp,
    })
  } catch (e) {
    return res.json({
      success: false,
      message: 'Record not exist',
    })
  }
}

exports.searchEmploy = async (req, res) => {
  try {
    const search = req.params.search
 
    let searchEmp
    if (search == '') {
      searchEmp = await prisma.t_Employee.findMany()
    } else {
      searchEmp = await prisma.t_Employee.findMany({
        where: {
          OR: [
            {
              f_Name: {
                contains: `${search}`,
              },
            },
            {
              f_Email: {
                contains: search,
              },
            },
            {
              f_Id: {
                equals: parseInt(search) ? parseInt(search) : -1,
              },
            },
          ],
        },
      })
    }
    return res.json({
      success: true,
      searchEmp,
    })
  } catch (e) {
    console.log(e.message)

    return res.json({
      success: false,
      message: 'Record not exist',
    })
  }
}
