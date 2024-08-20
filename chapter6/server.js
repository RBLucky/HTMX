import express from 'express';

const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/user/:id/edit', (req, res) => {
    res.send(`
        <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name" value="Greg Lim">
            </div>
            <div class="mb-3">
                <label for="bio" class="form-label">Bio</label>
                <textarea type="text" class="form-control" id="bio" name="bio">Follower of Christ | Author of Best-selling Amazon Tech Books and Creator of Coding Courses</textarea>
            </div>
            <button type="submit" class="btn btn-primary">
                Save Changes
            </button>
            <button type="submit" hx-get="/index.html"
             class="btn btn-secondary">
                Cancel
            </button>

        </form>
    `);
});

app.put('/user/:id', (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;

    res.send(`
        <div class="card" style="width: 18rem;"
         hx-target="this"
         hx-swap="outerHTML"
        >
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">
                    ${bio}
                </p>
                <button href="#" class="btn btn-primary"
                 hx-get="/user/1/edit">
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