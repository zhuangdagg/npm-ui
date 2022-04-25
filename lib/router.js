import { Router } from 'express'
import path from 'path'

export const router = Router()


router.get('/other', (req, res, next) => {
  res.end('end')
})
