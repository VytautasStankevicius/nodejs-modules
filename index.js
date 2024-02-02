const http = require('http');
const url = require('url');
const fs = require('fs');
const {hostname} = require('os');
const replaceTemplate = require('./modules/replaceTemplate');
const data = fs.readFileSync(`${__dirname}/data/products.json`, 'utf-8');
const products = JSON.parse(data)

//Templates

const main = fs.readFileSync(`${__dirname}/templates/main.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const shoppingCart = fs.readFileSync(`${__dirname}/templates/shoppingCart.html`, 'utf-8')



//Server

const host = 'localhost';
const port = '8888';

const server = http.createServer((req,res)=>{
    const {query, pathname}=url.parse(req.url,true);

    switch(pathname){
        case '/':
            const cardsHtml = products.map(el=>{
                return replaceTemplate(card,el)
            }
                )            
            const output = main.replace('{%PRODUCT_CARDS%}',cardsHtml.join(''))
        res.writeHead(200,{
            'Content-Type': 'text/html'
        })
        res.end(output)
        break;
        case '/product':
            res.writeHead(200,{
                'Content-Type':'text/html'})
            const outputProduct = replaceTemplate(product, products[query.id - 1]);
            res.end(outputProduct)
            break
        case '/shoppingCart':
            res.writeHead(200,{
                'Content-Type':'text/html'})
            res.render(shoppingCart)
        default:
        res.writeHead(404,{
            'Content-Type': 'text/html'
        })
        res.end('<h1>Page not found</h1>')
    }
})

server.listen(port,hostname, ()=>{
    console.log(`Server listening on port ${port}`)
})