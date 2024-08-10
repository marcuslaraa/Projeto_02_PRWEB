import express from "express"
import { atualizarCategoriaPorId, consultarCategoriaPorId, deletarCategoriaPorId, inserirCategoria, listarCategorias } from './controller/CategoriaController'

const app = express()
const PORT = process.env.PORT ?? 3000
app.use(express.json())

const logInfo = () => {
  console.log(`API em execução no URL: http://localhost:${PORT}`)
}

//CATEGORIA ENDPOINTS
app.post('/categoria', inserirCategoria)
app.get('/categoria/:id', consultarCategoriaPorId)
app.delete('/categoria/:id', deletarCategoriaPorId)
app.put('/categoria/:id', atualizarCategoriaPorId)
app.get('/categoria', listarCategorias)


app.listen(PORT, logInfo)
