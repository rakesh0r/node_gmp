process.stdin.resume();
process.stdin.on('data', (data) => {
    const trimedData = Buffer.from(data).toString().replaceAll('\n', '');
    process.stdout.write(`${Buffer.from(trimedData).reverse() }\n`);
});
process.stdout.on('error', (err) => {
    if (err.code === 'EPIPE') return process.exit();
    process.emit('error', err);
});
