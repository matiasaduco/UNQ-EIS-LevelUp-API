import Adventure from '../models/adventure.js'

export const getAdventures = async (req, res) => {
  try {
    const adventures = await Adventure.findAll()
    res.status(200).send(adventures)
  } catch (error) {
    res.send({ message: error.message })
  }
}

export const createAdventure = async (req, res) => {
  try {
    const adventure = await Adventure.create(req.body)
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
