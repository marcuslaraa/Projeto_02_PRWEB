import express from "express"
import { atualizarCategoriaPorId, consultarCategoriaPorId, deletarCategoriaPorId, inserirCategoria, listarCategorias } from './controller/CategoriaController'
import { atualizarLivroPorId, consultarLivroPorId, deletarLivroPorId, inserirLivro, listarLivros } from './controller/LivroController'
import { atualizarPessoaPorId, consultarPessoaPorId, deletarPessoaPorId, inserirPessoa, listarPessoas } from './controller/PessoaController'

const app = express()
const PORT = process.env.PORT ?? 3000
app.use(express.json())

const logInfo = () => {
  console.log(`API em execução no URL: http://localhost:${PORT}`)
}

//PESSOA ENDPOINTS
app.post('/pessoa', inserirPessoa)
app.get('/pessoa/:id', consultarPessoaPorId)
app.delete('/pessoa/:id', deletarPessoaPorId)
app.put('/pessoa/:id', atualizarPessoaPorId)
app.get('/pessoa', listarPessoas)

//LIVRO ENDPOINTS
app.post('/livro', inserirLivro)
app.get('/livro/:id', consultarLivroPorId)
app.delete('/livro/:id', deletarLivroPorId)
app.put('/livro/:id', atualizarLivroPorId)
app.get('/livro', listarLivros)

//CATEGORIA ENDPOINTS
app.post('/categoria', inserirCategoria)
app.get('/categoria/:id', consultarCategoriaPorId)
app.delete('/categoria/:id', deletarCategoriaPorId)
app.put('/categoria/:id', atualizarCategoriaPorId)
app.get('/categoria', listarCategorias)

app.listen(PORT, logInfo)
