const express = require('express');

const router = express.Router();

const laptops = [
    { id: 1, name: 'MSI Pulse', brand: 'MSI', price: 'R34 999.99', quantity: 5 },
    { id: 2, name: 'Dell Latitude', brand: 'Dell', price: 'R4 999.00', quantity: 15 },
    { id: 3, name: 'Lenovo IdeaPad', brand: 'Lenovo', price: 'R5 877.00', quantity: 3 },
    { id: 4, name: 'Apple MacBook Pro', brand: 'Apple', price: 'R35 999.99', quantity: 8 },
    { id: 5, name: 'Asus Ryzen 3', brand: 'Asus', price: 'R4 999.99', quantity: 17 },
    { id: 6, name: 'Acer Aspire', brand: 'Acer', price: 'R5 999.00', quantity: 0 },
    { id: 7, name: 'Huawei MateBook', brand: 'Huawei', price: 'R11 999.99', quantity: 2 },
    { id: 8, name: 'HP Spectre', brand: 'HP', price: 'R41 999.00', quantity: 18 },
    { id: 9, name: 'Microsoft Studio 2', brand: 'Microsoft', price: 'R38 999.00', quantity: 20 },
    { id: 10, name: 'Lenovo ThinkPad', brand: 'Lenovo', price: 'R17 249.00', quantity: 1 },
];

// GET /laptops
router.get('/laptops', (req, res) => {
    res.render('index', { action: '', laptops, laptop: {} });
});

// GET /laptops/new
router.get('/laptops/new', (req, res) => {
    if (req.headers['hx-request']) {
        res.render('form', { laptop: {} });
    } else {
        res.render('index', { action: 'new', laptops, laptop: {} });
    }
});

// GET /laptops/1
router.get('/laptops/:id', (req, res) => {
    const { id } = req.params;
    const laptop = laptops.find((c) => c.id === Number(id));

    if (req.headers['hx-request']) {
        res.render('laptop', { laptop });
    } else {
        res.render('index', { action: 'show', laptops, laptop });
    }
});

// GET /laptops/1/edit
router.get('/laptops/:id/edit', (req, res) => {
    const { id } = req.params;
    const laptop = laptops.find((c) => c.id === Number(id));

    if (req.headers['hx-request']) {
        res.render('form', { laptop });
    } else {
        res.render('index', { action: 'edit', laptops, laptop });
    }
});

// POST /laptops
router.post('/laptops', (req, res) => {
    const newlaptop = {
        id: laptops.length + 1,
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        quantity: req.body.quantity,
    };

    laptops.push(newlaptop);

    if (req.headers['hx-request']) {
        res.render('sidebar', { laptops }, (err, sidebarHtml) => {
            const html = `
        <main id="content" hx-swap-oob="afterbegin">
          <p class="flash">laptop was successfully added!</p>
        </main>
        ${sidebarHtml}
      `;
            res.send(html);
        });
    } else {
        res.render('index', { action: 'new', laptops, laptop: {} });
    }
});

// PUT /laptops/1
router.put('/update/:id', (req, res) => {
    const { id } = req.params;

    const newlaptop = {
        id: Number(id),
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        quantity: req.body.quantity,
    };

    const index = laptops.findIndex((c) => c.id === Number(id));

    if (index !== -1) laptops[index] = newlaptop;

    if (req.headers['hx-request']) {
        res.render('sidebar', { laptops }, (err, sidebarHtml) => {
            res.render('laptop', { laptop: laptops[index] }, (err, laptopHTML) => {
                const html = `
          ${sidebarHtml}
          <main id="content" hx-swap-oob="true">
            <p class="flash">laptop was successfully updated!</p>
            ${laptopHTML}
          </main>
        `;

                res.send(html);
            });
        });
    } else {
        res.redirect(`/laptops/${index + 1}`);
    }
});

// DELETE /laptops/1
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = laptops.findIndex((c) => c.id === Number(id));

    if (index !== -1) laptops.splice(index, 1);
    if (req.headers['hx-request']) {
        res.render('sidebar', { laptops }, (err, sidebarHtml) => {
            const html = `
        <main id="content" hx-swap-oob="true">
          <p class="flash">laptop was successfully deleted!</p>
        </main>
        ${sidebarHtml}
      `;
            res.send(html);
        });
    } else {
        res.redirect('/laptops');
    }
});

module.exports = router;