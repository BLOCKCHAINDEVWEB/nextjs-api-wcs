import {
  getCampuses,
  patchCampus,
  delCampus
} from "../../../models/campus"
import {cors } from '../cors'


export default async function (req, res) {
  await cors(req, res)
  const httpMethod = req.method
  const { id } = req.query
  const { name } = req.body
  const campuses = await getCampuses()
  const filtered = campuses.filter(campus => campus.id === parseInt(id))

  switch(httpMethod) {
    case 'GET':
      // get by id the campus (TODO)
      if (filtered.length > 0) {
        res.status(200).json(filtered[0])
      } else {
        res.status(404).end(`Campus with id: ${id} not found`)
      }
      break
    case 'PATCH':
      // Update the job (TODO) with Patch
      if (filtered.length > 0) {
        if (!req.body) {
          res.status(404).end('Error empty body')
          return
        }
        if (name.length > 0 && name.length < 51) {
          await patchCampus(id, name)
          res.status(200).json({ id, name: name })
        } else {
          res.status(422).end({
            status: 422,
            message: `Campus name be a string between 1 and 50 characters long`
          })
        }
      } else {
        res.status(404).json({
          status: 404,
          message: `Campus with id: ${id} not found`
        })
      }
      break
    case 'DELETE':
      // Delete once campus (TODO)
      if (filtered.length > 0) {
        await delCampus(id)
        res.status(204).json({
          status: 204,
          message: `Success delete campus ${id}`
        })
      } else {
        res.status(404).json({
          status: 404,
          message: `Campus with id: ${id} not found`
        })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${httpMethod} Not allowed!`)
      break
  }
}
