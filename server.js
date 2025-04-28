const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

app.post('/vote', (req, res) => {
  const mood = req.body.mood;

  fs.readFile('votes.json', (err, data) => {
    if (err) {
      console.error('Could not read votes.json', err);
      return res.status(500).send('Server error');
    }

    let votes = JSON.parse(data);
    votes.push({ mood, time: new Date() });

    fs.writeFile('votes.json', JSON.stringify(votes, null, 2), (err) => {
      if (err) {
        console.error('Could not write to votes.json', err);
        return res.status(500).send('Server error');
      }
      res.json({ message: 'Vote recorded' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
