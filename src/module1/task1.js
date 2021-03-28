process.stdin.resume()
process.stdin.on('data', function(data) { 
    const trimedData = Buffer.from(data).toString().replaceAll("\n",'');
    process.stdout.write(Buffer.from(trimedData).reverse()+ '\n');
})
process.stdout.on('error', function(err) {
  if (err.code === 'EPIPE') return process.exit()
  process.emit('error', err)
})