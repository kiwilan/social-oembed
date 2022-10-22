import server from "bunrest";
const app = server();

// add router
const router = app.router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Router succeed' });
})

router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Router succeed' });
})

router.post('/test', (req, res) => {
  res.status(200).json({ message: 'Router succeed' });
})

router.put('/test', (req, res) => {
  res.status(200).json({ message: 'Router succeed' });
})

app.use('/', router);

let port = 3000
app.listen(port, () => {
  console.log('App is listening on port 3000');
  console.log(`Serve on: http://localhost:${port}`);
});