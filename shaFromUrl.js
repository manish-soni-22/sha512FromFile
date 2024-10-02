const https = require('https');  // Use 'http' if the URL is not HTTPS
const crypto = require('crypto');

// Function to generate SHA-512 hash from a file URL
function generateFileHashFromUrl(url) {
    return new Promise((resolve, reject) => {
        // Create a SHA-512 hash instance
        const hash = crypto.createHash('sha512');
        
        // Get the file from the URL
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                // Pipe the file data into the hash
                response.on('data', (chunk) => {
                    hash.update(chunk);
                });

                // When the file has been fully read, return the hash
                response.on('end', () => {
                    const fileHash = hash.digest('hex');
                    resolve(fileHash);
                });

                // Handle any errors during file streaming
                response.on('error', (err) => {
                    reject(`Error in downloading file: ${err}`);
                });
            } else {
                reject(`Failed to download file. Status code: ${response.statusCode}`);
            }
        }).on('error', (err) => {
            reject(`Request error: ${err.message}`);
        });
    });
}

// Example usage
const fileUrl = 'https://www.cisco.com/.well-known/csaf/2024/cisco-sa-nso-auth-bypass-qnteesp.json';  // Replace with actual file URL

generateFileHashFromUrl(fileUrl)
    .then((hash) => {
        console.log(`SHA-512 hash of the file: ${hash}`);
    })
    .catch((err) => {
        console.error('Error:', err);
    });
