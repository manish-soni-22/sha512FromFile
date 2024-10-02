const crypto = require('crypto');
const fs = require('fs');

// Function to generate SHA-512 hash from a file
function generateFileHash(filePath) {
    return new Promise((resolve, reject) => {
        // Create a hash instance
        const hash = crypto.createHash('sha512');
        
        // Create a file stream
        const fileStream = fs.createReadStream(filePath);
        
        // Pipe the file stream into the hash
        fileStream.on('data', (data) => {
            hash.update(data);
        });
        
        // When the file has been fully read, return the hash
        fileStream.on('end', () => {
            const fileHash = hash.digest('hex');
            resolve(fileHash);
        });
        
        // Handle any file reading errors
        fileStream.on('error', (err) => {
            reject(err);
        });
    });
}

// Example usage
//const filePath = './cisco-sa-utd-snort3-dos-bypas-b4ouewxd.json'; // Change this to the path of your file
const filePath = './<fileNameInSameFolder>.pdf'

generateFileHash(filePath)
    .then((hash) => {
        console.log(`SHA-512 hash of the file: ${hash}`);
    })
    .catch((err) => {
        console.error('Error generating hash:', err);
    });
