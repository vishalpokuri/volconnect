const fs = require('fs')

// Function to generate random description
function generateDescription(name, type) {
    const descriptions = [
        `Welcome to ${name}'s ${type} store. Explore the latest arrivals!`,
        `Discover great deals at ${name}'s ${type} shop. Don't miss out!`,
        `${name} invites you to their new ${type} store. Check it out now!`,
    ]

    return descriptions[Math.floor(Math.random() * descriptions.length)]
}

// Function to generate objects with type "newly added stores near you"
function generateStores(latitude, longitude, numStores) {
    const stores = []

    for (let i = 1; i <= numStores; i++) {
        const store = {
            id: i + 10,
            type: 'newly added stores near you',
            latitude: latitude + (Math.random() - 0.5) * 0.2, // Small random deviation
            longitude: longitude + (Math.random() - 0.5) * 0.2, // Small random deviation
            name: `Store ${i}`,
            description: generateDescription(`Store ${i}`, 'newly added'),
        }

        stores.push(store)
    }

    return stores
}

// Example coordinates (replace with your desired coordinates)
const centerLatitude = 12.976019
const centerLongitude = 79.164362

// Number of stores to generate
const numStores = 5

// Generate store objects
const storesData = generateStores(centerLatitude, centerLongitude, numStores)

// Save data to a JSON file
const jsonFilePath = 'dummy_data.json'
fs.writeFileSync(jsonFilePath, JSON.stringify(storesData, null, 2))

console.log(`Dummy data has been generated and saved to ${jsonFilePath}`)
