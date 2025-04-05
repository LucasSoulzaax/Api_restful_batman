
const express = require('express')
const cors = require('cors')
const pool = require('./db') 
const PORT = 3000

const app = express()

app.use(cors())
app.use(express.json())


app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM usuario') 
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: 'Falha ao conectar no banco', error: error.message })
  }
})


app.post('/users', async (req, res) => {
  const { usuario, senha } = req.body

  try {
    const consulta = 'INSERT INTO usuario (usuario, senha) VALUES ($1, $2)' 

    await pool.query(consulta, [usuario, senha])

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Falha ao cadastrar usuário', error: error.message })
  }
})

app.get('/adm', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM admin') 
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: 'Falha ao conectar no banco', error: error.message })
  }
})


app.post('/adm', async (req, res) => {
  const { usuario, senha } = req.body

  try {
    const consulta = 'INSERT INTO admin (usuario, senha) VALUES ($1, $2)' 

    await pool.query(consulta, [usuario, senha])

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Falha ao cadastrar usuário', error: error.message })
  }
})



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
