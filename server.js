const http = require('http')
const fs = require('fs').promises
const path = require('path')
const httpStatus = require('http-status-codes')
const sendError = require('./errors.js')

async function customReadFile(file_path, res) {
    console.log(`\n---- response file location: ${file_path}`);
    try {
        const data = await fs.readFile(file_path);
        res.write(data);
        res.end();
    } catch (e) {
        console.error(e);
        sendError(res);
    }
}

server = http.createServer(async (request, response) => {
	let url = request.url
	let method = request.method

	console.log(`\n---- request url: ${url}`)

	if(url === "/") {
		response.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "text/html"
		})
		await customReadFile(path.join(__dirname, 'views', 'index.html'), response)

	} else if(url.indexOf(".css") !== -1) {
		response.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "text/css"
		})
		await customReadFile(path.join(__dirname, url), response)

	} else if(url.indexOf(".jpg") !== -1 || url.indexOf(".jpeg") !== -1) {
		response.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "image/*"
		})
		await customReadFile(path.join(__dirname, url), response)

	} else {
		sendError(response)
	}
})








const port = 4242
server.listen(port)
console.log(`The server is listening on port: ${port}`)




