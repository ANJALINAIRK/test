const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

let requests = []; // In-memory array to store requests

// Create a new request
app.post('/requests', (req, res) => {
    const { name, email, department, reason, status, approvals } = req.body;
    const newRequest = { 
        id: requests.length + 1, 
        name, 
        email, 
        department, 
        reason, 
        status: status || 'pending', 
        approvals: approvals || [] 
    };
    requests.push(newRequest);
    res.status(201).json(newRequest);
});

// Get all requests
app.get('/requests', (req, res) => {
    res.json(requests);
});

// Get a request by ID
app.get('/requests/:id', (req, res) => {
    const request = requests.find(r => r.id === parseInt(req.params.id));
    if (request) {
        res.json(request);
    } else {
        res.status(404).send('Request not found');
    }
});

// Update a request by ID
app.put('/requests/:id', (req, res) => {
    const request = requests.find(r => r.id === parseInt(req.params.id));
    if (request) {
        const { status, approvals } = req.body;
        request.status = status || request.status;
        request.approvals = approvals || request.approvals;
        res.json(request);
    } else {
        res.status(404).send('Request not found');
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ticketing.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
