import express from 'express';
import xss from 'xss';

const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
// Handle GET request for profile edit
app.get('/profile/:id/edit', (req, res) => {
  // You can send an HTML form for editing here
  res.send(`
  <div
  class="container mx-auto py-8 max-w-lg"
  hx-target="this"
  hx-swap="outerHTML"
>
<form hx-put="/profile/1" hx-target="this" hx-swap="outerHTML">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <div class="mb-4">
        <label for="name" class="text-lg font-semibold">Name</label>
        <input type="text" id="name" name="name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400" value="John Doe">
      </div>
      <div class="mb-4">
        <label for="bio" class="text-lg font-semibold">Bio</label>
        <textarea id="bio" name="bio" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400" rows="6">My name is Lucky and I would like to say, I think about HTMX each and every day. Coding lines, making moves, never delay. I git push, then I git paid. Commit to the grind, that's how I play. Merging my dreams, no pullbacks today.</textarea>
      </div>
      <div class="mt-6">
      <button type="submit" class="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-600">Save Changes</button>
      <button type="button" hx-get="/profile.html" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg ml-2 hover:bg-gray-400">Cancel</button>
    </div>
    </div>
  </form>
</div>
  `);
});

// Handle PUT request for editing
app.put('/profile/:id', (req, res) => {
  const name = xss(req.body.name);
  const bio = xss(req.body.bio);

  // Send the updated profile back
  res.send(`
  <div
  class="container mx-auto py-8 max-w-lg"
  hx-target="this"
  hx-swap="outerHTML"
>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-4">${name}</h1>
    <p class="text-gray-700">
      ${bio}
    </p>

    <button
      hx-get="/profile/1/edit"
      class="bg-indigo-700 text-white font-bold w-full py-2 px-4 rounded-lg mt-4 hover:bg-indigo-600"
    >
      Click To Edit
    </button>
  </div>
</div>
  `);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});