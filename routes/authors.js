const express  = require('express')
const router = express.Router()
const Author = require('../models/author.js')

router.get('/' , async (req, res) =>{
    let searchOption = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOption = new RegExp(req.query.name ,'i')
    }
    try{
        const authors = await Author.find({searchOption})
        res.render("authors/index", {
            authors:authors,
            searchOption: req.query
        })
    }catch{
        res.redirect('/')
    }
    
})

// New Author Route
router.get('/new', (req, res)=>{
    res.render('authors/new', {author : new Author()})
})

// create route
router.post('/' ,express.urlencoded({limit: '10mb', extended:false}), async (req ,res)=>{

    const author = new Author({
        name :req.body.name
    })
    try{
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new' , {
            author: author,
            errorMessage: 'Error with author'
        })
    }
 })

module.exports = router