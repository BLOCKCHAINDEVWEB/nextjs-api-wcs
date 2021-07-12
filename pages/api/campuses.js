import {
  getCampuses,
  queryCampuses,
  postCampus,
  putCampus
} from "../../models/campus"
import {cors } from './cors'


export default async (req, res) => {
  await cors(req, res)
  const httpMethod = req.method
  const { id, name } = req.body
  const campuses = await getCampuses()

  let params = {}
  const results = req.url.split('?').pop().split('&')
  results.map(result => {
    params = { ...params, [result.split('=').shift()]: result.split('=').pop() }
  })
  const { limit, offset } = params
  const total = Math.ceil(campuses.length / (offset - limit))

  switch(httpMethod) {
    case 'GET':
      // Get all campuses
      if (limit && offset && offset > limit) {
        const query = await queryCampuses(limit, offset - limit)
        res.setHeader('x-total-count', `${total}`)
        res.status(200).json({
          "x-total-count": `${total}`,
          campuses: query
        })
      } else {
        res.status(200).json(campuses)
      }
      break
    case 'POST':
      // Post a new campus (TODO)
      const { lastID } = await postCampus(name)
      res.status(200).json({ id: lastID, name })
      break
    case 'PUT':
      // Update once campus (TODO)
      await putCampus(id, name)
      res.status(200).json({ id: id, name: name })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT'])
      res.status(405).end(`Method ${httpMethod} Not allowed!`)
      break
  }
}
