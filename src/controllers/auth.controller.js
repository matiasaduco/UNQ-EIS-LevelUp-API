import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { Op } from 'sequelize'

export const signin = async (req, res) => {
  try {
    const { username, password, email, img } = req.body

    const user = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
    })
    if (user)
      return res
        .status(403)
        .send({ status: 403, message: 'Las credenciales ya están en uso.' })

    const hashedPassword = await hashPassword(password)
    await User.create({
      username,
      password: hashedPassword,
      email,
      img,
    })
    const token = jwt.sign({ username }, 'root', { expiresIn: '9999999h' })

    res.send({ message: 'Cuenta creada exitosamente!', token: token })
  } catch (error) {
    res.send({ message: error.message })
  }
}

const hashPassword = async password => {
  const saltRounds = 10
  const hashedPassword = bcrypt.hash(password, saltRounds)
  return hashedPassword
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ where: { username } })
    if (!user)
      return res
        .status(404)
        .send({ status: 404, message: 'Usuario no encontrado.' })

    const match = await bcrypt.compare(password, user.password)
    if (!match)
      return res
        .status(404)
        .send({ status: 404, message: 'Contraseña incorrecta.' })

    const token = jwt.sign({ username }, 'root', { expiresIn: '9999999h' })
    res.send({ message: 'Sesión iniciada exitosamente!', token: token })
  } catch (error) {
    res.send({ message: error.message })
  }
}

export const changePassword = async (req, res) => {
  try {
    const { username, password, newPassword } = req.body
    const user = await User.findByPk(username)
    if (!await bcrypt.compare(password, user.password))
      return res
        .status(404)
        .send({ status: 404, message: 'La contraseña actual es errónea.' })

    const hashedPassword = await hashPassword(newPassword)
    User.update({ password: hashedPassword }, { where: { username: username } })
    res
      .status(200)
      .send({ status: 200, message: 'Contraseña cambiada exitosamente!' })
  } catch (error) {
    res.send({ message: error.message })
  }
}
