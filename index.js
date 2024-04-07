const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

const compileAndRun = async (code) => {
    const fileName = 'example.cpp';
    const filePath = path.join(__dirname, fileName);

    // Write code to file
    fs.writeFileSync(filePath, code);

    // Compile the code
    let compilationError = null;
    await new Promise((resolve, reject) => {
        exec(`g++ -o ${fileName.replace('.cpp', '')} ${fileName}`, (error, stdout, stderr) => {
            if (error || stderr) {
                compilationError = error || stderr;
            }
            resolve();
        });
    });

    // If there was a compilation error, return it
    if (compilationError) {
        return { compilationError };
    }

    // Run the compiled program
    return new Promise((resolve, reject) => {
        exec(`./${fileName.replace('.cpp', '')}`, (error, stdout, stderr) => {
            if (error || stderr) {
                reject(error || stderr);
                return;
            }
            resolve(stdout.trim());
        });
    });
};


app.post('/compile', async (req, res) => {
    const { code } = req.body;
    try {
        const result = await compileAndRun(code);
        if (result.compilationError) {
            res.send(result.compilationError);
        } else {
            res.send(result);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
