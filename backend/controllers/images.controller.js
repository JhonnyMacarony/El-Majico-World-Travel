const formidable = require("formidable")
const fs = require("fs")

const checkPath = (path) =>{
    const pathElements = path.split("/")
    let myPath = "./"
    pathElements.forEach(element =>{
        myPath = `${myPath}${element}/`
        if(!fs.existsSync(myPath)){
            fs.mkdirSync(myPath)
        }
    })
}

const saveFile = async(file, folder, name)=>{
    const data = fs.readFileSync(file.filepath)
    fs.writeFileSync(`./images/${folder}/${name}`, data)
    await fs.unlinkSync(file.filepath)
    return
}

const ImagesController = {
    loadFile: async (req, res)=>{
        const form = formidable({})
        form.parse(req, async function (err, fields, files) {
            if(fields.existent){
                const pathToDelete = `images/${fields.existent}`
                const exists = fs.existsSync(pathToDelete)
                if(exists){
                    fs.unlinkSync(pathToDelete)
                }
            }
            let path = `images/${fields.folder}`
            checkPath(path)
            const savedFileName = `${fields.fileName}-${new Date().getTime()}.jpg`
            await saveFile(files.image, fields.folder, savedFileName)
            return res.status(201).json({path:`${fields.httpLink}/${fields.folder}/${savedFileName}`})
        });
    },
    deleteFile: (req, res) =>{
        const paths = req.body
        paths.forEach(path =>{
            fs.existsSync(path, exists =>{
                if(exists){
                    fs.unlinkSync(path)
                }
            })
        })
        res.json({deleted: true})
    }
}

module.exports = ImagesController