require("dotenv").config()
const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const File = require('./models/File')

const app = express()
app.use(express.urlencoded({ extended: true }))

const upload = multer({ dest: "uploads" })

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('MongoDB connected successfully')
})

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  console.log(`server started on port: ${process.env.PORT}`)
  res.render('index')
})

const filesInfo = []

app.post('/upload', upload.single("file"), async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname
  }

  const passwordProtected = (req.body.password != null) && (req.body.password !== "")
  console.log(passwordProtected)
  
  if(passwordProtected) {
    // Encrypt password on server
    fileData.password = await bcrypt.hash(req.body.password, 10)
  }

  const file = await File.create(fileData)
  
  const fileLink = `${req.headers.origin}/file/${file.id}`

  filesInfo.push({...fileData, id: file.id, passwordProtected: passwordProtected, fileLink: fileLink})

  console.log(filesInfo)


  // res.send(file.originalName)
  // localHost/file/id
  res.render('index', { fileLink: fileLink, passwordProtected: passwordProtected, filesInfo})

})

// app.route('file/:id').get(handleDownload).post(handleDownload)

app.get("/file/:id", handleDownload)
app.post("/file/:id", handleDownload)

async function handleDownload(req, res) {
  console.log(req.params.id)
  const file = await File.findById(req.params.id)

  if(file.password != null ) {
    if (req.body.password == null) {
      res.render('password')
      return
    }

    if(!(await bcrypt.compare(req.body.password, file.password))) {
      res.render("password", { error: true })
      return
    }
  }

  file.downloadCount++
  await file.save()
  console.log(file.downloadCount)
  res.download(file.path, file.originalName)
}
 
app.listen(process.env.PORT)