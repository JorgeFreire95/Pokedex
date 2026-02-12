
import fs from 'fs';
import https from 'https';

const file = fs.createWriteStream("public/kanto_map.png");
https.get("https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Kanto_place_map.png/640px-Kanto_place_map.png", function (response) {
    response.pipe(file);
    file.on('finish', function () {
        file.close(() => console.log("Download completed."));
    });
}).on('error', function (err) {
    fs.unlink("public/kanto_map.png");
    console.error("Error downloading image:", err.message);
});
