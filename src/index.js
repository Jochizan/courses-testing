import app from './app.js';

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on host http://localhost:${app.get('PORT')}`);
});
