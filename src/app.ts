import express from "express"
import { atualizarCategoriaPorId, consultarCategoriaPorId, deletarCategoriaPorId, inserirCategoria, listarCategorias } from './controller/CategoriaController'
import { atualizarLivroPorId, consultarLivroPorId, deletarLivroPorId, inserirLivro, listarLivros } from './controller/LivroController'
import { atualizarPessoaPorId, consultarPessoaPorId, deletarPessoaPorId, inserirPessoa, listarPessoas } from './controller/PessoaController'
import { atualizarUsuarioPorId, consultarUsuarioPorId, deletarUsuarioPorId, inserirUsuario, listarUsuarios } from './controller/UsuarioController'
import { atualizarEmprestimoPorId, consultarEmprestimoPorId, deletarEmprestimoPorId, inserirEmprestimo, listarEmprestimos } from './controller/EmprestimoController'

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

//USUARIO ENPOINTS
app.post('/usuario', inserirUsuario)
app.get('/usuario/:id', consultarUsuarioPorId)
app.delete('/usuario/:id', deletarUsuarioPorId)
app.put('/usuario/:id', atualizarUsuarioPorId)
app.get('/usuario', listarUsuarios)

//EMPRESTIMO ENDPOINTS
app.post('/emprestimo', inserirEmprestimo)
app.get('/emprestimo/:id', consultarEmprestimoPorId)
app.delete('/emprestimo/:id', deletarEmprestimoPorId)
app.put('/emprestimo/:id', atualizarEmprestimoPorId)
app.get('/emprestimo', listarEmprestimos)

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
