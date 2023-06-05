import Adventure from '../models/adventure.js'
import User from '../models/user.js'

export const getAdventures = async (req, res) => {
  try {
    const adventures = await Adventure.findAll({ raw: true })

    adventures.map(adventure => {
      const imgData = Buffer.from(adventure.img).toString('base64')
      adventure.img = `data:image/jpeg;base64,${imgData}`
      const pdfData = Buffer.from(adventure.pdf).toString('base64')
      adventure.pdf = `data:application/pdf;base64,${pdfData}`
    })

    res.status(200).send(adventures)
  } catch (error) {
    res.send({ message: error.message })
  }
}

export const createAdventure = async (req, res) => {
  console.log(req.body)
  try {
    const adventure = await Adventure.create({
      id: req.body.id,
      owner: req.body.owner,
      title: req.body.title,
      level: req.body.level,
      duration: req.body.duration,
      language: req.body.language,
      img: req.files['img'][0].buffer,
      pdf: req.files['pdf'][0].buffer,
    })
    res.status(200).send({
      message: 'Aventura creada exitosamente!',
      adventure: adventure,
    })
  } catch (error) {
    res.send({ message: error.message })
  }
}

export const editAdventure = async (req, res) => {
  try {
    const adventure = await Adventure.update(req.body, {
      where: { id: req.body.id },
    })
    res.status(200).send({
      message: 'Aventura editada exitosamente!',
      adventure: adventure,
    })
  } catch (error) {
    res.send({ message: error.message })
  }
}

export const deleteAdventure = async (req, res) => {
  try {
    const adventure = await Adventure.findByPk(req.params.id)
    if (!adventure)
      return res.status(404).send({ message: 'Aventura no existente.' })

    await adventure.destroy()
    res.status(200).send({
      message: 'Aventura borrada exitosamente!',
    })
  } catch (error) {
    res.send({ message: error.message })
  }
}

export const likeAdventure = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.user },
      include: {
        model: Adventure,
        where: { id: req.params.id },
      },
    })
    const adventure = await Adventure.findByPk(req.params.id)

    if (user) {
      await user.removeAdventure(adventure)
      await adventure.removeUser(user)

      await adventure.decrement('likes', {
        where: { id: req.body.id },
      })
    } else {
      let newUser = await User.findByPk(req.params.user)
      await newUser.addAdventure(adventure)
      await adventure.addUser(newUser)

      await adventure.increment('likes', {
        where: { id: req.body.id },
      })
    }

    res.status(200).send({
      message: 'Aventura votada exitosamente!',
    })
  } catch (error) {
    res.send({ message: error.message })
  }
}
